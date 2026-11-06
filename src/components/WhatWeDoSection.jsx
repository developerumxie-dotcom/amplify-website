import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const serviceCards = [
  {
    id: '01',
    title: 'Strategy & Brand',
    description: 'Build a powerful brand with purpose.',
    image: '/assets/service-strategy.png',
    borderColor: 'rgba(168, 85, 247, 0.35)',
    glow: 'rgba(168, 85, 247, 0.3)',
  },
  {
    id: '02',
    title: 'Content & Production',
    description: 'Create unforgettable content.',
    image: '/assets/service-content.png',
    borderColor: 'rgba(249, 115, 22, 0.35)',
    glow: 'rgba(249, 115, 22, 0.3)',
  },
  {
    id: '03',
    title: 'Social & Influence',
    description: 'Grow your presence across platforms.',
    image: '/assets/service-social.png',
    borderColor: 'rgba(236, 72, 153, 0.35)',
    glow: 'rgba(236, 72, 153, 0.3)',
  },
  {
    id: '04',
    title: 'Performance & Growth',
    description: 'Turn clicks into measurable growth.',
    image: '/assets/service-performance.png',
    borderColor: 'rgba(234, 179, 8, 0.35)',
    glow: 'rgba(234, 179, 8, 0.3)',
  },
  {
    id: '05',
    title: 'Digital Experiences & Events',
    description: 'Build immersive digital experiences.',
    image: '/assets/service-experiences.png',
    borderColor: 'rgba(147, 51, 234, 0.35)',
    glow: 'rgba(147, 51, 234, 0.3)',
  },
];

export default function WhatWeDoSection() {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <section id="services" className="relative py-20 sm:py-28 z-10">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[#7928CA]/18 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] rounded-full bg-[#FF7A00]/12 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1380px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          
          {/* Left Column: Header, Copy, CTA & Controls */}
          <div className="lg:col-span-4 flex flex-col items-start pt-2 lg:pt-4">
            {/* Tag Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#3B1261]/45 border border-[#9D4EDD]/35 backdrop-blur-md mb-7">
              <span className="text-xs font-bold tracking-[0.18em] text-purple-300 uppercase">
                OUR SERVICES
              </span>
            </div>

            {/* Section Title */}
            <h2 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight font-display mb-6">
              What We <span className="text-brand-orange">Do</span>
            </h2>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-slate-300/85 font-normal leading-relaxed mb-9 max-w-md">
              A complete suite of creative, marketing and technology services to help your brand grow, engage and lead.
            </p>

            {/* CTA Button */}
            <a
              href="#contact"
              className="btn-gradient-primary inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white mb-12 group cursor-pointer shadow-[0_4px_20px_rgba(255,122,0,0.35)]"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            {/* Slider / Pagination Control: 01 ──── 05 < > */}
            <div className="flex items-center gap-4 text-sm font-semibold text-slate-400 select-none">
              <span className="text-slate-200">01</span>
              <div className="w-20 h-[2.5px] bg-white/20 relative rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-orange to-brand-magenta transition-all duration-300"
                  style={{ width: `${(currentSlide / 5) * 100}%` }}
                />
              </div>
              <span>05</span>

              <div className="flex items-center gap-2.5 ml-3">
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev > 1 ? prev - 1 : 5))}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/12 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev < 5 ? prev + 1 : 1))}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/12 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Bento Grid of 5 Services */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            
            {/* Top Row: 2 Wider Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Card 01: Strategy & Brand */}
              <div
                className="group relative rounded-[24px] overflow-hidden border bg-[#0B081F]/90 p-6 sm:p-7 xl:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[250px] xl:min-h-[270px] transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  borderColor: serviceCards[0].borderColor,
                  boxShadow: `0 14px 35px -10px ${serviceCards[0].glow}`,
                }}
              >
                {/* Background Artwork */}
                <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none overflow-hidden">
                  <img
                    src={serviceCards[0].image}
                    alt={serviceCards[0].title}
                    className="w-full h-full object-cover object-right opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B081F] via-[#0B081F]/60 to-transparent" />
                </div>

                <div className="relative z-10">
                  <span className="text-xs sm:text-sm font-mono text-slate-400 block mb-3 font-semibold">
                    {serviceCards[0].id}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display mb-2 max-w-[220px]">
                    {serviceCards[0].title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-slate-300/85 max-w-[240px] leading-relaxed">
                    {serviceCards[0].description}
                  </p>
                </div>

                <div className="relative z-10 flex justify-end pt-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/12 group-hover:bg-white/25 transition-colors">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Card 02: Content & Production */}
              <div
                className="group relative rounded-[24px] overflow-hidden border bg-[#0B081F]/90 p-6 sm:p-7 xl:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[250px] xl:min-h-[270px] transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  borderColor: serviceCards[1].borderColor,
                  boxShadow: `0 14px 35px -10px ${serviceCards[1].glow}`,
                }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none overflow-hidden">
                  <img
                    src={serviceCards[1].image}
                    alt={serviceCards[1].title}
                    className="w-full h-full object-cover object-right opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B081F] via-[#0B081F]/60 to-transparent" />
                </div>

                <div className="relative z-10">
                  <span className="text-xs sm:text-sm font-mono text-slate-400 block mb-3 font-semibold">
                    {serviceCards[1].id}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display mb-2 max-w-[220px]">
                    {serviceCards[1].title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-slate-300/85 max-w-[240px] leading-relaxed">
                    {serviceCards[1].description}
                  </p>
                </div>

                <div className="relative z-10 flex justify-end pt-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/12 group-hover:bg-white/25 transition-colors">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: 3 Compact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {serviceCards.slice(2).map((card) => (
                <div
                  key={card.id}
                  className="group relative rounded-[24px] overflow-hidden border bg-[#0B081F]/90 p-6 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] xl:min-h-[260px] transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    borderColor: card.borderColor,
                    boxShadow: `0 12px 30px -10px ${card.glow}`,
                  }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-[60%] pointer-events-none overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-right opacity-85 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B081F] via-[#0B081F]/70 to-transparent" />
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs sm:text-sm font-mono text-slate-400 block mb-2.5 font-semibold">
                      {card.id}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-display mb-1.5 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-300/80 leading-relaxed max-w-[170px]">
                      {card.description}
                    </p>
                  </div>

                  <div className="relative z-10 flex justify-end pt-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/12 group-hover:bg-white/25 transition-colors">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
