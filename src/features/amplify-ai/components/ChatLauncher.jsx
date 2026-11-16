import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { loadGLBWithCache } from '../services/modelCache';
import styles from '../styles/ChatLauncher.module.css';

/**
 * AMPLIFY AI — 3D FLOATING MASCOT LAUNCHER (PERFECTED 1 + 2 + 3)
 * Features:
 * 1. Refined Neon Cyber-Portal on the floor.
 * 2. Delicate cosmic stardust particles rising up.
 * 3. 3D Mascot vertical glide & specular flash — STRICTLY CONSTANT SIZE (no shrinking or growing).
 * 4. High-Speed IndexedDB Cache: instant loading on every return visit.
 * 5. Full 360° Drag-to-Rotate with smooth momentum & cursor glance.
 */
export default function ChatLauncher({ isOpen, onClick }) {
  const mountRef = useRef(null);
  const [isSummoning, setIsSummoning] = useState(true);
  const [hasMaterialized, setHasMaterialized] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (isOpen) return;

    let isCancelled = false;
    let animationFrameId;
    let renderer;
    let scene;
    let camera;
    let mascotRoot = null;
    let container = null;
    let clock = null;

    let surgeProgress = 0.0;
    let isSurging = false;
    let baseMascotScale = 1.0;

    const initTimer = setTimeout(async () => {
      if (isCancelled) return;
      container = mountRef.current;
      if (!container) return;

      clock = new THREE.Clock();

      // 1. Initialize WebGL Renderer
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(container.clientWidth || 140, container.clientHeight || 170);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.35;
        container.appendChild(renderer.domElement);
      } catch (e) {
        console.warn('WebGL init failed:', e);
        setLoadError(true);
        setIsSummoning(false);
        return;
      }

      // 2. Camera Setup (Tuned for normal, comfortable framing)
      scene = new THREE.Scene();
      const w = container.clientWidth || 140;
      const h = container.clientHeight || 170;
      camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100);
      camera.position.set(0, 0.0, 4.2);

      // 3. Cinematic Studio & Magenta Rim Lighting
      const ambientLight = new THREE.AmbientLight(0x22173d, 2.2);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
      keyLight.position.set(2.5, 3.5, 4);
      scene.add(keyLight);

      const rimMagenta = new THREE.DirectionalLight(0xc026d3, 4.8);
      rimMagenta.position.set(-2.5, 2, -3);
      scene.add(rimMagenta);

      const fillCyan = new THREE.DirectionalLight(0x00e5ff, 2.4);
      fillCyan.position.set(-3, 0, 2.5);
      scene.add(fillCyan);

      const bounceOrange = new THREE.DirectionalLight(0xf97316, 1.4);
      bounceOrange.position.set(0, -3, 2);
      scene.add(bounceOrange);

      // 4. Interactive Drag & Slow Auto-Rotation State (Option A: slow auto-spin + drag)
      let isDragging = false;
      let prevPointer = { x: 0, y: 0 };
      let totalMove = 0;
      let autoRotY = 0;
      const autoRotSpeed = 0.22; // ~28 seconds per 360° (slow, majestic turntable pace)
      let dragRotY = 0;
      let targetDragRotY = 0;
      let dragRotX = 0;
      let targetDragRotX = 0;
      let lastDragTime = Date.now();

      const onPointerDown = (e) => {
        isDragging = true;
        prevPointer = { x: e.clientX, y: e.clientY };
        totalMove = 0;
        lastDragTime = Date.now();
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - prevPointer.x;
        const deltaY = e.clientY - prevPointer.y;
        totalMove += Math.hypot(deltaX, deltaY);

        targetDragRotY += deltaX * 0.007;
        targetDragRotX = Math.max(-0.30, Math.min(0.30, targetDragRotX + deltaY * 0.004));

        prevPointer = { x: e.clientX, y: e.clientY };
        lastDragTime = Date.now();
      };

      const onPointerUp = () => {
        if (isDragging) {
          isDragging = false;
          if (totalMove < 6 && onClick) {
            onClick();
          }
        }
      };

      container.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);

      // 5. Load GLB via High-Speed IndexedDB Cache
      try {
        const arrayBuffer = await loadGLBWithCache('/models/amplify ai.glb');
        if (isCancelled) return;

        const loader = new GLTFLoader();
        loader.parse(
          arrayBuffer,
          '',
          (gltf) => {
            if (isCancelled) return;
            const model = gltf.scene;

            // Auto-center and calculate normal compact scale
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            baseMascotScale = 1.38 / (maxDim || 1);

            model.position.sub(center);
            model.position.y -= 0.16; // Mascot a little bit down
            model.scale.setScalar(baseMascotScale);

            model.traverse((child) => {
              if (child.isMesh && child.material) {
                child.material.roughness = Math.max(child.material.roughness, 0.42);
                child.material.metalness = Math.min(child.material.metalness, 0.28);
              }
            });

            mascotRoot = new THREE.Group();
            mascotRoot.add(model);

            // Scale is strictly CONSTANT at normal size
            mascotRoot.position.y = -0.18;
            mascotRoot.scale.setScalar(baseMascotScale);
            scene.add(mascotRoot);

            // Trigger Entrance Glide Sequence
            isSurging = true;
            setShowFlash(true);
            setTimeout(() => setShowFlash(false), 700);
          },
          (err) => {
            console.warn('GLTF parse error:', err);
            setLoadError(true);
            setIsSummoning(false);
          }
        );
      } catch (err) {
        console.warn('Model fetch error:', err);
        setLoadError(true);
        setIsSummoning(false);
      }

      // 6. Resize Handler
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const newW = container.clientWidth || 140;
        const newH = container.clientHeight || 170;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };
      window.addEventListener('resize', handleResize);

      // 7. Render Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (!clock) return;
        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // 3. Smooth Vertical Glide (CONSTANT SIZE - NO SCALING UP/DOWN)
        if (isSurging && mascotRoot) {
          surgeProgress += delta * 1.35; // ~0.75s smooth glide
          if (surgeProgress >= 1.0) {
            surgeProgress = 1.0;
            isSurging = false;
            setIsSummoning(false);
            setHasMaterialized(true);
          }

          // Smooth cubic ease-out glide
          const t = surgeProgress;
          const easeOutCubic = 1 - Math.pow(1 - t, 3);

          mascotRoot.position.y = -0.18 * (1 - easeOutCubic);
          // Scale remains 100% constant at baseMascotScale at all times!
          mascotRoot.scale.setScalar(baseMascotScale);
        }

        // Smooth momentum damping for controlled rotation
        const damping = Math.min(1.0, delta * 6.5);
        dragRotY += (targetDragRotY - dragRotY) * damping;
        dragRotX += (targetDragRotX - dragRotX) * damping;

        // Slow, continuous 360° auto-rotation when not actively dragging
        if (!isDragging) {
          autoRotY += delta * autoRotSpeed;
          targetDragRotY *= 0.985;
          targetDragRotX *= 0.985;
        }

        // Mascot applies slow continuous turntable auto-rotation + user drag
        if (mascotRoot && !isSurging) {
          mascotRoot.position.y = 0;
          mascotRoot.rotation.x = dragRotX;
          mascotRoot.rotation.y = autoRotY + dragRotY;
          mascotRoot.rotation.z = 0;
        }

        renderer.render(scene, camera);
      };

      animate();

      cleanupFn = () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        if (container) {
          container.removeEventListener('pointerdown', onPointerDown);
        }
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);

        if (renderer) {
          if (renderer.domElement && container && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
          renderer.dispose();
        }

        if (scene) {
          scene.traverse((obj) => {
            if (obj.isMesh) {
              if (obj.geometry) obj.geometry.dispose();
              if (obj.material) {
                if (Array.isArray(obj.material)) {
                  obj.material.forEach((m) => m.dispose());
                } else {
                  obj.material.dispose();
                }
              }
            }
          });
        }
      };
    }, 600);

    let cleanupFn = () => { };

    return () => {
      isCancelled = true;
      clearTimeout(initTimer);
      cleanupFn();
    };
  }, [isOpen, onClick]);

  if (isOpen) return null;

  return (
    <div
      className={styles.floatingMascotWrapper}
      title={hasMaterialized ? "Drag to rotate 3D Mascot • Click to chat" : "Amplify AI Materializing..."}
      aria-label="Amplify AI 3D Interactive Mascot"
    >
      {/* 3D WebGL Canvas Container */}
      <div className={styles.canvasContainer}>
        {/* 1. Sleek Floor Portal Ring (Active during materializing, then settles into calm pedestal glow) */}
        {isSummoning && !loadError ? (
          <div className={styles.portalContainer}>
            <div className={styles.portalOuterRing} />
            <div className={styles.portalInnerRing} />
            <div className={styles.portalCoreGlow} />
          </div>
        ) : (
          <div className={styles.pedestalGlowQuiet} />
        )}

        {/* 2. Delicate Rising Stardust Particles */}
        {isSummoning && !loadError && (
          <div className={styles.particleField}>
            <span className={`${styles.particle} ${styles.p1}`} />
            <span className={`${styles.particle} ${styles.p2}`} />
            <span className={`${styles.particle} ${styles.p3}`} />
            <span className={`${styles.particle} ${styles.p4}`} />
            <span className={`${styles.particle} ${styles.p5}`} />
          </div>
        )}

        {/* 3. Soft Specular Materialization Flash */}
        {showFlash && <div className={styles.materializeFlash} />}

        {/* Fallback image if WebGL fails */}
        {loadError && (
          <img
            src="/models/poses/WELCOME.jpg"
            alt="Amplify AI Mascot"
            style={{ width: '84%', height: '84%', objectFit: 'contain', cursor: 'pointer' }}
            onClick={onClick}
          />
        )}

        {/* WebGL Canvas */}
        {!loadError && (
          <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
        )}
      </div>

      {/* Floating Action Pill */}
      <button className={styles.speechPill} onClick={onClick}>
        <span className={hasMaterialized ? styles.onlineDot : styles.summoningDot} />
        <span>
          {hasMaterialized ? (
            <>Amplify AI <span className={styles.sparkle}>✦</span></>
          ) : (
            <>Summoning AI <span className={styles.sparkle}>✨</span></>
          )}
        </span>
      </button>

      {/* Drag micro-hint */}
      <span className={styles.dragHintText}>
        {hasMaterialized ? 'Drag to rotate' : 'Click to chat'}
      </span>
    </div>
  );
}
