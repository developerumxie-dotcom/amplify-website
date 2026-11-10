import React from 'react';

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
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* ── Starting Corner: Top-Left Electric Violet Nebula ──────────────── */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[480px] sm:w-[620px] lg:w-[760px] h-[440px] sm:h-[560px] rounded-full pointer-events-none animate-neon-float-purple"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 15% 15%, rgba(109, 24, 255, 0.68) 0%, rgba(160, 32, 255, 0.44) 35%, rgba(240, 0, 212, 0.18) 60%, transparent 75%)',
          filter: 'blur(75px)',
        }}
      />

      {/* ── End Corner: Bottom-Right Fiery Sunset Orange Bloom ────────────── */}
      <div 
        className="absolute -bottom-[15%] -right-[10%] w-[500px] sm:w-[650px] lg:w-[800px] h-[460px] sm:h-[580px] rounded-full pointer-events-none animate-neon-breathe-orange"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 85% 85%, rgba(255, 101, 0, 0.70) 0%, rgba(255, 155, 0, 0.42) 35%, rgba(255, 39, 156, 0.22) 60%, transparent 75%)',
          filter: 'blur(75px)',
        }}
      />

      {/* ── Pinpoint Glowing Star Dots (Like Hero Section) ───────────────── */}
      {showStars && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Top-Left Star Cluster */}
          <span
            className="absolute w-[2px] h-[2px] rounded-full bg-white opacity-80 shadow-[0_0_6px_#ffffff] animate-star-1"
            style={{ left: '8%', top: '16%' }}
          />
          <span
            className="absolute w-[2.5px] h-[2.5px] rounded-full bg-cyan-200 opacity-85 shadow-[0_0_7px_#00e5ff] animate-star-2"
            style={{ left: '16%', top: '32%' }}
          />

          {/* Bottom-Right Star Cluster */}
          <span
            className="absolute w-[2px] h-[2px] rounded-full bg-amber-200 opacity-80 shadow-[0_0_6px_#ffb800] animate-star-3"
            style={{ left: '88%', top: '68%' }}
          />
          <span
            className="absolute w-[2.5px] h-[2.5px] rounded-full bg-purple-200 opacity-85 shadow-[0_0_7px_#c084fc] animate-star-1"
            style={{ left: '94%', top: '84%' }}
          />
        </div>
      )}
    </div>
  );
}
