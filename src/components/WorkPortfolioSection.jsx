import React, { useState } from 'react';
import { ArrowRight, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import { portfolioProjects } from '../data/websiteContent';

function PortfolioCard({ item, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group relative rounded-[22px] sm:rounded-[26px] overflow-hidden border transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-[#0A071E]/90 backdrop-blur-xl flex flex-col justify-between shadow-xl"
      style={{
        borderColor: `${item.accentColor}55`,
        boxShadow: `0 8px 32px -6px ${item.accentColor}35`,
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title} - ${item.client}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Specular Top Border Sheen (matching overall site cards) */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      {/* Hover Inner Glow Rim */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[22px] sm:rounded-[26px] z-10"
        style={{ boxShadow: `inset 0 0 28px ${item.accentColor}40` }}
      />

      {/* Media Thumbnail Container with Fast Loading & Skeleton */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070514]">
        {!loaded && (
          <div className="absolute inset-0 bg-white/[0.04] animate-pulse" />
        )}
        <img
          src={item.image}
          alt={item.title}
          decoding="async"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Soft bottom vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A071E] via-[#0A071E]/20 to-transparent pointer-events-none" />

        {/* Client Tag Pill with subtle accent border */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span 
            className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-black/70 text-slate-200 backdrop-blur-md border shadow-sm"
            style={{ borderColor: `${item.accentColor}40` }}
          >
            {item.client}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between relative z-10">
        <div>
          {/* Category with glowing accent dot */}
          <div className="flex items-center gap-2 mb-2">
            <span 
              className="w-1.5 h-1.5 rounded-full" 
              style={{ backgroundColor: item.accentColor, boxShadow: `0 0 8px ${item.accentColor}` }} 
            />
            <span className="text-[11px] uppercase tracking-[0.16em] font-mono font-semibold" style={{ color: item.accentColor }}>
              {item.category}
            </span>
          </div>

          <h3 className="text-lg sm:text-[20px] font-bold text-white tracking-tight font-sans leading-snug group-hover:text-white transition-colors mb-2">
            {item.title}
          </h3>

          <p className="text-slate-300/85 text-xs sm:text-[13px] leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Tags & Corner Circular Pill Action with Accent Tint */}
        <div 
          className="pt-4 mt-4 border-t flex items-center justify-between"
          style={{ borderColor: `${item.accentColor}20` }}
        >
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((t, idx) => (
              <span 
                key={idx} 
                className="text-[10.5px] font-mono border px-2.5 py-0.5 rounded-full text-slate-200"
                style={{ 
                  borderColor: `${item.accentColor}35`,
                  backgroundColor: `${item.accentColor}12`
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div 
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all shadow-md shrink-0 ml-2 border"
            style={{ borderColor: `${item.accentColor}50` }}
          >
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkPortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Retail & Brand Collateral', 'E-Commerce & Performance', 'Web Design & Development'];

  const filteredProjects = activeCategory === 'All'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="relative py-16 sm:py-24 lg:py-28 bg-[#03020A] overflow-hidden z-10">
      
      {/* ── Background Ambient Atmosphere ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-[-5%] w-[520px] h-[480px] rounded-full bg-[#E02696]/10 blur-[150px]" />
        <div className="absolute bottom-10 left-[-5%] w-[540px] h-[500px] rounded-full bg-[#7928CA]/12 blur-[150px]" />
      </div>

      <div className="w-full max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-8 xl:px-12 relative z-10">
        
        {/* ── Section Header Row ────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="flex flex-col items-start text-left max-w-2xl">
            {/* Section Tag Pill matching exact site model */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2E0B5B]/60 border border-[#A855F7]/45 shadow-[0_0_18px_rgba(168,85,247,0.3)] backdrop-blur-md mb-6">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-purple-200 uppercase font-mono">
                SELECTED WORK
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl xl:text-[56px] font-extrabold text-white tracking-tight font-display leading-[1.08]">
              Proven Work.{' '}
              <span className="bg-gradient-to-r from-[#FF7A00] via-[#FF5500] to-[#E02696] bg-clip-text text-transparent">
                Tangible Impact.
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-[17px] text-slate-300/85 font-normal mt-3.5 leading-relaxed max-w-xl">
              Authentic projects and creative campaigns delivered for leading retail giants, e-commerce engines, and growing enterprises.
            </p>
          </div>

          {/* Category Filter Pills (matching brand gradients & glassmorphism) */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#FF7A00] via-[#E11D48] to-[#D946EF] text-white shadow-[0_4px_20px_rgba(255,106,0,0.4)] scale-[1.02]'
                    : 'bg-[#120B29]/70 text-slate-300 hover:text-white border border-white/12 hover:border-white/25 backdrop-blur-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Portfolio Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 xl:gap-8 items-stretch">
          {filteredProjects.map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onClick={() => setSelectedProject(item)}
            />
          ))}
        </div>

      </div>

      {/* ── Interactive Project Deep-Dive Modal ────────────────────── */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl rounded-3xl bg-[#0D0922]/95 border border-white/15 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto"
            style={{ borderColor: selectedProject.accentColor }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Media Preview */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-[#070514] border border-white/10">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/70 text-slate-200 backdrop-blur-md border border-white/20">
                  {selectedProject.client}
                </span>
              </div>
            </div>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: selectedProject.accentColor, boxShadow: `0 0 10px ${selectedProject.accentColor}` }} 
              />
              <span className="text-xs uppercase tracking-widest font-mono font-semibold" style={{ color: selectedProject.accentColor }}>
                {selectedProject.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 font-display">
              {selectedProject.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Deliverables / Tags */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-mono">
                Key Scope & Deliverables
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: selectedProject.accentColor }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Interested in similar outcomes for your brand?
              </span>
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="btn-gradient-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg cursor-pointer"
              >
                <span>Discuss {selectedProject.title}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
