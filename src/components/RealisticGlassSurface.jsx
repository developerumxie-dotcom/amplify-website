import React from 'react';

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
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-30" />

      {/* ── 2. Left Edge Specular Refraction Line ── */}
      <div className="absolute top-0 bottom-0 left-0 w-[1.2px] bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none z-30" />

      {/* ── 3. Diagonal Studio Ambient Light Glare ── */}
      <div 
        className="absolute inset-0 pointer-events-none z-25 rounded-[inherit]"
        style={{
          background: 'linear-gradient(130deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 28%, transparent 55%, rgba(255, 255, 255, 0.03) 80%, transparent 100%)',
        }}
      />

      {/* ── 4. Subtle Micro-Frosted Silica Grain ── */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 rounded-[inherit] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── 5. Optional Accent Glow Halo on Glass Rim ── */}
      {accentGlow && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-20 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `inset 0 0 20px ${accentGlow}` }}
        />
      )}
    </>
  );
}
