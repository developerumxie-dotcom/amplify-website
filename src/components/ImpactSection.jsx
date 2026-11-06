import React from 'react';
import { ArrowRight, Rocket, Play, Globe } from 'lucide-react';

const stats = [
  {
    id: 'brands',
    title: 'Brands Grown',
    icon: Rocket,
    iconBg: 'bg-[#FF7A00]/20 text-[#FF7A00] border-[#FF7A00]/30',
    glowGradient: 'from-[#FF7A00]/25 to-transparent',
    borderColor: 'rgba(255, 122, 0, 0.28)',
  },
  {
    id: 'campaigns',
    title: 'Campaigns Executed',
    icon: Play,
    iconBg: 'bg-[#9D4EDD]/20 text-[#C77DFF] border-[#9D4EDD]/30',
    glowGradient: 'from-[#9D4EDD]/25 to-transparent',
    borderColor: 'rgba(157, 78, 221, 0.28)',
  },
  {
    id: 'presence',
    title: 'Global Presence',
    icon: Globe,
    iconBg: 'bg-[#E02696]/20 text-[#FF5DA2] border-[#E02696]/30',
    glowGradient: 'from-[#E02696]/25 to-transparent',
    borderColor: 'rgba(224, 38, 150, 0.28)',
  },
];

export default function ImpactSection() {
  return (
    <section className="relative py-14 sm:py-24 z-10 overflow-hidden">
      {/* Background Deep Glows */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[450px] bg-[#3B1261]/25 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1380px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-8 xl:px-12">
        <div className="relative rounded-[32px] border border-white/12 bg-[#09061A]/80 backdrop-blur-2xl p-8 sm:p-12 xl:p-14 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)]">
          
          {/* Right Skyline Artwork (Panoramic glowing futuristic city) */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[48%] pointer-events-none opacity-40 lg:opacity-90">
            <img
              src="/assets/impact-skyline.png"
              alt="Futuristic Skyline"
              className="w-full h-full object-cover object-right"
            />
            {/* Blending Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#09061A] via-[#09061A]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09061A] via-transparent to-[#09061A]/40" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col items-start">
              {/* Tag Badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#3B1261]/45 border border-[#9D4EDD]/35 backdrop-blur-md mb-6">
                <span className="text-xs font-bold tracking-[0.18em] text-purple-300 uppercase">
                  OUR IMPACT
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight font-display leading-[1.12] mb-5">
                Ideas. Strategy. <br />
                Real Results.
              </h2>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-300/85 font-normal leading-relaxed max-w-md mb-8">
                Partner with a team that understands the power of creativity and technology.
              </p>

              {/* Button */}
              <a
                href="#contact"
                className="btn-gradient-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white group cursor-pointer shadow-[0_4px_20px_rgba(255,122,0,0.35)]"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Middle Stats Columns */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.id}
                    className="relative rounded-[24px] border bg-[#110C29]/80 backdrop-blur-xl p-6 sm:p-7 flex flex-col items-center justify-between text-center min-h-[200px] sm:min-h-[220px] transition-transform duration-300 hover:-translate-y-1.5 overflow-hidden"
                    style={{ borderColor: s.borderColor }}
                  >
                    {/* Top Icon with Glowing Circle */}
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${s.iconBg} backdrop-blur-md shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="absolute -top-1 -right-2 text-sm font-bold text-slate-300">
                        +
                      </span>
                    </div>

                    {/* Stat Label */}
                    <div className="mt-5">
                      <div className="text-base sm:text-lg font-bold text-white tracking-tight font-display leading-tight text-center">
                        {s.title}
                      </div>
                    </div>

                    {/* Subtle bottom gradient glow */}
                    <div className={`absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t ${s.glowGradient} pointer-events-none`} />
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
