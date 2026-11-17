import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  BIRD_MODEL_PATH,
  getPreloadedBirdGLTF,
  preloadAndParseBirdModel,
  loadBirdGLBWithCache
} from '../services/birdModelCache';
import styles from './HeroBirdVisual.module.css';

/**
 * AMPLIFY DIGITAL — CINEMATIC 3D ORIGAMI BIRD WITH REVOLVING CLIENT LOGO SYSTEM
 * 
 * Features:
 * 1. ZERO Loading Time: Model mounts synchronously at the exact same time as the website opens.
 * 2. Exact same scale (1.0), exact same position (y: +0.20), exact same camera distance (Z: 9.6).
 * 3. Orbits fill completely with no cutting via wide canvas container.
 * 4. Continuous seamless 'Revolve' animation loop for revolving client logos.
 * 5. Gentle floating idle + smooth cursor parallax tracking.
 */

// Module-scoped flag resets whenever the page is refreshed or reloaded in the browser,
// ensuring the introductory loading animation plays only on website open / reload.
let hasPlayedBirdIntro = false;

export default function HeroBirdVisual() {
  const mountRef = useRef(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isCancelled = false;
    let renderer;
    let animationFrameId;
    let mixer = null;
    let modelRoot = null;

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.42;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // ── Camera (Exact calibrated hero perspective: Z = 9.6, FOV = 36) ─
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0.10, -0.05, 9.6);
    camera.lookAt(0, 0, 0);

    // ── Lighting Setup (Radiant crystal neon studio lights) ─────────
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

    // ── Mouse Interaction State ─────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = mouseX;
      targetMouseY = mouseY;
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // ── Setup and Mount Model Scene ─────────────────────────────────
    const setupModel = (gltf) => {
      if (isCancelled || !gltf || !gltf.scene) return;

      modelRoot = gltf.scene;

      // Exact same position, scale, and angle
      modelRoot.position.set(0, 0.20, 0);
      modelRoot.scale.set(1.0, 1.0, 1.0);
      modelRoot.rotation.set(0, 0, 0);

      // Scale orbits and revolving client logos a bit smaller (~0.85) to hug the bird compactly,
      // while keeping the origami bird at its exact 1.0 size and position
      const sceneRoot = modelRoot.getObjectByName('AmplifyBirdScene') || modelRoot;
      let orbitContainer = sceneRoot.getObjectByName('OrbitContainer');
      if (!orbitContainer) {
        orbitContainer = new THREE.Group();
        orbitContainer.name = 'OrbitContainer';
        orbitContainer.scale.setScalar(0.85);

        const toMove = [];
        [...sceneRoot.children].forEach((c) => {
          if (c.name && (c.name.startsWith('Logo_') || c.name === 'OrbitSystem')) {
            toMove.push(c);
          }
        });
        toMove.forEach((c) => orbitContainer.add(c));
        sceneRoot.add(orbitContainer);
      } else {
        orbitContainer.scale.setScalar(0.85);
      }

      // Optimize materials: crisp vertex colors for bird, clean alpha for logos, glow for rings & particles
      modelRoot.traverse((child) => {
        if (child.isMesh) {
          // Disable individual frustum culling on particle facets to skip 900+ bounding checks per frame
          child.frustumCulled = false;

          if (child.material) {
            const mat = child.material;

            if (child.name && child.name.startsWith('Logo_')) {
              mat.transparent = true;
              mat.depthWrite = false;
              mat.side = THREE.DoubleSide;
              mat.needsUpdate = true;
            } else if (child.name === 'Bird') {
              mat.side = THREE.DoubleSide;
              mat.vertexColors = true;
              mat.needsUpdate = true;
            } else if (child.name === 'BirdOutline') {
              mat.side = THREE.DoubleSide;
              mat.transparent = true;
              mat.needsUpdate = true;
            } else if (child.name && child.name.startsWith('Particle_')) {
              // Solid crystal facets: keeping transparent = false avoids expensive 900-mesh
              // CPU depth-sorting every frame, ensuring silky-smooth 60/120 FPS playback!
              mat.side = THREE.DoubleSide;
              mat.transparent = false;
              mat.depthWrite = true;
              mat.needsUpdate = true;
            } else if (child.name && (child.name.includes('Orbit') || child.name.includes('Ring'))) {
              mat.side = THREE.DoubleSide;
              mat.transparent = true;
              mat.needsUpdate = true;
            }
          }
        }
      });

      scene.add(modelRoot);

      // Animation playback: Intro loading animation on first page load/reload,
      // seamlessly transitioning into the continuous 'Revolve' loop!
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(modelRoot);

        const introClip = gltf.animations.find((a) => a.name.toLowerCase() === 'intro');
        const revolveClip = gltf.animations.find((a) => a.name.toLowerCase() === 'revolve') || gltf.animations[0];

        const revolveAction = revolveClip ? mixer.clipAction(revolveClip) : null;
        if (revolveAction) {
          revolveAction.setLoop(THREE.LoopRepeat);
        }

        const hideParticles = () => {
          modelRoot.traverse((c) => {
            if (c.name && c.name.startsWith('Particle_')) {
              c.visible = false;
            }
          });
        };

        if (introClip && !hasPlayedBirdIntro) {
          const introAction = mixer.clipAction(introClip);
          introAction.setLoop(THREE.LoopOnce);
          introAction.clampWhenFinished = true;

          const handleIntroFinished = (e) => {
            if (isCancelled) return;
            if (e.action === introAction) {
              hasPlayedBirdIntro = true;
              isIntroActive = false;
              mixer.removeEventListener('finished', handleIntroFinished);
              hideParticles();
              if (revolveAction) {
                revolveAction.reset();
                revolveAction.play();
                introAction.crossFadeTo(revolveAction, 0.75, false);
              }
            }
          };

          mixer.addEventListener('finished', handleIntroFinished);
          introAction.play();
        } else {
          // If intro has already played during this session, directly revolve and hide particles
          hideParticles();
          if (revolveAction) {
            revolveAction.play();
          }
        }

        // Evaluate animation at t=0 immediately so initial frame renders perfectly
        mixer.update(0);
      }

      // Render the very first frame immediately for 0ms delay!
      renderer.render(scene, camera);
    };

    // ── Zero-Delay Model Retrieval (Preload Cache First) ────────────
    const preloaded = getPreloadedBirdGLTF();
    if (preloaded) {
      // 0ms Synchronous Mount at the exact moment the page opens!
      setupModel(preloaded);
    } else {
      preloadAndParseBirdModel().then((parsed) => {
        if (parsed && !isCancelled) {
          setupModel(parsed);
        } else if (!isCancelled) {
          loadBirdGLBWithCache(BIRD_MODEL_PATH).then((buffer) => {
            if (isCancelled) return;
            const loader = new GLTFLoader();
            loader.parse(buffer, '', (g) => setupModel(g));
          }).catch((err) => {
            console.warn('Failed to load 3D revolving bird model:', err);
            if (!isCancelled) setWebglError(true);
          });
        }
      });
    }

    // ── Render Loop (Ultra-Smooth Frame Pacing & Jitter Elimination) ─
    const clock = new THREE.Clock();
    let smoothedDelta = 0.016;
    let isIntroActive = !hasPlayedBirdIntro;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Frame pacing: clamp raw delta to prevent large frame jumps during GC or initial mount
      const rawDelta = clock.getDelta();
      const clampedDelta = Math.min(rawDelta, 0.033);
      smoothedDelta += (clampedDelta - smoothedDelta) * 0.3;

      const t = clock.getElapsedTime();

      // Update animation mixer with rock-solid, jitter-free delta
      if (mixer) {
        mixer.update(smoothedDelta);
      }

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // During the initial particle assembly, keep coordinates rock-solid and stable
      // so particle convergence is crystal clear and ultra-smooth without wobbly parent motion.
      // As the bird completes assembly (t >= 3.2s), gently ease into the organic floating idle.
      if (modelRoot) {
        let idleScale = 1.0;
        if (isIntroActive) {
          if (t < 3.2) {
            idleScale = 0.12;
          } else if (t < 5.0) {
            const p = (t - 3.2) / 1.8;
            // Smooth Hermite cubic ease-in
            idleScale = 0.12 + 0.88 * (p * p * (3 - 2 * p));
          } else {
            idleScale = 1.0;
            isIntroActive = false;
          }
        }

        const idleBobY = Math.sin(t * 1.05) * 0.055 * idleScale;
        const idleBobX = Math.cos(t * 0.78) * 0.022 * idleScale;
        const idleBobZ = Math.sin(t * 0.92) * 0.025 * idleScale;

        const idlePitchX = Math.sin(t * 0.88) * 0.02 * idleScale;
        const idleYawY = Math.cos(t * 0.68) * 0.028 * idleScale;
        const idleRollZ = Math.sin(t * 0.76) * 0.015 * idleScale;

        modelRoot.position.x = idleBobX + currentMouseX * 0.16 * idleScale;
        modelRoot.position.y = idleBobY + currentMouseY * 0.12 * idleScale + 0.20;
        modelRoot.position.z = idleBobZ;

        modelRoot.rotation.x = idlePitchX - currentMouseY * 0.08 * idleScale;
        modelRoot.rotation.y = idleYawY + currentMouseX * 0.12 * idleScale;
        modelRoot.rotation.z = idleRollZ - currentMouseX * 0.04 * idleScale;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── Responsive Resize ───────────────────────────────────────────
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ── Cleanup ─────────────────────────────────────────────────────
    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);

      if (mixer) {
        mixer.stopAllAction();
      }

      if (renderer.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();

      if (modelRoot) {
        scene.remove(modelRoot);
      }

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
      {/* Background Volumetric Nebula Glows */}
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
