import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { POSE_CONFIGS } from './MascotAnimations';
import { MascotInteractions } from './MascotInteractions';
import styles from './Mascot3D.module.css';

/**
 * AMPLIFY AI — 3D MASCOT WEBGL VIEWPORT
 * Renders the genuine 3D rigged/mesh character with dynamic studio lighting,
 * mouse-drag orbit, breathing bob, and 7-state pose transitions.
 */
export default function Mascot3D({ currentState = 'WELCOME', controller }) {
  const containerRef = useRef(null);
  const interactionsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const activePose = POSE_CONFIGS[currentState] || POSE_CONFIGS.WELCOME;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    let renderer;
    let scene;
    let camera;
    let mascotRoot = null;
    let clock = new THREE.Clock();

    // 1. Initialize WebGL Renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(container.clientWidth || 380, container.clientHeight || 220);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed, using high-fidelity fallback:', e);
      setLoadError(true);
      setIsLoading(false);
      return;
    }

    // 2. Scene & Camera Setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      32,
      (container.clientWidth || 380) / (container.clientHeight || 220),
      0.1,
      100
    );
    camera.position.set(0, 0.2, 3.2);

    // 3. Studio & Neon Rim Lighting (Amplify Visual Identity)
    const ambientLight = new THREE.AmbientLight(0x241d3b, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    const rimLightMagenta = new THREE.DirectionalLight(0xc026d3, 3.6);
    rimLightMagenta.position.set(-2.5, 3, -3);
    scene.add(rimLightMagenta);

    const fillLightCyan = new THREE.DirectionalLight(0x06b6d4, 1.8);
    fillLightCyan.position.set(-3, 1, 2);
    scene.add(fillLightCyan);

    const bounceOrange = new THREE.DirectionalLight(0xf97316, 1.2);
    bounceOrange.position.set(0, -3, 2);
    scene.add(bounceOrange);

    // 4. Interaction Controller (Mouse Drag & Head Tracking)
    interactionsRef.current = new MascotInteractions(container);

    // 5. Load Genuine 3D GLB Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/amplify ai.glb',
      (gltf) => {
        const model = gltf.scene;

        // Auto-center and normalize model scale
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.85 / (maxDim || 1);

        model.position.sub(center);
        model.position.y -= 0.15; // Ground slightly
        model.scale.setScalar(scale);

        // Enhance materials
        model.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.roughness = Math.max(child.material.roughness, 0.45);
            child.material.metalness = Math.min(child.material.metalness, 0.25);
          }
        });

        mascotRoot = new THREE.Group();
        mascotRoot.add(model);
        scene.add(mascotRoot);

        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.warn('Failed to load 3D GLB model, using canonical pose visual:', err);
        setLoadError(true);
        setIsLoading(false);
      }
    );

    // 6. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 380;
      const h = container.clientHeight || 220;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Update state transitions
      if (controller) {
        controller.update(delta);
      }

      // Update drag inertia
      if (interactionsRef.current) {
        interactionsRef.current.update(delta);
      }

      // Apply transforms to 3D character
      if (mascotRoot) {
        const blended = controller ? controller.getBlendedTransform(elapsedTime) : {
          pitch: 0, yaw: 0, roll: 0, y: 0, scaleMod: 1
        };
        const drag = interactionsRef.current ? interactionsRef.current.getRotations() : { yaw: 0, pitch: 0 };

        mascotRoot.position.y = blended.y;
        mascotRoot.rotation.x = blended.pitch + drag.pitch;
        mascotRoot.rotation.y = blended.yaw + drag.yaw;
        mascotRoot.rotation.z = blended.roll;
        mascotRoot.scale.setScalar(blended.scaleMod);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup & Resource Disposal (PART 13 & 14)
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      if (interactionsRef.current) {
        interactionsRef.current.dispose();
      }

      if (renderer) {
        if (renderer.domElement && container.contains(renderer.domElement)) {
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
  }, [controller]);

  return (
    <div 
      className={styles.mascotContainer} 
      style={{ '--mascot-aura': activePose.auraColor }}
    >
      {/* Background radial glow */}
      <div className={styles.ambientBackdropGlow} />

      {/* Active Pose HUD Chip */}
      <div className={styles.poseBadge}>
        <span className={styles.poseIndicatorDot} />
        <span>{activePose.name}</span>
      </div>

      {/* WebGL Canvas or 2D High-Fidelity Fallback */}
      {loadError ? (
        <img 
          src={activePose.image} 
          alt={`Amplify AI in ${activePose.name} pose`}
          className={styles.fallbackImage}
        />
      ) : (
        <div ref={containerRef} className={styles.canvasWrapper} />
      )}

      {/* Loading Overlay */}
      {isLoading && !loadError && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
          <span className={styles.loadingText}>Initializing 3D Amplify AI...</span>
        </div>
      )}

      {/* Drag Interaction Hint */}
      {!isLoading && !loadError && (
        <span className={styles.dragHint}>Drag to rotate 3D mascot</span>
      )}
    </div>
  );
}
