import React from 'react';
import InteractiveDigitalCanvas from './InteractiveDigitalCanvas';

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
  { left: '12%', top: '21.5%', size: 'w-[2px] h-[2px]', color: 'bg-white', anim: 'animate-digital-node-1', halo: true },
  { left: '22%', top: '24.2%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-cyan-200', anim: 'animate-digital-node-2' },
  { left: '88%', top: '23.8%', size: 'w-[2px] h-[2px]', color: 'bg-amber-200', anim: 'animate-digital-node-3' },
  { left: '80%', top: '27.4%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-purple-200', anim: 'animate-digital-node-1' },
  { left: '6%', top: '28.0%', size: 'w-[2px] h-[2px]', color: 'bg-sky-200', anim: 'animate-digital-node-2' },
  { left: '94%', top: '29.5%', size: 'w-[2px] h-[2px]', color: 'bg-white', anim: 'animate-digital-node-3' },

  // Middle-Upper Atmosphere (What We Do / Bento Grid)
  { left: '14%', top: '33.0%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-purple-300', anim: 'animate-digital-node-1', halo: true },
  { left: '8%', top: '37.4%', size: 'w-[2px] h-[2px]', color: 'bg-cyan-200', anim: 'animate-digital-node-3' },
  { left: '86%', top: '35.8%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-amber-300', anim: 'animate-digital-node-2' },
  { left: '92%', top: '38.5%', size: 'w-[2px] h-[2px]', color: 'bg-white', anim: 'animate-digital-node-1' },

  // Middle Atmosphere (Selected Work / 3D Coverflow)
  { left: '10%', top: '44.5%', size: 'w-[3px] h-[3px]', color: 'bg-cyan-300', anim: 'animate-digital-node-1', halo: true },
  { left: '22%', top: '48.0%', size: 'w-[2px] h-[2px]', color: 'bg-purple-200', anim: 'animate-digital-node-2' },
  { left: '89%', top: '46.8%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-amber-200', anim: 'animate-digital-node-3' },
  { left: '78%', top: '51.4%', size: 'w-[3px] h-[3px]', color: 'bg-orange-300', anim: 'animate-digital-node-1', halo: true },
  { left: '7%', top: '55.0%', size: 'w-[2px] h-[2px]', color: 'bg-sky-200', anim: 'animate-digital-node-2' },
  { left: '93%', top: '57.5%', size: 'w-[2px] h-[2px]', color: 'bg-white', anim: 'animate-digital-node-3' },

  // Impact Section
  { left: '14%', top: '63.2%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-purple-300', anim: 'animate-digital-node-2' },
  { left: '84%', top: '65.8%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-amber-300', anim: 'animate-digital-node-1', halo: true },

  // Lower Atmosphere (Testimonials, CTA & Footer)
  { left: '9%', top: '75.0%', size: 'w-[2px] h-[2px]', color: 'bg-cyan-200', anim: 'animate-digital-node-3' },
  { left: '88%', top: '76.4%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-orange-300', anim: 'animate-digital-node-2' },
  { left: '20%', top: '84.5%', size: 'w-[2px] h-[2px]', color: 'bg-white', anim: 'animate-digital-node-1' },
  { left: '78%', top: '86.2%', size: 'w-[3px] h-[3px]', color: 'bg-pink-300', anim: 'animate-digital-node-3', halo: true },
  { left: '11%', top: '92.0%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-purple-200', anim: 'animate-digital-node-1' },
  { left: '86%', top: '95.5%', size: 'w-[2px] h-[2px]', color: 'bg-amber-300', anim: 'animate-digital-node-2' },
];

export default function ContinuousNeonBackground() {
  return (
    <>
      {/* ── Fixed Viewport Interactive Canvas (Full Viewport Constellations & Shards) ── */}
      <InteractiveDigitalCanvas />

      {/* ── Continuous Seamless Canvas (Full Height Page Flow) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
        style={{ backgroundColor: '#03020A' }}
      >
        {/* ══════════════════════════════════════════════════════════════════
            1. SUBTLE CYBERNETIC DOT-MATRIX & COORDINATE GRID
            (Provides authentic digital architecture across the backdrop)
           ══════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-0"
          style={{
            maskImage: 'radial-gradient(ellipse 92% 95% at 50% 50%, black 20%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(ellipse 92% 95% at 50% 50%, black 20%, transparent 88%)',
          }}
        >
          <svg className="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
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
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="w-[200%] h-[320px] bg-gradient-to-b from-transparent via-cyan-400/[0.05] to-transparent animate-digital-sweep pointer-events-none"
              style={{ transformOrigin: 'center center' }}
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            2. LEFT FLANK — LIVING CYBER PURPLE & VIOLET PLASMA FIELDS
            (Starting seamlessly at "Trusted by leading brands" ~20% downwards)
           ══════════════════════════════════════════════════════════════════ */}

        {/* Upper-Left Cyber Violet Aurora (Starting right at "Trusted by leading brands") */}
        <div
          className="absolute top-[20%] -left-[14%] sm:-left-[10%] lg:-left-[8%] w-[580px] sm:w-[760px] lg:w-[900px] h-[560px] sm:h-[700px] rounded-full pointer-events-none animate-digital-plasma-purple-1 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 70% 65% at 20% 35%, rgba(109, 24, 255, 0.44) 0%, rgba(147, 51, 234, 0.28) 35%, rgba(0, 229, 255, 0.12) 60%, transparent 75%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Upper-Left Accent Cyan Glow Pulse (Digital Tech Spark) */}
        <div
          className="absolute top-[23%] -left-[8%] sm:-left-[4%] w-[400px] sm:w-[480px] h-[380px] sm:h-[460px] rounded-full pointer-events-none animate-digital-cyan-pulse z-[1]"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 30% 30%, rgba(0, 229, 255, 0.30) 0%, rgba(109, 24, 255, 0.12) 45%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />

        {/* Middle-Left Vivid Violet Plasma (OUR SERVICES — Tuned Tasteful Intensity) */}
        <div
          className="absolute top-[27%] -left-[15%] sm:-left-[11%] lg:-left-[8%] w-[560px] sm:w-[720px] lg:w-[860px] h-[560px] sm:h-[680px] rounded-full pointer-events-none animate-digital-plasma-purple-2 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 65% 65% at 20% 40%, rgba(109, 24, 255, 0.38) 0%, rgba(147, 51, 234, 0.22) 38%, rgba(224, 38, 150, 0.10) 65%, transparent 75%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Middle-Left Electric Violet/Purple (Selected Work / 3D Coverflow) */}
        <div
          className="absolute top-[39%] -left-[14%] sm:-left-[10%] lg:-left-[7%] w-[680px] sm:w-[900px] lg:w-[1060px] h-[800px] sm:h-[960px] rounded-full pointer-events-none animate-digital-plasma-purple-1 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 68% 68% at 22% 40%, rgba(160, 32, 255, 0.68) 0%, rgba(109, 24, 255, 0.46) 38%, rgba(0, 229, 255, 0.18) 62%, transparent 76%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Lower-Middle Left Deep Violet Plasma (Impact Section) */}
        <div
          className="absolute top-[57%] -left-[14%] sm:-left-[10%] lg:-left-[7%] w-[680px] sm:w-[900px] lg:w-[1060px] h-[800px] sm:h-[960px] rounded-full pointer-events-none animate-digital-plasma-purple-2 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 65% 65% at 22% 50%, rgba(160, 32, 255, 0.62) 0%, rgba(109, 24, 255, 0.40) 40%, rgba(224, 38, 150, 0.16) 65%, transparent 75%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Testimonials Zone Left Electric Purple Plasma */}
        <div
          className="absolute top-[71%] -left-[14%] sm:-left-[10%] lg:-left-[7%] w-[680px] sm:w-[900px] lg:w-[1060px] h-[780px] sm:h-[940px] rounded-full pointer-events-none animate-digital-plasma-purple-1 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 65% 65% at 20% 50%, rgba(160, 32, 255, 0.66) 0%, rgba(109, 24, 255, 0.44) 40%, rgba(0, 229, 255, 0.16) 65%, transparent 75%)',
            filter: 'blur(75px)',
          }}
        />

        {/* Lower-Left Deep Violet/Neon Purple Rising Bloom (CTA & Footer) */}
        <div
          className="absolute bottom-[0%] -left-[14%] sm:-left-[10%] lg:-left-[6%] w-[720px] sm:w-[960px] lg:w-[1140px] h-[840px] sm:h-[1040px] rounded-full pointer-events-none animate-digital-plasma-purple-2 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 65% 65% at 20% 75%, rgba(109, 24, 255, 0.76) 0%, rgba(160, 32, 255, 0.52) 38%, rgba(240, 0, 212, 0.22) 65%, transparent 75%)',
            filter: 'blur(70px)',
          }}
        />

        {/* ══════════════════════════════════════════════════════════════════
            3. RIGHT FLANK — LIVING SOLAR AMBER & SUNSET ORANGE PLASMA FIELDS
            (Hero & OUR SERVICES remain deep cosmic dark; orange begins at Selected Work ~38%)
           ══════════════════════════════════════════════════════════════════ */}

        {/* Upper-Right Warm Amber & Coral Plasma (Starting at Selected Work / 3D Coverflow) */}
        <div
          className="absolute top-[38%] -right-[14%] sm:-right-[10%] lg:-right-[7%] w-[680px] sm:w-[900px] lg:w-[1060px] h-[800px] sm:h-[960px] rounded-full pointer-events-none animate-digital-plasma-orange-1 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 70% 65% at 82% 40%, rgba(255, 122, 0, 0.68) 0%, rgba(255, 69, 0, 0.45) 36%, rgba(255, 39, 156, 0.22) 62%, transparent 75%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Lower-Middle Right Sunset Amber Glow (Impact Section) */}
        <div
          className="absolute top-[57%] -right-[14%] sm:-right-[10%] lg:-right-[7%] w-[680px] sm:w-[900px] lg:w-[1060px] h-[800px] sm:h-[960px] rounded-full pointer-events-none animate-digital-plasma-orange-2 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 70% 65% at 82% 50%, rgba(255, 122, 0, 0.62) 0%, rgba(255, 155, 0, 0.38) 38%, rgba(255, 39, 156, 0.18) 62%, transparent 75%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Testimonials Zone Right Warm Amber & Coral Plasma */}
        <div
          className="absolute top-[71%] -right-[14%] sm:-right-[10%] lg:-right-[7%] w-[680px] sm:w-[900px] lg:w-[1060px] h-[780px] sm:h-[940px] rounded-full pointer-events-none animate-digital-plasma-orange-1 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 70% 65% at 82% 50%, rgba(255, 122, 0, 0.65) 0%, rgba(255, 155, 0, 0.40) 38%, rgba(255, 39, 156, 0.20) 62%, transparent 75%)',
            filter: 'blur(75px)',
          }}
        />

        {/* Lower-Right Fiery Radiant Solar Amber-Red Nebula (CTA & Footer) */}
        <div
          className="absolute bottom-[0%] -right-[15%] sm:-right-[12%] lg:-right-[7%] w-[760px] sm:w-[1000px] lg:w-[1200px] h-[840px] sm:h-[1040px] rounded-full pointer-events-none animate-digital-plasma-orange-2 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 70% 65% at 82% 85%, rgba(255, 101, 0, 0.80) 0%, rgba(255, 39, 156, 0.46) 35%, rgba(109, 24, 255, 0.18) 62%, transparent 75%)',
            filter: 'blur(70px)',
          }}
        />

        {/* ── Dark Center Column Vignette (Guarantees Razor-Sharp Content Contrast) ── */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: 'radial-gradient(ellipse 55% 100% at 50% 50%, rgba(3, 2, 10, 0.94) 0%, rgba(3, 2, 10, 0.82) 48%, rgba(3, 2, 10, 0.35) 78%, transparent 100%)',
          }}
        />

        {/* ══════════════════════════════════════════════════════════════════
            5. PINPOINT DIGITAL DATA NODES & BREATHING HALO PINGS
           ══════════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          {DIGITAL_NODES.map((node, idx) => (
            <div
              key={idx}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: node.left,
                top: node.top,
              }}
            >
              {/* Core pinpoint node */}
              <span
                className={`block rounded-full ${node.size} ${node.color} ${node.anim}`}
              />
              {/* Optional expanding cyber halo ping for key flagship nodes */}
              {node.halo && (
                <span
                  className="absolute -inset-1.5 rounded-full border border-cyan-400/35 animate-digital-halo pointer-events-none"
                />
              )}
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            6. FOOTER NEON WAVE RIBBON (PRESERVED AT FOOTER BASE)
           ══════════════════════════════════════════════════════════════════ */}
        <div className="absolute bottom-[2%] sm:bottom-[3%] lg:bottom-[4%] left-0 right-0 w-full h-[180px] sm:h-[230px] lg:h-[260px] pointer-events-none z-[3] animate-neon-drift-lower">
          <svg
            className="w-full h-full block"
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
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-[4]"
          style={{
            background: 'linear-gradient(to top, #03020A 0%, transparent 100%)',
          }}
        />
      </div>
    </>
  );
}
