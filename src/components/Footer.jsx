import React from 'react';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { companyInfo } from '../data/websiteContent';

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-12 border-t border-white/10 bg-[#04020B] z-10">
      <div className="w-full max-w-[1380px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-8 xl:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10 pb-14">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a href="#" className="flex items-center gap-3.5 mb-4 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
                <img 
                  src="/assets/logo-bird.png" 
                  alt="Amplify Digital Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,229,255,0.45)]"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white font-extrabold text-base sm:text-lg tracking-[0.18em] leading-tight font-display">
                  AMPLIFY
                </span>
                <span className="text-slate-300 font-semibold text-xs tracking-[0.26em] leading-tight">
                  DIGITAL
                </span>
              </div>
            </a>
            <p className="text-sm text-slate-400 font-medium tracking-wide mb-3">
              360° Creative, Digital & Growth Studio.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Empowering brands from local businesses to industry leaders with cutting-edge technology, transparency, and data-driven creative strategies.
            </p>
          </div>

          {/* Column 1: Our Verticals */}
          <div className="lg:col-span-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-5">
              Our Verticals
            </h4>
            <ul className="space-y-3 text-sm text-slate-300 font-medium">
              <li className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
                <a href="#brands">Amplify Digital (For Brands)</a>
              </li>
              <li className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E02696] shadow-[0_0_8px_#E02696]" />
                <a href="#healthcare">Amplify Healthcare</a>
              </li>
              <li className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFB900] shadow-[0_0_8px_#FFB900]" />
                <a href="#academy">Amplify Academy</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-300 font-medium">
              <li>
                <a href="#services" className="hover:text-white transition-colors">What We Do</a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">Work</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#insights" className="hover:text-white transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-300 font-medium mb-6">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href={`tel:${companyInfo.contact.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {companyInfo.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href={`mailto:${companyInfo.contact.email}`} className="hover:text-white transition-colors">
                  {companyInfo.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-magenta shrink-0" />
                <span>{companyInfo.contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-400">
                <ExternalLink className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span>{companyInfo.contact.website}</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 0 0 1.6-1.6c0-.88-.72-1.6-1.6-1.6a1.6 1.6 0 0 0-1.6 1.6c0 .88.72 1.6 1.6 1.6m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 Amplify Digital Services. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
