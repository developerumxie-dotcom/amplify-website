import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { companyInfo } from '../data/websiteContent';

/**
 * AMPLIFY DIGITAL — STANDARD CLEAN FOOTER
 * Simple, elegant, spacious and modern:
 * - Clean layout with generous breathing room
 * - Col 1: Brand logo, AMPLIFY DIGITAL wordmark, tagline "Creative. Strategic. Global."
 * - Col 2: Our Verticals with colored indicator dots
 * - Col 3: Quick Links
 * - Col 4: Get In Touch (Email, Location, Social Icons)
 * - Bottom Bar: Copyright & Legal Links
 */
export default function Footer() {
  return (
    <footer className="relative pt-16 sm:pt-20 pb-10 sm:pb-12 bg-transparent text-slate-300 z-10">

      <div className="w-full max-w-[1360px] 2xl:max-w-[1460px] mx-auto px-5 sm:px-8 xl:px-12 relative z-10">
        
        {/* ── Main 4-Column Navigation Grid ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-white/[0.08]">
          
          {/* ── Column 1: Brand & Identity (lg:col-span-4) ───────────── */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <a href="#" className="flex items-center gap-3.5 group mb-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                <img 
                  src="/assets/footer-bird-exact-ref.png" 
                  alt="Amplify Digital Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,100,0,0.35)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white font-extrabold text-[16px] sm:text-[17px] tracking-[0.16em] leading-tight font-display">
                  AMPLIFY
                </span>
                <span className="text-white font-extrabold text-[16px] sm:text-[17px] tracking-[0.16em] leading-tight font-display">
                  DIGITAL
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-[13px] font-medium text-white/80 tracking-wide mb-2">
              Creative. Strategic. Global.
            </p>
            <p className="text-xs sm:text-[13px] text-white/50 leading-relaxed max-w-sm">
              Empowering brands with high-performance creative, digital transformation, and category-defining scale worldwide.
            </p>
          </div>

          {/* ── Column 2: Our Verticals (lg:col-span-3) ──────────────── */}
          <div className="lg:col-span-3 flex flex-col text-left lg:pl-4">
            <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase mb-4 sm:mb-5">
              Our Verticals
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13.5px] text-white/70 font-normal">
              <li>
                <a href="#brands" className="flex items-center gap-2.5 hover:text-white transition-colors group">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7] shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform">Amplify Digital</span>
                </a>
              </li>
              <li>
                <a href="#healthcare" className="flex items-center gap-2.5 hover:text-white transition-colors group">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4] shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform">Amplify Healthcare</span>
                </a>
              </li>
              <li>
                <a href="#academy" className="flex items-center gap-2.5 hover:text-white transition-colors group">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308] shadow-[0_0_8px_#EAB308] shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform">Amplify Academy</span>
                </a>
              </li>
            </ul>
          </div>

          {/* ── Column 3: Quick Links (lg:col-span-2) ─────────────────── */}
          <div className="lg:col-span-2 flex flex-col text-left">
            <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase mb-4 sm:mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13.5px] text-white/70 font-normal">
              <li>
                <a href="#services" className="hover:text-white transition-colors inline-block hover:translate-x-1 transform">
                  What We Do
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors inline-block hover:translate-x-1 transform">
                  Work
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors inline-block hover:translate-x-1 transform">
                  About
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-white transition-colors inline-block hover:translate-x-1 transform">
                  Insights
                </a>
              </li>
            </ul>
          </div>

          {/* ── Column 4: Get In Touch (lg:col-span-3) ────────────────── */}
          <div className="lg:col-span-3 flex flex-col text-left">
            <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase mb-4 sm:mb-5">
              Get In Touch
            </h4>
            
            <div className="space-y-3.5 text-xs sm:text-[13.5px] text-white/70 font-normal">
              <a 
                href={`mailto:${companyInfo.contact.email}`} 
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span className="group-hover:underline">{companyInfo.contact.email}</span>
              </a>

              <div className="flex items-center gap-2.5 text-white/70">
                <MapPin className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <span>Raipur, Chhattisgarh, India</span>
              </div>

              {/* Social Vector Icons */}
              <div className="flex items-center gap-3 pt-2">
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/company/amplify-digital-services" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-[#0A66C2]/20 border border-white/10 hover:border-[#0A66C2]/50 text-white/70 hover:text-[#0A66C2] flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 0 0 1.6-1.6c0-.88-.72-1.6-1.6-1.6a1.6 1.6 0 0 0-1.6 1.6c0 .88.72 1.6 1.6 1.6m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/amplifydigital.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-[#E4405F]/20 border border-white/10 hover:border-[#E4405F]/50 text-white/70 hover:text-[#E4405F] flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://www.youtube.com/@amplifydigital" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-[#FF0000]/20 border border-white/10 hover:border-[#FF0000]/50 text-white/70 hover:text-[#FF0000] flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a 
                  href="https://x.com/amplifydigital" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="X"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/20 border border-white/10 hover:border-white/50 text-white/70 hover:text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Sub-Bar: Copyright & Legal ───────────────────────── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Amplify Digital Services. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-white/20">•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>

    </footer>
  );
}
