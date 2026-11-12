import React from 'react';
import { ChevronRight } from 'lucide-react';
import { clientLogos } from '../data/websiteContent';
import RealisticGlassSurface from './RealisticGlassSurface';

export default function ClientLogoBar() {
  return (
    <section className="relative py-8 sm:py-12 z-10">
      <div className="w-full max-w-[1380px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-8 xl:px-12">
        <div 
          className="relative overflow-hidden w-full rounded-2xl sm:rounded-full bg-gradient-to-br from-white/[0.12] via-white/[0.03] to-[#0c0824]/60 border border-white/20 backdrop-blur-2xl backdrop-saturate-200 px-8 sm:px-12 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            boxShadow: '0 16px 45px rgba(0,0,0,0.50), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1.5px 1px 0 rgba(0, 0, 0, 0.45), inset 0 0 24px 0 rgba(255, 255, 255, 0.03)',
          }}
        >
          {/* Left Label */}
          <div className="flex items-center gap-4 shrink-0 pr-0 md:pr-8 md:border-r border-white/12 text-center md:text-left">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm text-slate-400 font-normal">Trusted by</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-200">leading brands</span>
            </div>
          </div>

          {/* Authentic Client Logos Row */}
          <div className="flex-1 flex flex-wrap items-center justify-around gap-6 sm:gap-10 px-2 sm:px-6 opacity-90 hover:opacity-100 transition-opacity">
            
            {/* 1. Amazon */}
            <div className="flex items-center h-8 sm:h-9 filter grayscale hover:grayscale-0 transition-all opacity-85 hover:opacity-100">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white lowercase">
                amazon
              </span>
            </div>

            {/* 2. Myntra */}
            <div className="flex items-center h-8 sm:h-9 filter brightness-110 hover:brightness-125 transition-all opacity-90 hover:opacity-100">
              <img 
                src="/assets/clients/logo_client_1.png" 
                alt="Myntra" 
                className="h-6 sm:h-7 w-auto object-contain bg-white/95 px-2 py-0.5 rounded-md shadow-sm"
              />
            </div>

            {/* 3. U.S. POLO ASSN. */}
            <div className="flex items-center h-8 sm:h-9 filter brightness-110 hover:brightness-125 transition-all opacity-90 hover:opacity-100">
              <img 
                src="/assets/clients/logo_client_3.png" 
                alt="U.S. POLO ASSN." 
                className="h-7 sm:h-8 w-auto object-contain bg-white/95 px-2 py-0.5 rounded-md shadow-sm"
              />
            </div>

            {/* 4. Swiggy */}
            <div className="flex items-center h-8 sm:h-9 filter brightness-105 hover:brightness-125 transition-all opacity-90 hover:opacity-100">
              <img 
                src="/assets/clients/logo_client_4.png" 
                alt="Swiggy" 
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </div>

            {/* 5. Peter England */}
            <div className="flex items-center h-8 sm:h-9">
              <span className="text-sm sm:text-base font-extrabold tracking-widest text-white uppercase font-sans border-b border-white/20 pb-0.5">
                PETER ENGLAND
              </span>
            </div>

            {/* 6. Aadona Networks */}
            <div className="flex items-center h-8 sm:h-9 filter brightness-110 hover:brightness-125 transition-all opacity-90 hover:opacity-100">
              <img 
                src="/assets/clients/logo_client_6_aadona.png" 
                alt="Aadona Networks" 
                className="h-6 sm:h-7 w-auto object-contain bg-white/95 px-2 py-1 rounded-md shadow-sm"
              />
            </div>

            {/* 7. The SaleKart */}
            <div className="flex items-center h-8 sm:h-9 filter brightness-110 hover:brightness-125 transition-all opacity-90 hover:opacity-100">
              <img 
                src="/assets/clients/logo_client_7.png" 
                alt="The SaleKart" 
                className="h-6 sm:h-7 w-auto object-contain bg-white/95 px-2 py-0.5 rounded-md shadow-sm"
              />
            </div>

            {/* 8. The Blue Lane */}
            <div className="flex items-center h-8 sm:h-9 filter brightness-110 hover:brightness-125 transition-all opacity-90 hover:opacity-100">
              <img 
                src="/assets/clients/logo_client_8_bl.png" 
                alt="The Blue Lane Designs" 
                className="h-7 sm:h-8 w-auto object-contain bg-white/95 p-1 rounded-md shadow-sm"
              />
            </div>

          </div>

          {/* Right Chevron */}
          <div className="hidden md:flex items-center text-slate-400 pl-6 border-l border-white/12">
            <ChevronRight className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
          </div>

          {/* ── Realistic Optical Glass Surface (Topmost Z-Index Layer) ── */}
          <RealisticGlassSurface />
        </div>
      </div>
    </section>
  );
}
