import React from 'react';
import InteractiveDigitalCanvas from './InteractiveDigitalCanvas';
import styles from './ContinuousNeonBackground.module.css';

/**
 * AMPLIFY DIGITAL — MASTER CONTINUOUS HIGH-TECH DIGITAL ANIMATED BACKGROUND
 * 
 * Authentic Digital Agency Aesthetic:
 * - Interactive Digital Canvas: Living constellation network, floating origami facets,
 *   and responsive cursor chromatic spotlight spanning the full viewport.
 * - Subtle Cybernetic Dot-Matrix & Coordinate Grid with glowing nodal intersections and ambient quantum sweep.
 * - Left Flank: Living, fluid electric purple (#6D18FF), vivid violet (#9333EA) & cyber cyan (#00E5FF)
 *   plasma fields beginning smoothly at "Trusted by leading brands" (~20%) and flowing through Footer.
 * - Right Flank: Radiant solar amber (#FF7A00), electric orange (#FF4500) & neon coral (#FF279C)
 *   plasma fields beginning precisely at Card 05 / Selected Work (~38%) and flowing through Footer.
 * - Digital Fiber-Optic Energy Filaments with smooth zero-cut fade-in/fade-out gradients and travelling data packets.
 * - Pinpoint Data Nodes with multi-frequency breathing pulses and expanding energy halopings.
 * - Dark Center Column Vignette ensuring 100% high-contrast legibility for all typography and interactive cards.
 * - Preserved Footer neon wave ribbon at the base.
 * - GPU-accelerated (will-change: transform, opacity) locked for 60Hz/120Hz smooth performance.
 */

// Strategic digital data node coordinates with multi-phase breathing pulses
const DIGITAL_NODES = [
  // Upper Atmosphere (Trusted by Leading Brands)
  { left: '12%', top: '21.5%', sizeClass: styles.size2, colorClass: styles.colorWhite, animClass: styles.animNode1, halo: true },
  { left: '22%', top: '24.2%', sizeClass: styles.size2_5, colorClass: styles.colorCyan200, animClass: styles.animNode2 },
  { left: '88%', top: '23.8%', sizeClass: styles.size2, colorClass: styles.colorAmber200, animClass: styles.animNode3 },
  { left: '80%', top: '27.4%', sizeClass: styles.size2_5, colorClass: styles.colorPurple200, animClass: styles.animNode1 },
  { left: '6%', top: '28.0%', sizeClass: styles.size2, colorClass: styles.colorSky200, animClass: styles.animNode2 },
  { left: '94%', top: '29.5%', sizeClass: styles.size2, colorClass: styles.colorWhite, animClass: styles.animNode3 },

  // Middle-Upper Atmosphere (What We Do / Bento Grid)
  { left: '14%', top: '33.0%', sizeClass: styles.size2_5, colorClass: styles.colorPurple300, animClass: styles.animNode1, halo: true },
  { left: '8%', top: '37.4%', sizeClass: styles.size2, colorClass: styles.colorCyan200, animClass: styles.animNode3 },
  { left: '86%', top: '35.8%', sizeClass: styles.size2_5, colorClass: styles.colorAmber300, animClass: styles.animNode2 },
  { left: '92%', top: '38.5%', sizeClass: styles.size2, colorClass: styles.colorWhite, animClass: styles.animNode1 },

  // Middle Atmosphere (Selected Work / 3D Coverflow)
  { left: '10%', top: '44.5%', sizeClass: styles.size3, colorClass: styles.colorCyan300, animClass: styles.animNode1, halo: true },
  { left: '22%', top: '48.0%', sizeClass: styles.size2, colorClass: styles.colorPurple200, animClass: styles.animNode2 },
  { left: '89%', top: '46.8%', sizeClass: styles.size2_5, colorClass: styles.colorAmber200, animClass: styles.animNode3 },
  { left: '78%', top: '51.4%', sizeClass: styles.size3, colorClass: styles.colorOrange300, animClass: styles.animNode1, halo: true },
  { left: '7%', top: '55.0%', sizeClass: styles.size2, colorClass: styles.colorSky200, animClass: styles.animNode2 },
  { left: '93%', top: '57.5%', sizeClass: styles.size2, colorClass: styles.colorWhite, animClass: styles.animNode3 },

  // Impact Section
  { left: '14%', top: '63.2%', sizeClass: styles.size2_5, colorClass: styles.colorPurple300, animClass: styles.animNode2 },
  { left: '84%', top: '65.8%', sizeClass: styles.size2_5, colorClass: styles.colorAmber300, animClass: styles.animNode1, halo: true },

  // Lower Atmosphere (Testimonials, CTA & Footer)
  { left: '9%', top: '75.0%', sizeClass: styles.size2, colorClass: styles.colorCyan200, animClass: styles.animNode3 },
  { left: '88%', top: '76.4%', sizeClass: styles.size2_5, colorClass: styles.colorOrange300, animClass: styles.animNode2 },
  { left: '20%', top: '84.5%', sizeClass: styles.size2, colorClass: styles.colorWhite, animClass: styles.animNode1 },
  { left: '78%', top: '86.2%', sizeClass: styles.size3, colorClass: styles.colorPink300, animClass: styles.animNode3, halo: true },
  { left: '11%', top: '92.0%', sizeClass: styles.size2_5, colorClass: styles.colorPurple200, animClass: styles.animNode1 },
  { left: '86%', top: '95.5%', sizeClass: styles.size2, colorClass: styles.colorAmber300, animClass: styles.animNode2 },
];

export default function ContinuousNeonBackground() {
  return (
    <>
      {/* ── Fixed Viewport Interactive Canvas (Full Viewport Constellations & Shards) ── */}
      <InteractiveDigitalCanvas />

      {/* ── Continuous Seamless Canvas (Full Height Page Flow) ── */}
      <div
        className={styles.canvasWrapper}
        aria-hidden="true"
      >
        {/* ══════════════════════════════════════════════════════════════════
            1. SUBTLE CYBERNETIC DOT-MATRIX & COORDINATE GRID
           ══════════════════════════════════════════════════════════════════ */}
        <div className={styles.cyberGridWrap}>
          <svg className={styles.cyberGridSvg} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="digitalCyberGrid"
                width="56"
                height="56"
                patternUnits="userSpaceOnUse"
              >
                {/* Subtle matrix grid lines */}
                <path
                  d="M 56 0 L 0 0 0 56"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.035)"
                  strokeWidth="1"
                />
                {/* Pinpoint intersection dot */}
                <circle cx="0" cy="0" r="1.1" fill="rgba(0, 229, 255, 0.3)" />
                {/* Micro cyber crosshair at grid midpoint */}
                <path
                  d="M 27 28 L 29 28 M 28 27 L 28 29"
                  stroke="rgba(168, 85, 247, 0.22)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#digitalCyberGrid)" />
          </svg>

          {/* Ambient diagonal quantum sweep line */}
          <div className={styles.quantumSweepWrap}>
            <div className={styles.quantumSweepLine} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            2. LEFT FLANK — LIVING CYBER PURPLE & VIOLET PLASMA FIELDS
           ══════════════════════════════════════════════════════════════════ */}

        {/* Upper-Left Cyber Violet Aurora */}
        <div className={styles.plasmaLeft1} />

        {/* Upper-Left Accent Cyan Glow Pulse */}
        <div className={styles.plasmaCyanPulse} />

        {/* Middle-Left Vivid Violet Plasma */}
        <div className={styles.plasmaLeft2} />

        {/* Middle-Left Electric Violet/Purple */}
        <div className={styles.plasmaLeft3} />

        {/* Lower-Middle Left Deep Violet Plasma */}
        <div className={styles.plasmaLeft4} />

        {/* Testimonials Zone Left Electric Purple Plasma */}
        <div className={styles.plasmaLeft5} />

        {/* Lower-Left Deep Violet/Neon Purple Rising Bloom */}
        <div className={styles.plasmaLeft6} />

        {/* ══════════════════════════════════════════════════════════════════
            3. RIGHT FLANK — LIVING SOLAR AMBER & SUNSET ORANGE PLASMA FIELDS
           ══════════════════════════════════════════════════════════════════ */}

        {/* Upper-Right Warm Amber & Coral Plasma */}
        <div className={styles.plasmaRight1} />

        {/* Lower-Middle Right Sunset Amber Glow */}
        <div className={styles.plasmaRight2} />

        {/* Testimonials Zone Right Warm Amber & Coral Plasma */}
        <div className={styles.plasmaRight3} />

        {/* Lower-Right Fiery Radiant Solar Amber-Red Nebula */}
        <div className={styles.plasmaRight4} />

        {/* ── Dark Center Column Vignette (Guarantees Razor-Sharp Content Contrast) ── */}
        <div className={styles.centerVignette} />

        {/* ══════════════════════════════════════════════════════════════════
            5. PINPOINT DIGITAL DATA NODES & BREATHING HALO PINGS
           ══════════════════════════════════════════════════════════════════ */}
        <div className={styles.nodesContainer}>
          {DIGITAL_NODES.map((node, idx) => (
            <div
              key={idx}
              className={styles.nodeAnchor}
              style={{
                left: node.left,
                top: node.top,
              }}
            >
              {/* Core pinpoint node */}
              <span
                className={`${styles.nodeDot} ${node.sizeClass} ${node.colorClass} ${node.animClass}`}
              />
              {/* Optional expanding cyber halo ping for key flagship nodes */}
              {node.halo && (
                <span className={styles.nodeHalo} />
              )}
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            6. FOOTER NEON WAVE RIBBON (PRESERVED AT FOOTER BASE)
           ══════════════════════════════════════════════════════════════════ */}
        <div className={styles.footerWaveWrap}>
          <svg
            className={styles.footerWaveSvg}
            viewBox="0 0 1440 220"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="neonGradFooter" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#6D18FF" stopOpacity="0.85" />
                <stop offset="22%" stopColor="#A020FF" stopOpacity="0.95" />
                <stop offset="48%" stopColor="#F000D4" stopOpacity="1" />
                <stop offset="70%" stopColor="#FF279C" stopOpacity="1" />
                <stop offset="86%" stopColor="#FF6500" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF9B00" stopOpacity="0.95" />
              </linearGradient>

              <filter id="footerWaveGlow" x="-20%" y="-100%" width="140%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Secondary Echo Filament in Lower Right */}
            <path
              d="M 850 160 C 1040 145, 1240 120, 1440 85"
              stroke="#FF6500"
              strokeWidth="3.5"
              strokeOpacity="0.45"
              filter="url(#footerWaveGlow)"
            />

            {/* Diffuse Luminous Aura Layer */}
            <path
              d="M 0 120 C 260 150, 520 160, 760 135 C 1000 105, 1220 70, 1440 45"
              stroke="url(#neonGradFooter)"
              strokeWidth="7"
              strokeOpacity="0.50"
              filter="url(#footerWaveGlow)"
            />

            {/* Sharp High-Precision Core Filament */}
            <path
              d="M 0 120 C 260 150, 520 160, 760 135 C 1000 105, 1220 70, 1440 45"
              stroke="url(#neonGradFooter)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ── Seamless Bottom Termination ─────────────────────────────── */}
        <div className={styles.bottomTermination} />
      </div>
    </>
  );
}
