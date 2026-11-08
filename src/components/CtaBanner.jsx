import React from 'react';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { companyInfo } from '../data/websiteContent';

export default function CtaBanner() {
  return (
    <section id="contact" className="relative py-14 sm:py-20 z-10">
      <div className="w-full max-w-[1380px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-8 xl:px-12">
        <div className="relative w-full rounded-[32px] overflow-hidden border border-[#FF6B00]/35 shadow-[0_20px_55px_rgba(255,107,0,0.3)] p-10 sm:p-14 xl:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[220px] sm:min-h-[250px]">
          
          {/* Background Fiery Wave Artwork */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/cta-banner-bg.png"
              alt="Cosmic Wave Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E0610]/90 via-[#1E0610]/45 to-[#12041A]/75" />
          </div>

          {/* Left Text */}
          <div className="relative z-10 text-center lg:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange block mb-2 font-mono">
              GET IN TOUCH DIRECTLY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-extrabold text-white tracking-tight font-display leading-tight mb-4">
              Have a vision? <br />
              Let’s <span className="text-gradient-orange-purple font-black">amplify</span> it.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-normal">
              Direct line: <span className="font-semibold text-white">{companyInfo.contact.phone}</span> • <span className="font-semibold text-white">{companyInfo.contact.email}</span>
            </p>
          </div>

          {/* Center / Right Buttons */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href={companyInfo.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient-primary inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white shadow-2xl group cursor-pointer"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href={`tel:${companyInfo.contact.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-orange" />
              <span>Call Us</span>
            </a>

            {/* Glowing Origami Bird Silhouette on Far Right */}
            <div className="hidden xl:block w-20 h-20 shrink-0 filter drop-shadow-[0_0_20px_rgba(255,122,0,0.65)] ml-2">
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
