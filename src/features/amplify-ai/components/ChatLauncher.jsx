import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import {
  MASCOT_MODEL_PATH,
  loadGLBWithCache,
  isModelReady,
  getPreloadedGLTF,
  preloadAndParseModel
} from '../services/modelCache';
import styles from '../styles/ChatLauncher.module.css';

/**
 * AMPLIFY AI — 3D FLOATING MASCOT LAUNCHER (PERFECTED MAXIMUM SPEED)
 * Features:
 * 1. Immediate Synchronous Mount with Preloaded RAM Cache (0ms perceived load).
 * 2. Instantaneous Materialization when pre-cached; ultra-fast snappy entrance for cold fetch.
 * 3. 3D Mascot vertical framing — STRICTLY CONSTANT SIZE (no shrinking or growing).
 * 4. High-Speed IndexedDB v2 Cache: instant loading on every return visit.
 * 5. Full 360° Drag-to-Rotate with smooth momentum & cursor glance.
 */
export default function ChatLauncher({ isOpen, onClick }) {
  const mountRef = useRef(null);
  const initialReady = isModelReady();
  const [isSummoning, setIsSummoning] = useState(!initialReady);
  const [hasMaterialized, setHasMaterialized] = useState(initialReady);
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
    let mixer = null;
    let clock = new THREE.Clock();

    let surgeProgress = 0.0;
    let isSurging = false;
    let baseMascotScale = 1.0;

    const container = mountRef.current;
    if (!container) return;

    // 1. Initialize WebGL Renderer Immediately
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
      renderer.setSize(container.clientWidth || 165, container.clientHeight || 195);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed:', e);
      setLoadError(true);
      setIsSummoning(false);
      return;
    }

    // 2. Camera Setup (Tuned with subtle offset for balanced eagle & speech cloud)
    scene = new THREE.Scene();
    const w = container.clientWidth || 165;
    const h = container.clientHeight || 195;
    camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100);
    camera.position.set(0.04, -0.04, 3.95);

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

    // 4. Interactive Look & Gentle Left/Right Motion State
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    let totalMove = 0;
    let dragRotY = 0;
    let targetDragRotY = 0;
    let dragRotX = 0;
    let targetDragRotX = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };
      totalMove = 0;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - prevPointer.x;
      const deltaY = e.clientY - prevPointer.y;
      totalMove += Math.hypot(deltaX, deltaY);

      // Bounded glance response - no 360° spin
      targetDragRotY = Math.max(-0.35, Math.min(0.35, targetDragRotY + deltaX * 0.005));
      targetDragRotX = Math.max(-0.20, Math.min(0.20, targetDragRotX + deltaY * 0.003));

      prevPointer = { x: e.clientX, y: e.clientY };
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

    // Helper to configure and mount model scene
    const setupModel = (gltf) => {
      if (isCancelled || !gltf || !gltf.scene) return;

      const model = SkeletonUtils.clone(gltf.scene);

      // Auto-center and calculate normal compact scale based on eagle body mesh
      // ensuring the eagle character retains the exact same size and position
      const eagleMesh = model.getObjectByName('tripo_node_c4e30960-a0e1-4e12-84bb-8e26c') || model;
      const box = new THREE.Box3().setFromObject(eagleMesh);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      baseMascotScale = 1.58 / (maxDim || 1);

      model.position.sub(center);
      model.position.y -= 0.16; // Perfectly balanced vertical posture
      model.scale.set(1, 1, 1); // Single scale source on mascotRoot

      model.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.roughness = Math.max(child.material.roughness, 0.42);
          child.material.metalness = Math.min(child.material.metalness, 0.28);

          // Maximize texture sharpness and text readability on CloudHi
          if (child.material.map) {
            child.material.map.anisotropy = 16;
            child.material.map.minFilter = THREE.LinearMipmapLinearFilter;
            child.material.map.magFilter = THREE.LinearFilter;
            child.material.map.needsUpdate = true;
          }
        }
      });

      mascotRoot = new THREE.Group();
      mascotRoot.add(model);
      mascotRoot.scale.setScalar(baseMascotScale);

      // Play the genuine rigged 10s FriendlyLoop animation
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.setLoop(THREE.LoopRepeat);
        action.play();
      }

      if (isModelReady()) {
        // Pre-cached or ready: Instant 0ms presence
        mascotRoot.position.y = 0;
        scene.add(mascotRoot);
        setIsSummoning(false);
        setHasMaterialized(true);
      } else {
        // Fast, snappy entrance glide
        mascotRoot.position.y = -0.18;
        scene.add(mascotRoot);
        isSurging = true;
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 240);
      }
    };

    // 5. Retrieve Model at Maximum Speed (Preloaded RAM -> IndexedDB -> Network)
    (async () => {
      try {
        const preloaded = getPreloadedGLTF();
        if (preloaded) {
          setupModel(preloaded);
          return;
        }

        const parsed = await preloadAndParseModel();
        if (isCancelled) return;
        if (parsed) {
          setupModel(parsed);
          return;
        }

        const buffer = await loadGLBWithCache(MASCOT_MODEL_PATH);
        if (isCancelled) return;

        const loader = new GLTFLoader();
        loader.parse(
          buffer.slice(0),
          '',
          (gltf) => {
            if (isCancelled) return;
            setupModel(gltf);
          },
          (err) => {
            console.warn('GLTF parse error:', err);
            setLoadError(true);
            setIsSummoning(false);
          }
        );
      } catch (err) {
        console.warn('Model fetch error:', err);
        if (!isCancelled) {
          setLoadError(true);
          setIsSummoning(false);
        }
      }
    })();

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

      if (mixer) {
        mixer.update(delta);
      }

      // Smooth, ultra-fast Vertical Glide if surging
      if (isSurging && mascotRoot) {
        surgeProgress += delta * 4.2; // ~0.24s ultra-fast entrance
        if (surgeProgress >= 1.0) {
          surgeProgress = 1.0;
          isSurging = false;
          setIsSummoning(false);
          setHasMaterialized(true);
        }

        const t = surgeProgress;
        const easeOutCubic = 1 - Math.pow(1 - t, 3);
        mascotRoot.position.y = -0.18 * (1 - easeOutCubic);
        mascotRoot.scale.setScalar(baseMascotScale);
      }

      // Smooth momentum damping for controlled glance
      const damping = Math.min(1.0, delta * 6.5);
      dragRotY += (targetDragRotY - dragRotY) * damping;
      dragRotX += (targetDragRotX - dragRotX) * damping;

      if (!isDragging) {
        // Return drag glance gently back to center
        targetDragRotY *= 0.94;
        targetDragRotX *= 0.94;
      }

      // Mascot Motion: Looks straight forward first, then performs natural, gentle left/right glances
      if (mascotRoot && !isSurging) {
        const elapsedTime = clock.getElapsedTime();

        // 1. Initial State: Always look completely straight ahead first (at least 2.5s)
        let targetX = 0;
        let targetYaw = 0;

        if (elapsedTime >= 2.5) {
          // 8-second organic observation cycle:
          // [0s - 2.0s]: Rest looking straight ahead at user
          // [2.0s - 3.6s]: Gentle glance left, then return to straight
          // [3.6s - 5.5s]: Rest looking straight ahead at user
          // [5.5s - 7.1s]: Gentle glance right, then return to straight
          // [7.1s - 8.0s]: Rest looking straight ahead at user
          const cycleTime = (elapsedTime - 2.5) % 8.0;

          if (cycleTime >= 2.0 && cycleTime < 3.6) {
            // Glance smoothly to the left and back
            const p = (cycleTime - 2.0) / 1.6;
            const curve = Math.sin(p * Math.PI);
            targetX = -0.045 * curve;
            targetYaw = -0.22 * curve;
          } else if (cycleTime >= 5.5 && cycleTime < 7.1) {
            // Glance smoothly to the right and back
            const p = (cycleTime - 5.5) / 1.6;
            const curve = Math.sin(p * Math.PI);
            targetX = 0.045 * curve;
            targetYaw = 0.22 * curve;
          }
        }

        // Subtle vertical breathing bob
        const breatheY = Math.sin(elapsedTime * 2.2) * 0.014;
        // Subtle banking roll only during glance
        const bankRoll = -targetYaw * 0.08;

        mascotRoot.position.x = targetX;
        mascotRoot.position.y = breatheY;
        mascotRoot.rotation.x = dragRotX;
        mascotRoot.rotation.y = targetYaw + dragRotY;
        mascotRoot.rotation.z = bankRoll;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('pointerdown', onPointerDown);
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      if (mixer) {
        mixer.stopAllAction();
      }

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
  }, [isOpen, onClick]);

  if (isOpen) return null;

  return (
    <div
      className={styles.floatingMascotWrapper}
      title={hasMaterialized ? "Amplify AI • Click to chat" : "Amplify AI Materializing..."}
      aria-label="Amplify AI 3D Interactive Mascot"
    >
      {/* 3D WebGL Canvas Container */}
      <div className={styles.canvasContainer}>
        {/* 1. Sleek Floor Portal Ring */}
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

      {/* Interaction micro-hint */}
      <span className={styles.dragHintText}>
        {hasMaterialized ? 'Click to chat' : 'Click to chat'}
      </span>
    </div>
  );
}
