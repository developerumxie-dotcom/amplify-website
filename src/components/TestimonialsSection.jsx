import React from 'react';
import { Quote, Star, CheckCircle2 } from 'lucide-react';
import { testimonials } from '../data/websiteContent';

const testimonialConfig = [
  {
    id: 'salekart',
    accentColor: '#FF7A00',
    borderColor: 'rgba(255, 122, 0, 0.45)',
    glowColor: 'rgba(255, 122, 0, 0.35)',
    badgeBg: 'rgba(255, 122, 0, 0.15)',
    gradient: 'from-[#FF7A00] to-[#E11D48]',
  },
  {
    id: 'revolt',
    accentColor: '#A855F7',
    borderColor: 'rgba(168, 85, 247, 0.45)',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    gradient: 'from-[#A855F7] to-[#EC4899]',
  },
  {
    id: 'uspa',
    accentColor: '#E02696',
    borderColor: 'rgba(224, 38, 150, 0.45)',
    glowColor: 'rgba(224, 38, 150, 0.35)',
    badgeBg: 'rgba(224, 38, 150, 0.15)',
    gradient: 'from-[#E02696] to-[#FF7A00]',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="insights" className="relative py-16 sm:py-24 lg:py-28 bg-transparent z-10">

      <div className="w-full max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-8 xl:px-12 relative z-10">

        {/* ── Section Header Row (Harmonized Left Alignment) ────────── */}
        <div className="flex flex-col items-start text-left max-w-2xl mb-12 sm:mb-16">
          {/* Section Tag Pill matching exact site model */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2E0B5B]/60 border border-[#A855F7]/45 shadow-[0_0_18px_rgba(168,85,247,0.3)] backdrop-blur-md mb-6">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-purple-200 uppercase font-mono">
              CLIENT TESTIMONIALS
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight font-display mb-4 leading-[1.08]">
            What Leading Brands{' '}
            <span className="bg-gradient-to-r from-[#FF7A00] via-[#FF5500] to-[#E02696] bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-[17px] text-slate-300/85 font-normal leading-relaxed max-w-xl">
            Real feedback from marketing leaders and executives who scaled their businesses with Amplify.
          </p>
        </div>

        {/* ── 3 Authentic Testimonials Grid with Glassmorphism ──────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 xl:gap-8 items-stretch">
          {testimonials.map((t, idx) => {
            const config = testimonialConfig[idx] || testimonialConfig[0];

            return (
              <div
                key={t.id}
                className="group relative rounded-[24px] sm:rounded-[28px] bg-[#0A071E]/90 backdrop-blur-xl border flex flex-col justify-between p-7 sm:p-8 xl:p-9 transition-all duration-300 hover:-translate-y-2 shadow-xl overflow-hidden"
                style={{
                  borderColor: config.borderColor,
                  boxShadow: `0 10px 32px -8px ${config.glowColor}`,
                }}
              >
                {/* Specular Top Border Sheen */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

                {/* Hover Inner Glow Rim */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[24px] sm:rounded-[28px] z-10"
                  style={{ boxShadow: `inset 0 0 28px ${config.glowColor}` }}
                />

                {/* Card Top: Glowing Quote Badge & 5 Stars */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center justify-between">
                    {/* Glassmorphic Quote Badge */}
                    <div
                      className="w-11 h-11 rounded-[14px] flex items-center justify-center backdrop-blur-md border shadow-md transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: config.badgeBg,
                        borderColor: config.borderColor,
                        boxShadow: `0 0 16px -2px ${config.glowColor}`,
                      }}
                    >
                      <Quote className="w-5 h-5" style={{ color: config.accentColor }} />
                    </div>

                    {/* 5 Stars Rating Pill */}
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Body: Highlight Tag & Authentic Quote */}
                <div className="relative z-10 flex-1 flex flex-col justify-start">
                  {/* Scope / Highlight Pill */}
                  <div className="mb-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold border backdrop-blur-md"
                      style={{
                        color: config.accentColor,
                        borderColor: `${config.accentColor}35`,
                        backgroundColor: `${config.accentColor}12`
                      }}
                    >
                      {t.highlight}
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p className="text-base sm:text-[17px] text-slate-200/95 font-normal leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* Card Footer: Verified Author Attribution */}
                <div
                  className="relative z-10 pt-5 mt-auto border-t flex items-center gap-3.5"
                  style={{ borderColor: `${config.accentColor}25` }}
                >
                  {/* Initials Avatar */}
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0 border border-white/20`}
                  >
                    {t.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                        {t.author}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: config.accentColor }}>
                      {t.role}
                    </div>
                    <div className="text-xs text-slate-400 font-medium truncate">
                      {t.company}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
