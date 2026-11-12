import React from 'react';
import styles from './RealisticGlassSurface.module.css';

/**
 * RealisticGlassSurface
 * Physical optical glass overlays rendered at the topmost layer (pointer-events-none):
 * 1. Razor-sharp top and left specular refraction cut-bevels
 * 2. Prismatic studio light caustics / diagonal glare (VisionOS & Linear style)
 * 3. Micro-fine etched silica grain texture
 */
export default function RealisticGlassSurface({ accentGlow = null }) {
  return (
    <>
      {/* ── 1. Top Specular Cut-Edge Refraction Line ── */}
      <div className={styles.topRefraction} />

      {/* ── 2. Left Edge Specular Refraction Line ── */}
      <div className={styles.leftRefraction} />

      {/* ── 3. Diagonal Studio Ambient Light Glare ── */}
      <div className={styles.studioGlare} />

      {/* ── 4. Subtle Micro-Frosted Silica Grain ── */}
      <div className={styles.silicaGrain} />

      {/* ── 5. Optional Accent Glow Halo on Glass Rim ── */}
      {accentGlow && (
        <div
          className={styles.accentGlow}
          style={{ boxShadow: `inset 0 0 20px ${accentGlow}` }}
        />
      )}
    </>
  );
}
