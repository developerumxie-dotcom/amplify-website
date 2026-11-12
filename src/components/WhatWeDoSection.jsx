import React, { useState } from 'react';
import { ArrowRight, ChevronRight, X, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../data/websiteContent';
import RealisticGlassSurface from './RealisticGlassSurface';

/**
 * AMPLIFY DIGITAL — WHAT WE DO SECTION
 *
 * Pixel-accurate recreation of the approved asymmetric two-row Bento reference:
 * - Left Column:
 *   • Small purple pill: "OUR SERVICES"
 *   • Large heading: "What We Do" ("What We" in white, "Do" in radiant orange gradient)
 *   • Rich multi-tiered supporting description & capability highlights
 *   • Bottom-aligned radiant gradient "Explore More" button (in place of 01-05 slider)
 * - Right Column (Asymmetric 2-Row Bento Grid):
 *   • Top Row (2 wider cards):
 *     01 — Strategy & Brand (purple chess image)
 *     02 — Content & Production (orange camera image)
 *   • Bottom Row (3 cards):
 *     03 — Social & Influence (pink social media image)
 *     04 — Performance & Growth (orange growth chart image)
 *     05 — Digital Experiences & Events (purple VR headset image)
 * - Section 2 Architecture Applied to Every Card:
 *   • Clean, plain 3D artwork layer on the right (zero baked-in text)
 *   • Left-to-right dark gradient scrim for 100% crystal-clear typography legibility
 *   • Real semantic HTML typography (`<h3>`, `<p>`, number badge pill)
 *   • Specular top border sheen (`bg-gradient-to-r from-transparent via-white/40 to-transparent`)
 *   • Circular corner pill button with `ChevronRight`
 *   • Interactive deep-dive capability breakdown modal
 */

const bentoCards = [
  {
    id: '01',
    dataId: '01',
    title: 'Strategy & Brand',
    description: 'Build a powerful brand with purpose.',
    image: '/assets/bento-art-chess-hd.jpg',
    fallbackImage: '/assets/plain-art-chess.png',
    borderColor: 'rgba(168, 85, 247, 0.45)',
    glow: 'rgba(168, 85, 247, 0.35)',
    accentColor: '#A855F7',
    badgeBorder: 'rgba(168, 85, 247, 0.55)',
    badgeBg: 'rgba(168, 85, 247, 0.16)',
  },
  {
    id: '02',
    dataId: '02',
    title: 'Content & Production',
    description: 'Create unforgettable content.',
    image: '/assets/bento-art-camera-hd.jpg',
    fallbackImage: '/assets/plain-art-camera.png',
    borderColor: 'rgba(249, 115, 22, 0.45)',
    glow: 'rgba(249, 115, 22, 0.35)',
    accentColor: '#F97316',
    badgeBorder: 'rgba(249, 115, 22, 0.55)',
    badgeBg: 'rgba(249, 115, 22, 0.16)',
  },
  {
    id: '03',
    dataId: '03',
    title: 'Social & Influence',
    description: 'Grow your presence across platforms.',
    image: '/assets/bento-art-social-hd.jpg',
    fallbackImage: '/assets/plain-art-social.png',
    borderColor: 'rgba(236, 72, 153, 0.45)',
    glow: 'rgba(236, 72, 153, 0.35)',
    accentColor: '#EC4899',
    badgeBorder: 'rgba(236, 72, 153, 0.55)',
    badgeBg: 'rgba(236, 72, 153, 0.16)',
  },
  {
    id: '04',
    dataId: '04',
    title: 'Performance & Growth',
    description: 'Turn clicks into measurable growth.',
    image: '/assets/bento-art-chart-hd.jpg',
    fallbackImage: '/assets/plain-art-chart.png',
    borderColor: 'rgba(234, 179, 8, 0.45)',
    glow: 'rgba(234, 179, 8, 0.35)',
    accentColor: '#EAB308',
    badgeBorder: 'rgba(234, 179, 8, 0.55)',
    badgeBg: 'rgba(234, 179, 8, 0.16)',
  },
  {
    id: '05',
    dataId: '05',
    title: 'Digital Experiences & Events',
    description: 'Build immersive digital experiences.',
    image: '/assets/bento-art-vr-hd.jpg',
    fallbackImage: '/assets/plain-art-vr.png',
    borderColor: 'rgba(147, 51, 234, 0.45)',
    glow: 'rgba(147, 51, 234, 0.35)',
    accentColor: '#9333EA',
    badgeBorder: 'rgba(147, 51, 234, 0.55)',
    badgeBg: 'rgba(147, 51, 234, 0.16)',
  },
];

export default function WhatWeDoSection() {
  const [selectedService, setSelectedService] = useState(null);

  const handleCardClick = (card) => {
    const fullData = servicesData.find((s) => s.id === card.dataId);
    if (fullData) {
      setSelectedService(fullData);
    }
  };

  const renderCard = (card, isTopRow = false) => {
    return (
      <div
        key={card.id}
        onClick={() => handleCardClick(card)}
        className={`group relative rounded-[22px] sm:rounded-[26px] overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer bg-gradient-to-br from-white/[0.10] via-white/[0.02] to-[#0c0824]/60 backdrop-blur-2xl backdrop-saturate-200 w-full flex flex-col justify-between ${isTopRow
          ? 'min-h-[230px] sm:min-h-[250px] lg:min-h-[260px] xl:min-h-[280px] 2xl:min-h-[300px]'
          : 'min-h-[215px] sm:min-h-[235px] lg:min-h-[245px] xl:min-h-[265px] 2xl:min-h-[285px]'
          }`}
        style={{
          borderColor: card.borderColor,
          boxShadow: `0 12px 36px -6px ${card.glow}, inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1.5px 1px 0 rgba(0, 0, 0, 0.45), inset 0 0 24px 0 rgba(255, 255, 255, 0.03)`,
        }}
        role="button"
        tabIndex={0}
        aria-label={`Card ${card.id} - ${card.title}: ${card.description}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(card);
          }
        }}
      >
        {/* ── Plain 3D Artwork Layer (Right-aligned subject) ── */}
        <img
          src={card.image}
          alt=""
          onError={(e) => {
            // Fallback gracefully to plain-art crop if HD is not yet loaded
            if (card.fallbackImage && e.currentTarget.src !== card.fallbackImage) {
              e.currentTarget.src = card.fallbackImage;
            }
          }}
          className="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* ── Smooth Left-to-Right Translucent Gradient Scrim ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(10, 6, 26, 0.82) 0%, rgba(10, 6, 26, 0.65) 42%, rgba(10, 6, 26, 0.12) 70%, transparent 100%)',
          }}
        />

        {/* ── Real Semantic HTML Content (Matching Section 2 Structure) ── */}
        <div className="relative z-10 w-full h-full p-4 sm:p-5 lg:p-4.5 xl:p-6 flex flex-col justify-between">
          {/* Upper Content: Number Badge & Headings */}
          <div>
            {/* Number Badge Pill */}
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs backdrop-blur-md border shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderColor: card.badgeBorder,
                color: card.accentColor,
                boxShadow: `0 0 14px -2px ${card.glow}`,
              }}
            >
              {card.id}
            </div>

            {/* Title & Description */}
            <div className="mt-2.5 sm:mt-3">
              <h3 className="text-white font-bold text-base sm:text-lg lg:text-[19px] xl:text-[21px] tracking-tight leading-snug font-sans group-hover:text-white transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-300/85 text-xs sm:text-[13px] lg:text-[12.5px] xl:text-[13.5px] leading-relaxed max-w-[190px] sm:max-w-[210px] xl:max-w-[240px] mt-1 sm:mt-1.5">
                {card.description}
              </p>
            </div>
          </div>

          {/* Bottom: Circular Corner Action Arrow (matching reference) */}
          <div className="flex items-center justify-end pt-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/50 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/75 group-hover:text-white group-hover:border-white/45 group-hover:scale-110 transition-all shadow-md">
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </div>
        </div>

        {/* ── Realistic Optical Glass Surface (Topmost Z-Index Layer) ── */}
        <RealisticGlassSurface accentGlow={card.glow} />
      </div>
    );
  };

  return (
    <section id="services" className="relative py-16 sm:py-20 lg:py-24 bg-transparent z-10">

      <div className="w-full max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-stretch">

          {/* ── Left Column: Header, Copy, Highlights & Bottom CTA ────────── */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between py-1 lg:py-2">

            {/* Top Header Group */}
            <div className="flex flex-col items-start text-left">
              {/* Small purple pill: "OUR SERVICES" */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2E0B5B]/40 border border-[#A855F7]/35 shadow-[0_0_12px_rgba(168,85,247,0.2)] backdrop-blur-md mb-6">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-purple-200 uppercase font-mono">
                  OUR SERVICES
                </span>
              </div>

              {/* Large heading: "What We Do" */}
              <h2 className="text-5xl sm:text-6xl xl:text-[68px] 2xl:text-[72px] font-extrabold text-white tracking-tight font-display mb-5 leading-[1.05]">
                What We{' '}
                <span className="bg-gradient-to-r from-[#FF7A00] via-[#FF5500] to-[#FF3B00] bg-clip-text text-transparent">
                  Do
                </span>
              </h2>

              {/* Primary supporting description */}
              <p className="text-base sm:text-lg text-slate-300/95 font-normal leading-relaxed mb-4 max-w-sm sm:max-w-md">
                A complete suite of creative, marketing and technology services to help your brand grow, engage and lead.
              </p>

              {/* Extended agency capability copy */}
              <p className="text-sm sm:text-base text-slate-400/90 font-normal leading-relaxed max-w-sm sm:max-w-md">
                Combining high-velocity creative production, data-driven performance marketing, and cutting-edge digital experiences into one cohesive engine built to scale ambitious brands.
              </p>
            </div>

            {/* Bottom Group: "Explore More" Button (Lifted up for balanced vertical composition) */}
            <div className="pt-6 sm:pt-8 lg:pt-0 lg:pb-12 xl:pb-16">
              <a
                href="#contact"
                className="glass-btn-luminous inline-flex items-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-white group cursor-pointer"
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className="absolute top-0 left-0 right-0 h-[1.2px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-20" />
                
                {/* Diagonal Ambient Studio Glare */}
                <span className="absolute inset-0 bg-gradient-to-br from-white/[0.25] via-transparent to-white/[0.05] pointer-events-none z-10" />

                <span className="relative z-20">Explore More</span>
                <ArrowRight className="relative z-20 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

          </div>

          {/* ── Right Column: Asymmetric Five-Card Bento Layout (Bigger & Fitted) ── */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between gap-4 sm:gap-5 xl:gap-6">

            {/* Top Row: 2 Wider Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 xl:gap-6">
              {renderCard(bentoCards[0], true)}
              {renderCard(bentoCards[1], true)}
            </div>

            {/* Bottom Row: 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 xl:gap-6">
              {renderCard(bentoCards[2], false)}
              {renderCard(bentoCards[3], false)}
              {renderCard(bentoCards[4], false)}
            </div>

          </div>

        </div>
      </div>

      {/* ── Interactive Deep-Dive Capability Breakdown Modal ──────────── */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-[#0D0922]/95 border p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto"
            style={{ borderColor: selectedService.borderColor }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold text-slate-400 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                {selectedService.id}
              </span>
              <span
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: selectedService.accentColor }}
              >
                Full Capability Breakdown
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 font-display">
              {selectedService.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {selectedService.detailedSummary}
            </p>

            {/* Itemized Capabilities */}
            <div className="space-y-3.5 mb-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Included Offerings & Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.offerings.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: selectedService.accentColor }}
                      />
                      <div>
                        <div className="text-sm font-semibold text-white leading-tight mb-1">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-400 leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Ready to amplify this capability for your brand?
              </span>
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="btn-gradient-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg cursor-pointer"
              >
                <span>Discuss {selectedService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
