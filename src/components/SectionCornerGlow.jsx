import React from 'react';
import styles from './SectionCornerGlow.module.css';

/**
 * SectionCornerGlow Component
 * Renders signature dual-corner atmospheric illumination for every section:
 * - Starting corner (Top-Left): Luminous electric purple & neon violet nebula
 * - End corner (Bottom-Right): Radiant fiery warm orange & golden amber bloom
 * - Pinpoint glowing star dots (matching HeroSection) with subtle twinkle
 * - 100% pointer-events-none, hardware-accelerated, zero layout interference
 */
export default function SectionCornerGlow({
  topLeftColor = '#6D18FF',
  bottomRightColor = '#FF6500',
  showStars = true,
}) {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      {/* ── Starting Corner: Top-Left Electric Violet Nebula ──────────────── */}
      <div 
        className={styles.topLeftGlow}
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 15% 15%, rgba(109, 24, 255, 0.68) 0%, rgba(160, 32, 255, 0.44) 35%, rgba(240, 0, 212, 0.18) 60%, transparent 75%)',
          filter: 'blur(75px)',
        }}
      />

      {/* ── End Corner: Bottom-Right Fiery Sunset Orange Bloom ────────────── */}
      <div 
        className={styles.bottomRightGlow}
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 85% 85%, rgba(255, 101, 0, 0.70) 0%, rgba(255, 155, 0, 0.42) 35%, rgba(255, 39, 156, 0.22) 60%, transparent 75%)',
          filter: 'blur(75px)',
        }}
      />

      {/* ── Pinpoint Glowing Star Dots (Like Hero Section) ───────────────── */}
      {showStars && (
        <div className={styles.starsContainer}>
          {/* Top-Left Star Cluster */}
          <span
            className={`${styles.star} ${styles.star1}`}
            style={{ left: '8%', top: '16%' }}
          />
          <span
            className={`${styles.star} ${styles.star2}`}
            style={{ left: '16%', top: '32%' }}
          />

          {/* Bottom-Right Star Cluster */}
          <span
            className={`${styles.star} ${styles.star3}`}
            style={{ left: '88%', top: '68%' }}
          />
          <span
            className={`${styles.star} ${styles.star4}`}
            style={{ left: '94%', top: '84%' }}
          />
        </div>
      )}
    </div>
  );
}
