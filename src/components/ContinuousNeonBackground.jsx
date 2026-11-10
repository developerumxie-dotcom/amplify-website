import React from 'react';

/**
 * AMPLIFY DIGITAL — MASTER CONTINUOUS COLORFUL NEON BACKGROUND
 * 
 * True Single-Page Continuous Canvas (Zero Cut Lines Across the Entire Website):
 * - Hero & Business Verticals: Pure, deep cosmic dark #03020A
 * - Left Flank: Rich electric purple & vivid violet auroras begin right at "Trusted by leading brands"
 *   and flow seamlessly all the way down through the Footer.
 * - Right Flank: Luminous warm sunset orange & golden amber auroras begin precisely at Card 05
 *   ("Digital Experiences & Events" at the bottom of What We Do) and flow all the way down through the Footer.
 * - Central Vignette: Protects typography and interactive cards for maximum legibility.
 * - Pinpoint glowing star particles with gentle keyframe twinkle matching Hero.
 * - Preserved Footer neon wave ribbon at the base.
 */

// Strategic star dot coordinates & styles matching HeroSection
const STAR_DOTS = [
  // Upper Atmosphere (Trusted by Leading Brands)
  { left: '12%', top: '25.5%', size: 'w-[2px] h-[2px]', color: 'bg-white shadow-[0_0_6px_#ffffff]', anim: 'animate-star-1' },
  { left: '24%', top: '27.2%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-cyan-200 shadow-[0_0_7px_#00e5ff]', anim: 'animate-star-2' },
  { left: '88%', top: '26.8%', size: 'w-[2px] h-[2px]', color: 'bg-amber-200 shadow-[0_0_6px_#ffb800]', anim: 'animate-star-3' },
  { left: '79%', top: '29.4%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-purple-200 shadow-[0_0_7px_#c084fc]', anim: 'animate-star-1' },
  { left: '6%', top: '30.0%', size: 'w-[1.5px] h-[1.5px]', color: 'bg-sky-200 shadow-[0_0_5px_#38bdf8]', anim: 'animate-star-2' },
  { left: '94%', top: '31.5%', size: 'w-[2px] h-[2px]', color: 'bg-white shadow-[0_0_6px_#ffffff]', anim: 'animate-star-3' },

  // Middle-Upper Atmosphere (What We Do / Bento Grid)
  { left: '15%', top: '34.0%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-purple-300 shadow-[0_0_8px_#c084fc]', anim: 'animate-star-1' },
  { left: '8%', top: '38.4%', size: 'w-[2px] h-[2px]', color: 'bg-cyan-200 shadow-[0_0_6px_#00e5ff]', anim: 'animate-star-3' },
  { left: '85%', top: '36.2%', size: 'w-[3px] h-[3px]', color: 'bg-amber-300 shadow-[0_0_9px_#ff9900]', anim: 'animate-star-2' },
  { left: '92%', top: '39.0%', size: 'w-[1.5px] h-[1.5px]', color: 'bg-white shadow-[0_0_5px_#ffffff]', anim: 'animate-star-1' },

  // Middle Atmosphere (Selected Work)
  { left: '10%', top: '44.5%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-white shadow-[0_0_7px_#ffffff]', anim: 'animate-star-1' },
  { left: '22%', top: '48.0%', size: 'w-[2px] h-[2px]', color: 'bg-purple-200 shadow-[0_0_6px_#c084fc]', anim: 'animate-star-2' },
  { left: '89%', top: '46.8%', size: 'w-[2px] h-[2px]', color: 'bg-amber-200 shadow-[0_0_6px_#ff9500]', anim: 'animate-star-3' },
  { left: '76%', top: '51.4%', size: 'w-[3px] h-[3px]', color: 'bg-rose-200 shadow-[0_0_8px_#fb7185]', anim: 'animate-star-1' },
  { left: '7%', top: '55.0%', size: 'w-[1.5px] h-[1.5px]', color: 'bg-sky-200 shadow-[0_0_5px_#38bdf8]', anim: 'animate-star-2' },
  { left: '93%', top: '57.5%', size: 'w-[2px] h-[2px]', color: 'bg-white shadow-[0_0_6px_#ffffff]', anim: 'animate-star-3' },

  // Impact Section
  { left: '14%', top: '63.2%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-purple-300 shadow-[0_0_8px_#c084fc]', anim: 'animate-star-2' },
  { left: '84%', top: '65.8%', size: 'w-[2px] h-[2px]', color: 'bg-amber-200 shadow-[0_0_6px_#ffaa00]', anim: 'animate-star-1' },

  // Lower Atmosphere (Testimonials, CTA & Footer)
  { left: '9%', top: '75.0%', size: 'w-[2px] h-[2px]', color: 'bg-cyan-200 shadow-[0_0_6px_#00e5ff]', anim: 'animate-star-3' },
  { left: '88%', top: '76.4%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-orange-200 shadow-[0_0_8px_#ff7a00]', anim: 'animate-star-2' },
  { left: '20%', top: '84.5%', size: 'w-[2px] h-[2px]', color: 'bg-white shadow-[0_0_6px_#ffffff]', anim: 'animate-star-1' },
  { left: '78%', top: '86.2%', size: 'w-[2.5px] h-[2.5px]', color: 'bg-pink-200 shadow-[0_0_7px_#ec4899]', anim: 'animate-star-3' },
  { left: '11%', top: '92.0%', size: 'w-[2px] h-[2px]', color: 'bg-purple-200 shadow-[0_0_6px_#c084fc]', anim: 'animate-star-1' },
  { left: '86%', top: '95.5%', size: 'w-[2px] h-[2px]', color: 'bg-amber-300 shadow-[0_0_7px_#ff9500]', anim: 'animate-star-2' },
];

export default function ContinuousNeonBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
      style={{
        backgroundColor: '#03020A',
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════
          1. LEFT FLANK — VIBRANT ELECTRIC PURPLE & VIOLET AURORAS
          (Starting seamlessly at "Trusted by leading brands" ~24% downwards)
         ══════════════════════════════════════════════════════════════════ */}

      {/* Upper-Left Violet Nebula (Starting at "Trusted by leading brands" — Softened) */}
      <div
        className="absolute top-[23%] -left-[14%] sm:-left-[10%] lg:-left-[8%] w-[540px] sm:w-[720px] lg:w-[860px] h-[520px] sm:h-[660px] rounded-full pointer-events-none animate-neon-float-purple z-[1]"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 20% 35%, rgba(109, 24, 255, 0.38) 0%, rgba(160, 32, 255, 0.22) 35%, rgba(240, 0, 212, 0.08) 60%, transparent 75%)',
          filter: 'blur(85px)',
        }}
      />

      {/* Middle-Left Vivid Violet & Purple Bloom (OUR SERVICES — Reduced Intensity) */}
      <div
        className="absolute top-[28%] -left-[15%] sm:-left-[12%] lg:-left-[9%] w-[520px] sm:w-[680px] lg:w-[800px] h-[520px] sm:h-[640px] rounded-full pointer-events-none animate-neon-float-purple z-[1]"
        style={{
          background: 'radial-gradient(ellipse 65% 65% at 20% 40%, rgba(109, 24, 255, 0.34) 0%, rgba(147, 51, 234, 0.20) 38%, rgba(240, 0, 212, 0.07) 65%, transparent 75%)',
          filter: 'blur(85px)',
        }}
      />

      {/* Middle-Left Electric Purple Glow (Selected Work — Starting right at top of Work) */}
      <div
        className="absolute top-[41%] -left-[14%] sm:-left-[10%] lg:-left-[8%] w-[640px] sm:w-[860px] lg:w-[1020px] h-[760px] sm:h-[920px] rounded-full pointer-events-none animate-neon-float-purple z-[1]"
        style={{
          background: 'radial-gradient(ellipse 65% 65% at 22% 40%, rgba(160, 32, 255, 0.62) 0%, rgba(109, 24, 255, 0.42) 40%, rgba(240, 0, 212, 0.16) 65%, transparent 75%)',
          filter: 'blur(85px)',
        }}
      />

      {/* Lower-Middle Left Violet Nebula (Impact Section) */}
      <div
        className="absolute top-[58%] -left-[14%] sm:-left-[10%] lg:-left-[8%] w-[640px] sm:w-[860px] lg:w-[1020px] h-[760px] sm:h-[920px] rounded-full pointer-events-none animate-neon-float-purple z-[1]"
        style={{
          background: 'radial-gradient(ellipse 65% 65% at 22% 50%, rgba(160, 32, 255, 0.58) 0%, rgba(109, 24, 255, 0.38) 40%, rgba(240, 0, 212, 0.15) 65%, transparent 75%)',
          filter: 'blur(85px)',
        }}
      />

      {/* Testimonials Zone Left Electric Purple Nebula */}
      <div
        className="absolute top-[72%] -left-[14%] sm:-left-[10%] lg:-left-[8%] w-[640px] sm:w-[860px] lg:w-[1020px] h-[740px] sm:h-[900px] rounded-full pointer-events-none animate-neon-float-purple z-[1]"
        style={{
          background: 'radial-gradient(ellipse 65% 65% at 20% 50%, rgba(160, 32, 255, 0.62) 0%, rgba(109, 24, 255, 0.40) 40%, rgba(240, 0, 212, 0.16) 65%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Lower-Left Deep Violet/Neon Purple Rising Bloom (CTA & Footer) */}
      <div
        className="absolute bottom-[1%] -left-[14%] sm:-left-[10%] lg:-left-[7%] w-[680px] sm:w-[900px] lg:w-[1080px] h-[800px] sm:h-[980px] rounded-full pointer-events-none animate-neon-float-purple z-[1]"
        style={{
          background: 'radial-gradient(ellipse 65% 65% at 20% 75%, rgba(109, 24, 255, 0.72) 0%, rgba(160, 32, 255, 0.48) 38%, rgba(240, 0, 212, 0.20) 65%, transparent 75%)',
          filter: 'blur(75px)',
        }}
      />


      {/* ══════════════════════════════════════════════════════════════════
          2. RIGHT FLANK — VIBRANT WARM SUNSET ORANGE & AMBER AURORAS
          (Hero & OUR SERVICES remain deep dark on the right; orange begins at Selected Work ~42%)
         ══════════════════════════════════════════════════════════════════ */}

      {/* Upper-Right Warm Amber & Coral Flare (Selected Work — Starting right at top of Work) */}
      <div
        className="absolute top-[42%] -right-[14%] sm:-right-[10%] lg:-right-[8%] w-[640px] sm:w-[860px] lg:w-[1020px] h-[760px] sm:h-[920px] rounded-full pointer-events-none animate-neon-breathe-orange z-[1]"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 82% 40%, rgba(255, 122, 0, 0.60) 0%, rgba(255, 69, 0, 0.38) 38%, rgba(255, 39, 156, 0.18) 62%, transparent 75%)',
          filter: 'blur(85px)',
        }}
      />

      {/* Lower-Middle Right Sunset Glow (Impact Section) */}
      <div
        className="absolute top-[58%] -right-[14%] sm:-right-[10%] lg:-right-[8%] w-[640px] sm:w-[860px] lg:w-[1020px] h-[760px] sm:h-[920px] rounded-full pointer-events-none animate-neon-breathe-orange z-[1]"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 82% 50%, rgba(255, 122, 0, 0.58) 0%, rgba(255, 69, 0, 0.36) 38%, rgba(255, 39, 156, 0.16) 62%, transparent 75%)',
          filter: 'blur(85px)',
        }}
      />

      {/* Testimonials Zone Right Warm Amber & Coral Flare */}
      <div
        className="absolute top-[72%] -right-[14%] sm:-right-[10%] lg:-right-[8%] w-[640px] sm:w-[860px] lg:w-[1020px] h-[740px] sm:h-[900px] rounded-full pointer-events-none animate-neon-breathe-orange z-[1]"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 82% 50%, rgba(255, 122, 0, 0.60) 0%, rgba(255, 155, 0, 0.36) 38%, rgba(255, 39, 156, 0.18) 62%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Lower-Right Fiery Radiant Orange-Red Nebula (CTA & Footer) */}
      <div
        className="absolute bottom-[0%] -right-[15%] sm:-right-[12%] lg:-right-[8%] w-[720px] sm:w-[960px] lg:w-[1160px] h-[800px] sm:h-[980px] rounded-full pointer-events-none animate-neon-breathe-orange z-[1]"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 82% 85%, rgba(255, 101, 0, 0.75) 0%, rgba(255, 39, 156, 0.42) 35%, rgba(109, 24, 255, 0.16) 62%, transparent 75%)',
          filter: 'blur(75px)',
        }}
      />


      {/* ── Dark Center Column Vignette (Pure Contrast for Content) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: 'radial-gradient(ellipse 55% 100% at 50% 50%, rgba(3, 2, 10, 0.94) 0%, rgba(3, 2, 10, 0.82) 45%, rgba(3, 2, 10, 0.35) 75%, transparent 100%)',
        }}
      />


      {/* ══════════════════════════════════════════════════════════════════
          3. PINPOINT GLOWING STAR PARTICLES (LIKE HERO SECTION)
         ══════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {STAR_DOTS.map((star, idx) => (
          <span
            key={idx}
            className={`absolute rounded-full ${star.size} ${star.color} ${star.anim}`}
            style={{
              left: star.left,
              top: star.top,
            }}
          />
        ))}
      </div>


      {/* ══════════════════════════════════════════════════════════════════
          4. FOOTER NEON WAVE RIBBON (PRESERVED AT FOOTER BASE)
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
  );
}
