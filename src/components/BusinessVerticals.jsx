import React from 'react';
import { Sparkles, Heart, GraduationCap, ArrowRight, ChevronRight } from 'lucide-react';
import RealisticGlassSurface from './RealisticGlassSurface';

/**
 * AMPLIFY DIGITAL — SECOND SECTION: BUSINESS VERTICALS
 * 
 * Featuring:
 * - Clean, plain photography without baked-in text or graphics
 * - Real React / HTML semantic typography and accessible markup
 * - Real glassmorphic circular badges with glowing Lucide icons
 * - Interactive hover states, specular top sheens, and responsive scaling
 */

const verticals = [
  {
    id: 'digital',
    title: 'Amplify Digital',
    subtitle: 'For Brands',
    description: 'Creative campaigns, powerful branding and digital growth.',
    cta: 'Explore Brands',
    link: '#brands',
    photo: '/assets/card-photo-digital.jpg',
    borderColor: 'rgba(217, 70, 239, 0.40)',
    glowColor: 'rgba(217, 70, 239, 0.35)',
    accentColor: '#E879F9',
    badgeGlow: 'rgba(217, 70, 239, 0.30)',
    badgeBorder: 'rgba(217, 70, 239, 0.50)',
    icon: Sparkles,
  },
  {
    id: 'healthcare',
    title: 'Amplify Healthcare',
    subtitle: 'For Healthcare',
    description: 'Hospital marketing, patient growth and automation.',
    cta: 'Explore Healthcare',
    link: '#healthcare',
    photo: '/assets/card-photo-healthcare.jpg',
    borderColor: 'rgba(56, 189, 248, 0.40)',
    glowColor: 'rgba(14, 165, 233, 0.35)',
    accentColor: '#38BDF8',
    badgeGlow: 'rgba(56, 189, 248, 0.30)',
    badgeBorder: 'rgba(56, 189, 248, 0.50)',
    icon: Heart,
  },
  {
    id: 'academy',
    title: 'Amplify Academy',
    subtitle: 'For Learners',
    description: 'Digital marketing & AI education for the future.',
    cta: 'Explore Academy',
    link: '#academy',
    photo: '/assets/card-photo-academy.jpg',
    borderColor: 'rgba(250, 204, 21, 0.40)',
    glowColor: 'rgba(234, 179, 8, 0.35)',
    accentColor: '#FACC15',
    badgeGlow: 'rgba(250, 204, 21, 0.30)',
    badgeBorder: 'rgba(250, 204, 21, 0.50)',
    icon: GraduationCap,
  },
];

export default function BusinessVerticals() {
  return (
    <section
      id="verticals"
      className="relative w-full bg-transparent pt-4 pb-8 lg:pt-6 lg:pb-10 z-10"
    >

      {/* ── 3 Exact Business Vertical Glassmorphic Cards ────────────────── */}
      <div className="w-full max-w-[1120px] xl:max-w-[1340px] 2xl:max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 xl:gap-8 items-center">
          {verticals.map((v) => {
            const IconComponent = v.icon;
            return (
              <a
                key={v.id}
                href={v.link}
                className="group relative rounded-[20px] overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer block bg-gradient-to-br from-white/[0.10] via-white/[0.02] to-[#0c0824]/60 backdrop-blur-2xl backdrop-saturate-200 aspect-[304/182] w-full"
                style={{
                  borderColor: v.borderColor,
                  boxShadow: `0 12px 36px -6px ${v.glowColor}, inset 0 1.5px 1px 0 rgba(255,255,255,0.55), inset 1.5px 0 1px 0 rgba(255,255,255,0.25), inset 0 -1.5px 1px 0 rgba(0,0,0,0.45), inset 0 0 24px 0 rgba(255,255,255,0.03)`,
                }}
                aria-label={`${v.title} - ${v.subtitle}: ${v.description}`}
              >
                {/* ── Plain Photography Layer (Right-aligned subject) ── */}
                <img
                  src={v.photo}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />

                {/* ── Smooth Left-to-Right Translucent Gradient for Text Legibility ── */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, rgba(10, 6, 26, 0.82) 0%, rgba(10, 6, 26, 0.65) 45%, rgba(10, 6, 26, 0.15) 75%, transparent 100%)',
                  }}
                />

                {/* ── Real Content Layout (Clean Typography & Icons) ── */}
                <div className="relative z-10 w-full h-full p-3.5 sm:p-4.5 lg:p-5 flex flex-col justify-between">
                  {/* Top: Real Icon Badge & Headings */}
                  <div>
                    {/* Glassmorphic Icon Badge */}
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        borderColor: v.badgeBorder,
                        boxShadow: `0 0 16px 2px ${v.badgeGlow}`,
                      }}
                    >
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: v.accentColor }} />
                    </div>

                    {/* Headings */}
                    <div className="mt-1.5 sm:mt-2">
                      <h3 className="text-white font-bold text-sm sm:text-base lg:text-[18px] xl:text-[19px] tracking-tight leading-tight drop-shadow-sm font-sans">
                        {v.title}
                      </h3>
                      <p
                        className="text-[10px] sm:text-xs font-semibold tracking-wide mt-0.5"
                        style={{ color: v.accentColor }}
                      >
                        {v.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300/85 text-[10px] sm:text-[11px] lg:text-[12px] leading-snug line-clamp-2 max-w-[170px] sm:max-w-[190px] lg:max-w-[210px] mt-1 sm:mt-1.5">
                      {v.description}
                    </p>
                  </div>

                  {/* Bottom: Real CTA Link & Corner Action Arrow */}
                  <div className="flex items-center justify-between pt-1">
                    <span
                      className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs font-semibold tracking-wide transition-colors group-hover:brightness-125"
                      style={{ color: v.accentColor }}
                    >
                      <span>{v.cta}</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>

                    {/* Circular Corner Pill Button */}
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/45 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/75 group-hover:text-white group-hover:border-white/40 group-hover:scale-110 transition-all shadow-md">
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>
                </div>

                {/* ── Realistic Optical Glass Surface (Topmost Z-Index Layer) ── */}
                <RealisticGlassSurface accentGlow={v.glowColor} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
