import React, { useEffect, useRef, useState, useCallback } from 'react';
import { clientLogos } from '../data/websiteContent';
import { getAssetUrl } from '../utils/assetUrl';
import styles from './ClientLogoBar.module.css';

/**
 * AMPLIFY DIGITAL — "TRUSTED BY LEADING BRANDS"
 * TRUE 3D CONVEX CYLINDER CURVE (UNIFORM FROSTED SILVER — NO HIGHLIGHT/GLOW)
 *
 * One continuous 3D mathematical curve spanning from the right side to the left side:
 * - Cylindrical 3D arc geometry (X = R*sin(θ), Z = R*(cos(θ) - 1))
 * - Middle frontside logo prominently sized (1.30x scale) in true 3D perspective
 * - UNIFORM frosted silver-white monochrome tone across all logos (NO brightened/highlighted glow)
 * - Flanking logos smoothly curve backward into 3D depth towards left and right edges
 * - True tangential Y-rotation (-θ) so logos stay flush along the 3D curved surface
 * - Subtle vertical convex arch elevation at center crest
 * - Pure logos only: completely borderless, transparent background, no card boxes
 * - Continuous kinetic auto-scroll on desktop and mobile with touch/drag support
 */
export default function ClientLogoBar() {
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const logosRef = useRef([]);
  const [isPaused, setIsPaused] = useState(false);
  const scrollOffsetRef = useRef(0);
  const targetOffsetRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Drag / swipe tracking
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  // Triplicate array to guarantee continuous seamless looping across all screen sizes
  const marqueeLogos = [...clientLogos, ...clientLogos, ...clientLogos];
  const count = marqueeLogos.length;

  // Handle click on a logo to smoothly center it
  const handleLogoClick = useCallback((index) => {
    const stage = stageRef.current;
    if (!stage) return;
    const isMobile = (stage.clientWidth || window.innerWidth) < 640;
    const spacing = isMobile ? 140 : 195;
    const totalCircumference = count * spacing;

    // Shortest path modulo wrap to center target logo
    const targetX = index * spacing;
    let current = scrollOffsetRef.current;
    let diff = (targetX - current) % totalCircumference;
    if (diff > totalCircumference / 2) diff -= totalCircumference;
    if (diff < -totalCircumference / 2) diff += totalCircumference;

    targetOffsetRef.current = current + diff;
  }, [count]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let isDestroyed = false;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReduced = mediaQuery.matches;

    const render = () => {
      if (isDestroyed) return;

      const stageWidth = stage.clientWidth || window.innerWidth;
      const isMobile = stageWidth < 640;

      // 3D Curve Geometry Parameters
      const spacing = isMobile ? 140 : 195;
      const totalCircumference = count * spacing;
      const autoSpeed = isMobile ? 0.65 : 0.78;
      
      // Radius of the 3D cylinder arc
      const R = isMobile ? 580 : 900;
      const verticalArch = isMobile ? 18 : 28; // Vertical convex crest rise (px)

      // Animation & target interpolation
      if (targetOffsetRef.current !== null) {
        const diff = targetOffsetRef.current - scrollOffsetRef.current;
        if (Math.abs(diff) < 0.5) {
          scrollOffsetRef.current = targetOffsetRef.current;
          targetOffsetRef.current = null;
        } else {
          scrollOffsetRef.current += diff * 0.12;
        }
      } else if (!isPaused && !isDraggingRef.current && !prefersReduced) {
        scrollOffsetRef.current = (scrollOffsetRef.current + autoSpeed) % totalCircumference;
      }

      // Ensure positive modulo wrap
      if (scrollOffsetRef.current < 0) {
        scrollOffsetRef.current += totalCircumference;
      } else if (scrollOffsetRef.current >= totalCircumference) {
        scrollOffsetRef.current %= totalCircumference;
      }

      const currentScroll = scrollOffsetRef.current;

      logosRef.current.forEach((logoEl, index) => {
        if (!logoEl) return;

        const baseX = index * spacing;
        let pos = (baseX - currentScroll) % totalCircumference;
        if (pos > totalCircumference / 2) {
          pos -= totalCircumference;
        } else if (pos < -totalCircumference / 2) {
          pos += totalCircumference;
        }

        // Angle in radians along the continuous 3D cylinder
        const angleRad = pos / R;
        const angleDeg = angleRad * (180 / Math.PI);
        const cosAngle = Math.cos(angleRad);
        const sinAngle = Math.sin(angleRad);

        // Frontside curve: geometry only, no color change
        const proximity = Math.max(0, cosAngle);
        const frontsideBoost = proximity ** 1.4;

        // TRUE 3D CYLINDER CURVE:
        // x = R * sin(θ)
        // z: center pops forward (+38px), sides curve deep into negative z
        const x = R * sinAngle;
        const z = R * (cosAngle - 1) + (38 * frontsideBoost);

        // Tangent rotation around Y:
        // The logo faces outward normal to the cylinder, smoothly rotating by -angleDeg
        const rotateY = -angleDeg;

        // Vertical convex arch with balanced baseline position in compact stage
        const baseYOffset = isMobile ? 8 : 14;
        const y = baseYOffset - verticalArch * Math.max(0, cosAngle ** 2);

        // Scale: all logos enlarged (sides 0.88-0.90x, middle front reaches ~1.38x!)
        const scale = Math.max(0.88, 0.90 + 0.48 * frontsideBoost);

        // UNIFORM Opacity: brightened frosted silver tone (0.88 - 0.92) across all logos
        const opacity = Math.min(0.92, Math.max(0.40, 0.92 * proximity));

        // Z-Index layer hierarchy: center crest is always in front
        const zIndex = Math.max(1, Math.round(100 * proximity));

        logoEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        logoEl.style.opacity = opacity;
        logoEl.style.zIndex = zIndex;
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [count, isPaused]);

  // Touch / Pointer drag handlers for interactive swiping
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartOffsetRef.current = scrollOffsetRef.current;
    targetOffsetRef.current = null;
    setIsPaused(true);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = dragStartXRef.current - currentX;
    scrollOffsetRef.current = dragStartOffsetRef.current + deltaX;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsPaused(false);
  };

  return (
    <section className={styles.curveSection} aria-label="Trusted by Leading Brands">
      {/* Centered Minimalist Micro-Label */}
      <div className={styles.labelContainer}>
        <span className={styles.microLabel}>
          Trusted by over 50+ leading brands
        </span>
      </div>

      {/* True 3D Convex Curve Stage */}
      <div
        ref={stageRef}
        className={styles.curveStage}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <div ref={trackRef} className={styles.curveTrack}>
          {marqueeLogos.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              ref={(el) => (logosRef.current[index] = el)}
              className={styles.logoItem}
              title={brand.name}
              onClick={() => handleLogoClick(index)}
            >
              <img
                src={getAssetUrl(brand.logo)}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                className={styles.brandLogoImg}
                style={{
                  maxHeight: `${Math.round((brand.height || 36) * 1.35)}px`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
