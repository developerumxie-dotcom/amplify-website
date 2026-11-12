import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { createOrigamiBird, BIRD_VERTICES } from './origamiBirdModel';
import styles from './HeroBirdVisual.module.css';

/**
 * AMPLIFY DIGITAL — CINEMATIC INTERACTIVE 3D ORIGAMI BIRD
 *
 * Implements:
 * 1. Opening Animation: Coordinated 4-phase origami folding assembly (2.4s)
 *    with progressive edge flares as facets connect.
 * 2. Cinematic Flight Surge (2.4s to 4.4s): Gentle forward glide, banking roll,
 *    and smooth deceleration into hero posture.
 * 3. Continuous Floating Idle: Organic vertical bob, slight yaw/pitch/roll
 *    strictly preserving the exact Image 2 reference silhouette.
 * 4. Neon Edge Light Animation:
 *    - Cyan point light traveling along outer wing fold
 *    - Magenta point light moving across dorsal ridge and central fold
 *    - Warm orange point light sweeping along keel and tail
 *    - Cyan point light highlighting head crown and beak
 *    - Periodic soft energy pulse cascading across crystal facets every ~5.5s
 * 5. Mouse Interaction: Restrained cursor tracking, parallax tilt, and hover glow boost.
 * 6. Performance & Accessibility: Full resource cleanup and prefers-reduced-motion support.
 */

export default function HeroBirdVisual() {
  const mountRef = useRef(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL initialization failed:', e);
      setWebglError(true);
      return;
    }

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 560;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.42;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // ── Camera (Calibrated to match Image 2 hero perspective) ───────
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0.10, -0.05, 9.6);
    camera.lookAt(0, 0, 0);

    // ── Lighting Setup (matches Image 2 crystal neon mood) ──────────
    const ambientLight = new THREE.AmbientLight(0x100820, 2.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 6);
    scene.add(keyLight);

    const greenFillLight = new THREE.PointLight(0x00FF66, 5.0, 16);
    greenFillLight.position.set(-2.2, 3.0, 3.0);
    scene.add(greenFillLight);

    const magentaFillLight = new THREE.PointLight(0xFF007F, 4.5, 16);
    magentaFillLight.position.set(0.6, 2.4, 2.5);
    scene.add(magentaFillLight);

    const orangeFillLight = new THREE.PointLight(0xFF5500, 5.0, 16);
    orangeFillLight.position.set(0, -2.2, 3.0);
    scene.add(orangeFillLight);

    const cyanRimBack = new THREE.PointLight(0x00C8FF, 5.0, 12);
    cyanRimBack.position.set(-2.6, 1.5, -0.6);
    scene.add(cyanRimBack);

    const orangeRimBack = new THREE.PointLight(0xFF4500, 4.5, 12);
    orangeRimBack.position.set(-1.8, -1.5, -0.6);
    scene.add(orangeRimBack);

    // ── Build Deterministic Origami Bird (No Orbital Rings) ─────────
    const bird = createOrigamiBird();
    scene.add(bird);

    // ── Traveling Neon Edge Lights (Attached directly to bird) ──────
    // 1. Cyan Wing Edge Light
    const wingTravelingLight = new THREE.PointLight(0x00E5FF, 3.5, 5.0);
    bird.add(wingTravelingLight);

    // 2. Magenta Dorsal Ridge Light
    const magentaTravelingLight = new THREE.PointLight(0xFF007F, 3.2, 4.5);
    bird.add(magentaTravelingLight);

    // 3. Warm Orange Keel & Tail Light
    const orangeTravelingLight = new THREE.PointLight(0xFF6600, 3.2, 4.5);
    bird.add(orangeTravelingLight);

    // 4. Cyan Head & Beak Light
    const headTravelingLight = new THREE.PointLight(0x00D4FF, 3.0, 4.0);
    bird.add(headTravelingLight);

    // Helper for smooth ping-pong interpolation along polyline points
    const V = BIRD_VERTICES;
    const wingEdgePoints = [V.wingValley, V.outerWingNotch, V.wingTip, V.wingGreenWhiteJct];
    const dorsalEdgePoints = [V.dorsalApex, V.chestFold, V.neckApex];
    const keelEdgePoints = [V.tailOrangeValley, V.lowerWingTip, V.bellyKeelBottom, V.neckThroat];
    const headEdgePoints = [V.neckApex, V.headCrown, V.beakTip, V.beakChin];

    const getInterpolatedPoint = (pts, progress) => {
      const n = pts.length;
      const scaled = progress * (n - 1);
      const idx = Math.floor(scaled);
      const frac = scaled - idx;
      const p0 = pts[Math.min(idx, n - 1)];
      const p1 = pts[Math.min(idx + 1, n - 1)];
      return new THREE.Vector3().lerpVectors(p0, p1, frac);
    };

    // ── Mouse Interaction State ─────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetHoverGlow = 0;
    let currentHoverGlow = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = mouseX;
      targetMouseY = mouseY;
      targetHoverGlow = 1.0;
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
      targetHoverGlow = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion is preferred, show complete assembled bird immediately
    if (prefersReducedMotion) {
      bird.userData.facetMeshes?.forEach((mesh) => {
        mesh.visible = true;
        mesh.scale.set(1, 1, 1);
        mesh.position.copy(mesh.userData.finalPos);
        mesh.rotation.set(0, 0, 0);
      });
    }

    // ── Animation Loop ──────────────────────────────────────────────
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      currentHoverGlow += (targetHoverGlow - currentHoverGlow) * 0.05;

      const facetMeshes = bird.userData.facetMeshes || [];

      // ── Traveling Energy Wave Across Complete Bird (Every ~5.5s)
      let waveX = -999;
      if (t >= 3.0) {
        const pulsePeriod = 5.5;
        const pulseTime = (t - 3.0) % pulsePeriod;
        if (pulseTime < 1.6) {
          const pulseProg = pulseTime / 1.6;
          // Smooth cosine wave
          const waveEase = 0.5 - 0.5 * Math.cos(pulseProg * Math.PI);
          waveX = THREE.MathUtils.lerp(-2.8, 3.0, waveEase);
        }
      }

      // ── PER-FACET INDEPENDENT ASSEMBLY (0.0s to ~2.25s) ───────────
      // Each facet starts outside & invisible, then flies in and scales up.
      // Easing uses quintic ease-out (1 - (1-p)^4) for zero deceleration snap/jerk.
      facetMeshes.forEach((mesh) => {
        if (prefersReducedMotion) {
          mesh.visible = true;
          mesh.scale.set(1, 1, 1);
          mesh.position.copy(mesh.userData.finalPos);
          mesh.rotation.set(0, 0, 0);

          let waveBoost = 0;
          if (waveX > -900) {
            const dist = Math.abs(mesh.userData.finalPos.x - waveX);
            if (dist < 1.25) {
              waveBoost = Math.pow(Math.cos((dist / 1.25) * (Math.PI / 2)), 2) * 0.22;
            }
          }
          mesh.material.emissiveIntensity =
            mesh.userData.baseEmissiveIntensity + waveBoost + currentHoverGlow * 0.15;
          return;
        }

        const start = mesh.userData.assemblyStart;
        const dur = mesh.userData.assemblyDuration;

        if (t < start) {
          mesh.visible = false;
          mesh.scale.set(0, 0, 0);
          return;
        }

        mesh.visible = true;
        const rawP = (t - start) / dur;

        if (rawP >= 1.0) {
          // Facet has arrived and locked smoothly into exact reference geometry
          mesh.scale.set(1, 1, 1);
          mesh.position.copy(mesh.userData.finalPos);
          mesh.rotation.set(0, 0, 0);

          let waveBoost = 0;
          if (waveX > -900) {
            const dist = Math.abs(mesh.userData.finalPos.x - waveX);
            if (dist < 1.25) {
              waveBoost = Math.pow(Math.cos((dist / 1.25) * (Math.PI / 2)), 2) * 0.22;
            }
          }
          mesh.material.emissiveIntensity =
            mesh.userData.baseEmissiveIntensity + waveBoost + currentHoverGlow * 0.15;

        } else {
          // Quintic ease-out: starts fast, lands with zero velocity & zero acceleration
          const p = rawP;
          const ease = 1 - Math.pow(1 - p, 4);

          // Fly in from outside: lerp from outside initPos to finalPos
          mesh.position.lerpVectors(mesh.userData.initPos, mesh.userData.finalPos, ease);

          // Scale smoothly from small (0.05) to full size (1.0)
          const curScale = THREE.MathUtils.lerp(0.05, 1.0, ease);
          mesh.scale.set(curScale, curScale, curScale);

          // Rotate into aligned origami fold
          mesh.rotation.set(
            mesh.userData.initRot.x * (1 - ease),
            mesh.userData.initRot.y * (1 - ease),
            mesh.userData.initRot.z * (1 - ease)
          );

          // Smooth connection flare that peaks then vanishes to 0 at p = 1.0
          let flare = 0;
          if (p > 0.5) {
            flare = Math.sin((p - 0.5) / 0.5 * Math.PI) * 0.35;
          }
          const base = THREE.MathUtils.lerp(0.12, mesh.userData.baseEmissiveIntensity, ease);
          mesh.material.emissiveIntensity = base + flare;
        }
      });

      // ── BIRD OVERALL MOTION: CONTINUOUS IDLE + CINEMATIC FLIGHT SURGE ──
      // Blend idle floating in smoothly with smoothstep (t: 1.8s to 3.8s)
      const idleWeight = prefersReducedMotion ? 1.0 : THREE.MathUtils.smoothstep(t, 1.8, 3.8);

      const idleBobY = Math.sin(t * 1.05) * 0.055;
      const idleBobX = Math.cos(t * 0.78) * 0.022;
      const idleBobZ = Math.sin(t * 0.92) * 0.025;

      const idlePitchX = Math.sin(t * 0.88) * 0.02;
      const idleYawY = Math.cos(t * 0.68) * 0.028;
      const idleRollZ = Math.sin(t * 0.76) * 0.015;

      // Cinematic Flight Surge (t: 2.0s to 4.2s)
      // Uses sin^2(tau * PI) so both starting velocity AND landing velocity are identically 0
      // Eliminates any "stuck" / hard-stop feeling!
      let flightSurge = 0;
      if (!prefersReducedMotion && t >= 2.0 && t < 4.2) {
        const flightTau = (t - 2.0) / 2.2;
        flightSurge = Math.pow(Math.sin(flightTau * Math.PI), 2);
      }

      // Combine idle bobbing + flight surge + mouse tracking with zero discontinuities
      bird.position.x = idleBobX * idleWeight + flightSurge * 0.04 + currentMouseX * 0.16 * idleWeight;
      bird.position.y = idleBobY * idleWeight + flightSurge * 0.08 + currentMouseY * 0.12 * idleWeight + 0.20;
      bird.position.z = idleBobZ * idleWeight + flightSurge * 0.38;

      bird.rotation.x = idlePitchX * idleWeight + flightSurge * 0.04 - currentMouseY * 0.08 * idleWeight;
      bird.rotation.y = idleYawY * idleWeight + flightSurge * 0.06 + currentMouseX * 0.12 * idleWeight;
      bird.rotation.z = idleRollZ * idleWeight - flightSurge * 0.07 - currentMouseX * 0.04 * idleWeight;

      // ── Traveling Edge Light Positions (attached to bird coordinates)
      // Edge lights fade in progressively as the bird finishes assembling
      const lightIntensityFactor = prefersReducedMotion
        ? 1.0
        : THREE.MathUtils.smoothstep(t, 1.2, 2.5);

      wingTravelingLight.intensity = 3.5 * lightIntensityFactor;
      magentaTravelingLight.intensity = 3.2 * lightIntensityFactor;
      orangeTravelingLight.intensity = 3.2 * lightIntensityFactor;
      headTravelingLight.intensity = 3.0 * lightIntensityFactor;

      // Cyan Wing Light (ping-pongs along outer wing boundary)
      const wingProg = (Math.sin(t * 1.15) + 1) * 0.5;
      const wingPt = getInterpolatedPoint(wingEdgePoints, wingProg);
      wingTravelingLight.position.set(wingPt.x, wingPt.y, wingPt.z + 0.22);

      // Magenta Dorsal Ridge Light
      const dorsalProg = (Math.sin(t * 1.35 + 1.2) + 1) * 0.5;
      const dorsalPt = getInterpolatedPoint(dorsalEdgePoints, dorsalProg);
      magentaTravelingLight.position.set(dorsalPt.x, dorsalPt.y, dorsalPt.z + 0.24);

      // Orange Keel Light
      const keelProg = (Math.sin(t * 1.10 + 2.5) + 1) * 0.5;
      const keelPt = getInterpolatedPoint(keelEdgePoints, keelProg);
      orangeTravelingLight.position.set(keelPt.x, keelPt.y, keelPt.z + 0.22);

      // Head & Beak Cyan Light
      const headProg = (Math.sin(t * 1.45 + 0.8) + 1) * 0.5;
      const headPt = getInterpolatedPoint(headEdgePoints, headProg);
      headTravelingLight.position.set(headPt.x, headPt.y, headPt.z + 0.20);

      renderer.render(scene, camera);
    };

    animate();

    // ── Responsive Resize ───────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ── Cleanup ──────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (renderer.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className={styles.birdContainer}>
      {/* Background Volumetric Nebula Glows (match Image 2 lighting atmosphere) */}
      <div className={styles.volumetricNebulae}>
        <div className={styles.nebulaPurple} />
        <div className={styles.nebulaMagenta} />
        <div className={styles.nebulaOrange} />
      </div>

      {/* WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className={styles.canvasMount}
      />

      {/* Fallback for no WebGL */}
      {webglError && (
        <div className={styles.webglFallback}>
          <p className={styles.fallbackTitle}>WebGL 3D Rendering Unavailable</p>
          <p className={styles.fallbackDesc}>Hardware acceleration is required to render the real-time 3D origami bird sculpture.</p>
        </div>
      )}
    </div>
  );
}
