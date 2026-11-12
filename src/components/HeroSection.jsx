import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import HeroBirdVisual from './HeroBirdVisual';

/**
 * AMPLIFY DIGITAL — HERO SECTION
 *
 * Sized and tuned with comfortable breathing room, scaled headline,
 * generous action buttons, and pixel-accurate reference lighting trails.
 */

export default function HeroSection() {
  const [ringVisible, setRingVisible] = useState(false);

  useEffect(() => {
    // Fade in decorative orbit ring smoothly after bird completes assembly
    const timer = setTimeout(() => {
      setRingVisible(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] xl:min-h-[680px] 2xl:min-h-[740px] bg-transparent flex flex-col justify-center pt-20 sm:pt-24 lg:pt-20 xl:pt-24 pb-6 lg:pb-8">

      {/* ── Background Atmospheric Volumetric Nebulae ─────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep indigo/violet glow around bird */}
        <div className="absolute top-[8%] right-[8%] w-[580px] h-[420px] rounded-full bg-[#1a0a38]/45 blur-[110px]" />

        {/* Violet upper-right illumination */}
        <div className="absolute -top-[10%] right-[0%] w-[420px] h-[360px] rounded-full bg-[#3B0764]/30 blur-[110px]" />

        {/* Warm golden-orange lower-right illumination */}
        <div className="absolute -bottom-[10%] right-[0%] w-[460px] h-[340px] rounded-full bg-[#FF6A00]/20 blur-[105px]" />

        {/* Hot magenta bottom-center floor illumination */}
        <div className="absolute -bottom-[8%] left-[40%] w-[480px] h-[260px] rounded-full bg-[#E11D48]/16 blur-[95px]" />

        {/* Dark navy subtle haze behind headline for clean contrast */}
        <div className="absolute top-[18%] left-[4%] w-[440px] h-[320px] rounded-full bg-[#0F172A]/30 blur-[120px]" />
      </div>

      {/* ── Sparse Pinpoint Star Particles ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <span
          className="absolute w-[2px] h-[2px] rounded-full bg-white opacity-70 shadow-[0_0_5px_#ffffff]"
          style={{ left: '50.3%', top: '26.4%' }}
        />
        <span
          className="absolute w-[2px] h-[2px] rounded-full bg-cyan-200 opacity-80 shadow-[0_0_6px_#00e5ff]"
          style={{ left: '52.0%', top: '54.6%' }}
        />
        <span
          className="absolute w-[2px] h-[2px] rounded-full bg-white opacity-60 shadow-[0_0_5px_#ffffff]"
          style={{ left: '71.1%', top: '20.2%' }}
        />
        <span
          className="absolute w-[2.5px] h-[2.5px] rounded-full bg-purple-200 opacity-75 shadow-[0_0_6px_#c084fc]"
          style={{ left: '78.7%', top: '34.1%' }}
        />
        <span
          className="absolute w-[1.5px] h-[1.5px] rounded-full bg-sky-200 opacity-60 shadow-[0_0_4px_#38bdf8]"
          style={{ left: '87.4%', top: '50.6%' }}
        />
        <span
          className="absolute w-[2px] h-[2px] rounded-full bg-white opacity-65 shadow-[0_0_5px_#ffffff]"
          style={{ left: '95.5%', top: '27.3%' }}
        />
      </div>

      {/* ── SVG Decorative Lighting Trails & Horizon Waves ────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1024 454"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.80" />
            <stop offset="70%" stopColor="#A855F7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="bottomWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
            <stop offset="15%" stopColor="#9333EA" stopOpacity="0.85" />
            <stop offset="42%" stopColor="#EC4899" stopOpacity="0.92" />
            <stop offset="72%" stopColor="#FF7A00" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFA000" stopOpacity="0.85" />
          </linearGradient>

          <filter id="orbitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="waveGlow" x="-10%" y="-40%" width="120%" height="180%">
            <feGaussianBlur stdDeviation="3.0" result="blur1" />
            <feGaussianBlur stdDeviation="6.0" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cyanGlint" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Elliptical Orbit Trail Around the Bird (fades in after bird ready) */}
        <g className={`transition-opacity duration-1000 ${ringVisible ? 'opacity-100' : 'opacity-0'}`}>
          <ellipse
            cx="726"
            cy="260"
            rx="246"
            ry="62"
            transform="rotate(-23.5 726 260)"
            fill="none"
            stroke="url(#orbitGrad)"
            strokeWidth="1.5"
            filter="url(#orbitGlow)"
          />

          {/* Bright Cyan Glint at lower-left orbit sweep (608, 350) */}
          <circle cx="608" cy="350" r="3.2" fill="#00E5FF" filter="url(#cyanGlint)" />
          <circle cx="608" cy="350" r="1.4" fill="#FFFFFF" />
        </g>

        {/* 2. Sweeping Bottom Horizon Wave */}
        <path
          d="M 380,454 C 520,430 650,402 760,392 C 840,384 940,368 1024,386"
          fill="none"
          stroke="url(#bottomWaveGrad)"
          strokeWidth="2.2"
          filter="url(#waveGlow)"
        />
      </svg>

      {/* ── Main Hero Content Grid ────────────────────────────────────── */}
      <div className="w-full max-w-[1120px] xl:max-w-[1340px] 2xl:max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-center">

          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left pt-1 lg:pt-0">

            {/* Tag Badge: Creative • Strategy • Growth */}
            <div className="glass-pill relative overflow-hidden inline-flex items-center px-4 py-1.5 rounded-full mb-3 sm:mb-4">
              <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
              <span className="text-xs sm:text-[13px] font-semibold text-slate-200 tracking-wide relative z-10">
                Creative • Strategy • Growth
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[46px] xl:text-[56px] 2xl:text-[66px] font-extrabold text-white tracking-[-0.03em] leading-[1.08] font-sans mb-3 sm:mb-4">
              We Turn Ideas <br />
              Into <span className="text-gradient-impact">Impact.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-[14.5px] sm:text-[15.5px] lg:text-[15.5px] xl:text-[16.5px] text-slate-300/90 font-normal leading-relaxed max-w-[420px] mb-6 sm:mb-7">
              A 360° creative, digital and growth studio<br className="hidden sm:inline" /> for ambitious brands and businesses.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8">
              {/* Primary CTA: Explore Our Work */}
              <a
                href="#work"
                className="glass-btn-luminous inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white group cursor-pointer"
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className="absolute top-0 left-0 right-0 h-[1.2px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-20" />
                
                {/* Diagonal Ambient Studio Glare */}
                <span className="absolute inset-0 bg-gradient-to-br from-white/[0.25] via-transparent to-white/[0.05] pointer-events-none z-10" />

                <span className="relative z-20">Explore Our Work</span>
                <ArrowRight className="relative z-20 w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              {/* Secondary CTA: Book a Strategy Call with circle icon */}
              <a
                href="#contact"
                className="glass-btn-clear inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-medium text-slate-200 hover:text-white group cursor-pointer"
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className="absolute top-0 left-0 right-0 h-[1.2px] bg-gradient-to-r from-transparent via-white/85 to-transparent pointer-events-none z-20" />
                
                {/* Diagonal Ambient Studio Glare */}
                <span className="absolute inset-0 bg-gradient-to-br from-white/[0.22] via-transparent to-white/[0.04] pointer-events-none z-10" />

                <span className="relative z-20">Book a Strategy Call</span>
                <span className="relative z-20 w-2.5 h-2.5 rounded-full border border-slate-300 group-hover:border-white transition-colors" />
              </a>
            </div>

            {/* Mouse Scroll Indicator */}
            <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium select-none">
              <div className="w-3.5 h-5 rounded-full border border-slate-400/70 flex items-start justify-center p-0.5">
                <span className="w-1 h-1.5 rounded-full bg-slate-300 animate-bounce" />
              </div>
              <span className="tracking-wide text-[11.5px] sm:text-xs">Scroll to explore</span>
            </div>
          </div>

          {/* Right Column: 3D Origami Bird Sculpture */}
          <div className="lg:col-span-6 relative flex items-center justify-center -mt-2 lg:-mt-2">
            <HeroBirdVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
