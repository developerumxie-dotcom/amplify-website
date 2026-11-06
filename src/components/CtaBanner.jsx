import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section id="contact" className="relative py-14 sm:py-20 z-10">
      <div className="w-full max-w-[1380px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-8 xl:px-12">
        <div className="relative w-full rounded-[32px] overflow-hidden border border-[#FF6B00]/35 shadow-[0_20px_55px_rgba(255,107,0,0.3)] p-10 sm:p-14 xl:p-16 flex flex-col md:flex-row items-center justify-between gap-10 min-h-[220px] sm:min-h-[250px]">
          
          {/* Background Fiery Wave Artwork */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/cta-banner-bg.png"
              alt="Cosmic Wave Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E0610]/85 via-[#1E0610]/40 to-[#12041A]/70" />
          </div>

          {/* Left Text */}
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-extrabold text-white tracking-tight font-display leading-tight">
              Have a vision? <br />
              Let’s <span className="text-gradient-orange-purple font-black">amplify</span> it.
            </h2>
          </div>

          {/* Center / Right Button */}
          <div className="relative z-10 flex items-center gap-8">
            <a
              href="mailto:hello@amplifydigital.com"
              className="btn-gradient-primary inline-flex items-center gap-3 px-9 py-4 rounded-full text-base font-semibold text-white shadow-2xl group cursor-pointer"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            {/* Glowing Origami Bird Silhouette on Far Right */}
            <div className="hidden sm:block w-20 h-20 sm:w-28 sm:h-28 shrink-0 filter drop-shadow-[0_0_20px_rgba(255,122,0,0.65)]">
              <img
                src="/assets/logo-bird.png"
                alt="Amplify Bird"
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
