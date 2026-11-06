import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-10 lg:px-12 pt-3.5 sm:pt-4 pb-2">
      <div className="w-full max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* Brand Logo - Scaled to match reference (38px x 38px) */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none shrink-0">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/assets/logo-bird.png" 
              alt="Amplify Digital Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-white font-extrabold text-[13px] sm:text-sm tracking-[0.16em] leading-tight font-display">
              AMPLIFY
            </span>
            <span className="text-slate-300 font-semibold text-[9.5px] sm:text-[10px] tracking-[0.22em] leading-tight mt-0.5">
              DIGITAL
            </span>
          </div>
        </a>

        {/* Center Floating Glass Capsule Navigation (394px wide, reference style) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 px-6 py-1.5 rounded-full bg-[#130b28]/70 border border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          {/* What We Do with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('what-we-do')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-slate-200 hover:text-white transition-colors rounded-full"
            >
              <span>What We Do</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'what-we-do' ? 'rotate-180 text-brand-orange' : 'text-slate-400'}`} />
            </button>

            {/* Dropdown Menu */}
            {activeDropdown === 'what-we-do' && (
              <div className="absolute top-full left-0 mt-2.5 w-68 rounded-2xl bg-[#0F0B24]/95 border border-white/10 p-2.5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                <a href="#services" className="block px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  <div className="font-semibold text-white text-sm">Strategy & Brand</div>
                  <div className="text-xs text-slate-400">Build a powerful brand with purpose</div>
                </a>
                <a href="#services" className="block px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  <div className="font-semibold text-white text-sm">Content & Production</div>
                  <div className="text-xs text-slate-400">Create unforgettable visual content</div>
                </a>
                <a href="#services" className="block px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  <div className="font-semibold text-white text-sm">Social & Influence</div>
                  <div className="text-xs text-slate-400">Grow audience presence across platforms</div>
                </a>
                <a href="#services" className="block px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  <div className="font-semibold text-white text-sm">Performance & Growth</div>
                  <div className="text-xs text-slate-400">Turn clicks into measurable growth</div>
                </a>
                <a href="#services" className="block px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  <div className="font-semibold text-white text-sm">Digital Experiences</div>
                  <div className="text-xs text-slate-400">Build immersive web apps & events</div>
                </a>
              </div>
            )}
          </div>

          <a 
            href="#work" 
            className="px-3 py-1 text-xs font-medium text-slate-200 hover:text-white transition-colors rounded-full"
          >
            Work
          </a>

          <a 
            href="#about" 
            className="px-3 py-1 text-xs font-medium text-slate-200 hover:text-white transition-colors rounded-full"
          >
            About
          </a>

          {/* Insights with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('insights')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-slate-200 hover:text-white transition-colors rounded-full"
            >
              <span>Insights</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'insights' ? 'rotate-180 text-brand-orange' : 'text-slate-400'}`} />
            </button>

            {activeDropdown === 'insights' && (
              <div className="absolute top-full right-0 mt-2.5 w-60 rounded-2xl bg-[#0F0B24]/95 border border-white/10 p-2.5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                <a href="#insights" className="block px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  <div className="font-semibold text-white text-sm">Industry Reports</div>
                  <div className="text-xs text-slate-400">2026 Marketing & AI Benchmarks</div>
                </a>
                <a href="#insights" className="block px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                  <div className="font-semibold text-white text-sm">Case Studies</div>
                  <div className="text-xs text-slate-400">Verified Client Growth Stories</div>
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Button: Let's Talk (Generous padding, clean border and arrow) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold text-white bg-white/[0.05] hover:bg-white/[0.10] border border-white/20 hover:border-white/35 backdrop-blur-xl transition-all duration-200 shadow-[0_2px_14px_rgba(0,0,0,0.35)] hover:shadow-[0_0_20px_rgba(255,255,255,0.18)] group shrink-0"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-2 p-5 rounded-3xl bg-[#0D0922]/95 border border-white/15 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-3">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm text-slate-200 hover:text-white hover:bg-white/5 rounded-xl font-medium"
            >
              What We Do
            </a>
            <a 
              href="#work" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm text-slate-200 hover:text-white hover:bg-white/5 rounded-xl font-medium"
            >
              Work
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm text-slate-200 hover:text-white hover:bg-white/5 rounded-xl font-medium"
            >
              About
            </a>
            <a 
              href="#insights" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm text-slate-200 hover:text-white hover:bg-white/5 rounded-xl font-medium"
            >
              Insights
            </a>
            <div className="pt-3 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-brand-orange to-brand-magenta"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
