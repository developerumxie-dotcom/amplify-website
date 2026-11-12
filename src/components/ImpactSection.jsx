import React from 'react';
import { ArrowRight, Rocket, Award, Users } from 'lucide-react';
import { impactStats } from '../data/websiteContent';
import RealisticGlassSurface from './RealisticGlassSurface';

export default function ImpactSection() {
  return (
    <section id="about" className="relative py-16 sm:py-24 z-10">

      <div className="w-full max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-8 xl:px-12">
        
        {/* Section Tag Pill Outside on Top of the Card */}
        <div className="flex items-center justify-start mb-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2E0B5B]/60 border border-[#A855F7]/45 shadow-[0_0_18px_rgba(168,85,247,0.3)] backdrop-blur-md">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-purple-200 uppercase font-mono">
              OUR IMPACT
            </span>
          </div>
        </div>

        <div className="relative rounded-[32px] border border-white/20 bg-gradient-to-br from-white/[0.12] via-white/[0.03] to-[#0c0824]/60 backdrop-blur-3xl backdrop-saturate-200 p-8 sm:p-12 xl:p-14 overflow-hidden shadow-[0_25px_65px_-12px_rgba(168,85,247,0.25),inset_0_1.5px_1px_0_rgba(255,255,255,0.55),inset_1.5px_0_1px_0_rgba(255,255,255,0.25),inset_0_-1.5px_1px_0_rgba(0,0,0,0.45),inset_0_0_30px_0_rgba(255,255,255,0.03)]">
          
          {/* Specular Top Border Sheen */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-30" />

          {/* Left Edge Specular Refraction */}
          <div className="absolute top-0 bottom-0 left-0 w-[1.2px] bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none z-30" />

          {/* Diagonal Glass Glare */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.14] via-transparent to-white/[0.02] pointer-events-none z-25" />

          {/* Micro-Frosted Silica Grain */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.035] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Right Skyline Artwork (Panoramic glowing futuristic digital metropolis) */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] pointer-events-none">
            <img
              src="/assets/impact-bg-hd.jpg"
              alt="Futuristic Digital Metropolis"
              className="w-full h-full object-cover object-right opacity-75 lg:opacity-90"
              loading="lazy"
            />
            {/* Blending Gradients to melt seamlessly into card background */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{
                background: 'linear-gradient(to right, #09061A 0%, rgba(9, 6, 26, 0.92) 30%, rgba(9, 6, 26, 0.35) 65%, transparent 100%)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09061A] via-transparent to-[#09061A]/35 pointer-events-none" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight font-display leading-[1.10] mb-5">
                Ideas. Strategy. <br />
                <span className="bg-gradient-to-r from-[#FF7A00] via-[#FF5500] to-[#E02696] bg-clip-text text-transparent">
                  Real Results.
                </span>
              </h2>

              {/* Subtext with Authentic Agency Story from Live Site */}
              <p className="text-base sm:text-lg text-slate-300/85 font-normal leading-relaxed max-w-md mb-8">
                With over 3+ years of invaluable market experience, we combine cutting-edge technology with honesty and transparency to propel brands from local businesses to industry leaders.
              </p>

              {/* Button */}
              <a
                href="#contact"
                className="glass-btn-luminous inline-flex items-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-white group cursor-pointer"
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className="absolute top-0 left-0 right-0 h-[1.2px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-20" />
                
                {/* Diagonal Ambient Studio Glare */}
                <span className="absolute inset-0 bg-gradient-to-br from-white/[0.25] via-transparent to-white/[0.05] pointer-events-none z-10" />

                <span className="relative z-20">Partner With Us</span>
                <ArrowRight className="relative z-20 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Middle Stats Columns — Populated with Verified Live Metrics */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* Stat 1: 320+ Campaigns */}
              <div
                className="relative rounded-[24px] border border-[#FF7A00]/40 bg-gradient-to-br from-white/[0.12] via-white/[0.03] to-[#0c0824]/60 backdrop-blur-2xl backdrop-saturate-200 p-6 sm:p-7 flex flex-col items-center justify-between text-center min-h-[220px] sm:min-h-[240px] transition-transform duration-300 hover:-translate-y-1.5 overflow-hidden shadow-lg"
                style={{ boxShadow: '0 10px 32px -8px rgba(255, 122, 0, 0.35), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1.5px 1px 0 rgba(0, 0, 0, 0.45), inset 0 0 20px 0 rgba(255, 255, 255, 0.03)' }}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border bg-[#FF7A00]/20 text-[#FF7A00] border-[#FF7A00]/40 backdrop-blur-md shadow-lg">
                    <Rocket className="w-6 h-6" />
                  </div>
                </div>

                <div className="mt-4 relative z-10">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-1 text-gradient-orange-purple">
                    320+
                  </div>
                  <div className="text-sm font-bold text-slate-200 tracking-tight leading-tight">
                    Campaigns Delivered
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Across retail, tech & commercial sectors
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#FF7A00]/20 to-transparent pointer-events-none" />
                <RealisticGlassSurface accentGlow="rgba(255, 122, 0, 0.35)" />
              </div>

              {/* Stat 2: 250+ Business Partners */}
              <div
                className="relative rounded-[24px] border border-[#A855F7]/40 bg-gradient-to-br from-white/[0.12] via-white/[0.03] to-[#0c0824]/60 backdrop-blur-2xl backdrop-saturate-200 p-6 sm:p-7 flex flex-col items-center justify-between text-center min-h-[220px] sm:min-h-[240px] transition-transform duration-300 hover:-translate-y-1.5 overflow-hidden shadow-lg"
                style={{ boxShadow: '0 10px 32px -8px rgba(168, 85, 247, 0.35), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1.5px 1px 0 rgba(0, 0, 0, 0.45), inset 0 0 20px 0 rgba(255, 255, 255, 0.03)' }}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border bg-[#A855F7]/20 text-[#C77DFF] border-[#A855F7]/40 backdrop-blur-md shadow-lg">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                <div className="mt-4 relative z-10">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-1 text-gradient-orange-purple">
                    250+
                  </div>
                  <div className="text-sm font-bold text-slate-200 tracking-tight leading-tight">
                    Business Partners
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Startups to national enterprise brands
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#A855F7]/20 to-transparent pointer-events-none" />
                <RealisticGlassSurface accentGlow="rgba(168, 85, 247, 0.35)" />
              </div>

              {/* Stat 3: 3+ Years of Excellence */}
              <div
                className="relative rounded-[24px] border border-[#E02696]/40 bg-gradient-to-br from-white/[0.12] via-white/[0.03] to-[#0c0824]/60 backdrop-blur-2xl backdrop-saturate-200 p-6 sm:p-7 flex flex-col items-center justify-between text-center min-h-[220px] sm:min-h-[240px] transition-transform duration-300 hover:-translate-y-1.5 overflow-hidden shadow-lg"
                style={{ boxShadow: '0 10px 32px -8px rgba(224, 38, 150, 0.35), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1.5px 1px 0 rgba(0, 0, 0, 0.45), inset 0 0 20px 0 rgba(255, 255, 255, 0.03)' }}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border bg-[#E02696]/20 text-[#FF5DA2] border-[#E02696]/40 backdrop-blur-md shadow-lg">
                    <Award className="w-6 h-6" />
                  </div>
                </div>

                <div className="mt-4 relative z-10">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-1 text-gradient-orange-purple">
                    3+
                  </div>
                  <div className="text-sm font-bold text-slate-200 tracking-tight leading-tight">
                    Years Market Experience
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Proven track record of digital excellence
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#E02696]/20 to-transparent pointer-events-none" />
                <RealisticGlassSurface accentGlow="rgba(224, 38, 150, 0.35)" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
