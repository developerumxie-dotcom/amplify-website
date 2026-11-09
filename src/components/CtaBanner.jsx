import React, { useState, useRef } from 'react';
import { companyInfo } from '../data/websiteContent';

/**
 * AMPLIFY DIGITAL — EXACT CTA BANNER
 * Pixel-accurate recreation of approved reference:
 * - Wide horizontal glassmorphism container with rounded corners
 * - Perfectly isolated 8K 3D polygonal origami swallow (zero background, pure transparency)
 * - Dual-tone ambient lighting (top-left purple, right fiery orange atmosphere)
 * - Exact typography: "Have a vision? \n Let's amplify it."
 * - "Book a Strategy Call →" gradient pill button with radiant glowing orange halo
 * - Interactive mouseover effects: cursor spotlight glow, 3D tilt, and dynamic border luminescence
 */
export default function CtaBanner() {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2;
    const rotateY = ((x - centerX) / centerX) * 2;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section id="contact" className="relative pt-6 sm:pt-10 pb-2 sm:pb-3 bg-[#03020A] overflow-hidden z-10">
      
      {/* ── Outer Atmospheric Ambient Illumination (Purple on Left, Orange on Right) ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-[-6%] -translate-y-1/2 w-[520px] h-[340px] rounded-full bg-[#7928CA]/22 blur-[150px]" />
        <div className="absolute top-1/2 right-[-4%] -translate-y-1/2 w-[580px] h-[360px] rounded-full bg-[#FF7A00]/28 blur-[160px]" />
      </div>

      <div className="w-full max-w-[1360px] 2xl:max-w-[1460px] mx-auto px-4 sm:px-8 xl:px-12 relative z-10">
        
        {/* ── Wide Glassmorphism Banner Container ───────────────────── */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden bg-[#070214] px-6 sm:px-10 lg:px-12 py-5 sm:py-6 lg:py-7 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 min-h-[118px] sm:min-h-[126px] lg:min-h-[134px] transition-all duration-300 group/card cursor-pointer"
          style={{
            boxShadow: isHovered
              ? '0 0 50px -5px rgba(255, 122, 0, 0.48), 0 0 35px -5px rgba(168, 85, 247, 0.38)'
              : '0 0 35px -5px rgba(255, 122, 0, 0.32), 0 0 25px -5px rgba(168, 85, 247, 0.25)',
            transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovered ? 'scale(1.005)' : 'scale(1)'}`,
            transitionProperty: 'transform, box-shadow',
          }}
        >
          {/* Dual Glow Border (Violet on Top-Left, Fiery Orange on Bottom-Right) */}
          <div 
            className="absolute inset-0 rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] pointer-events-none z-20 border border-transparent"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.50) 0%, rgba(255, 255, 255, 0.15) 30%, rgba(255, 122, 0, 0.25) 65%, rgba(255, 122, 0, 0.65) 100%) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          {/* Specular Top Border Sheen */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-20" />

          {/* Top-Left Subtle Purple Atmosphere Glow */}
          <div 
            className="absolute top-0 left-0 w-[55%] h-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse 70% 90% at 5% 15%, rgba(168, 85, 247, 0.32) 0%, rgba(121, 40, 202, 0.12) 50%, transparent 80%)',
            }}
          />

          {/* Right Fiery Amber/Orange Atmosphere Glow (Fills right 48% of card smoothly) */}
          <div 
            className="absolute top-0 right-0 w-[55%] h-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse 75% 120% at 88% 50%, rgba(255, 120, 0, 0.55) 0%, rgba(255, 80, 0, 0.28) 42%, rgba(255, 50, 0, 0.10) 65%, transparent 85%)',
            }}
          />

          {/* Bird Atmospheric Radial Core Glow */}
          <div 
            className="absolute top-1/2 right-[4%] -translate-y-1/2 w-[340px] h-[160px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255, 120, 0, 0.45) 0%, rgba(255, 80, 0, 0.20) 50%, transparent 80%)',
              filter: 'blur(16px)',
            }}
          />

          {/* Neon Light Waves & Trails */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-75">
            <svg className="w-full h-full" viewBox="0 0 1200 130" fill="none" preserveAspectRatio="none">
              <path d="M 0 35 Q 320 75 620 25" stroke="url(#cardPurpleTrail)" strokeWidth="1.2" strokeOpacity="0.45" />
              <path d="M 520 115 Q 750 126 950 85 T 1200 65" stroke="url(#cardOrangeWave)" strokeWidth="1.8" strokeOpacity="0.85" filter="url(#glowWave)" />
              <defs>
                <filter id="glowWave" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="cardPurpleTrail" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="cardOrangeWave" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF2E93" stopOpacity="0" />
                  <stop offset="35%" stopColor="#FF4500" stopOpacity="0.75" />
                  <stop offset="70%" stopColor="#FF7A00" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#FFAA00" stopOpacity="0.85" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Perfectly Isolated Ultra-HD 3D Origami Bird (Pure Transparency, Zero Background Box) */}
          <div className="absolute right-0 top-0 bottom-0 h-full flex items-center justify-end pointer-events-none z-10 pr-6 sm:pr-8 md:pr-12 lg:pr-16">
            <img
              src="/assets/cta-bird-isolated-hd.png"
              alt=""
              className="h-[70%] sm:h-[74%] lg:h-[78%] w-auto object-contain -rotate-[3deg] drop-shadow-[0_0_28px_rgba(255,122,0,0.7)] drop-shadow-[0_0_55px_rgba(255,80,0,0.4)] transition-transform duration-700 ease-out group-hover/card:scale-[1.06] group-hover/card:-rotate-[1deg]"
            />
          </div>

          {/* Interactive Mouse Spotlight Reflection Effect */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 380px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 130, 0, 0.14), rgba(168, 85, 247, 0.08) 50%, transparent 80%)`,
              }}
            />
          )}

          {/* ── Left Heading Block ──────────────────────────────────── */}
          <div className="relative z-10 text-center md:text-left shrink-0">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[35px] font-bold text-white tracking-tight font-display leading-[1.14]">
              Have a vision? <br />
              Let's{' '}
              <span className="bg-gradient-to-r from-[#FF7A00] via-[#FF2E93] to-[#A855F7] bg-clip-text text-transparent">
                amplify it.
              </span>
            </h2>
          </div>

          {/* ── Center Action Button (Perfect Center-Right Placement) ── */}
          <div className="relative z-10 flex items-center justify-center shrink-0 md:mr-14 lg:mr-24 xl:mr-32">
            <div className="relative group/btn">
              {/* Luminous Orange Radial Halo Glow */}
              <div 
                className="absolute -inset-3.5 rounded-full pointer-events-none transition-all duration-300 group-hover/btn:scale-115 group-hover/btn:opacity-95"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 122, 0, 0.75) 0%, rgba(255, 95, 0, 0.40) 45%, transparent 70%)',
                  filter: 'blur(10px)',
                }}
              />

              <a
                href={companyInfo.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF6A00] via-[#E11D48] to-[#D946EF] shadow-[0_0_22px_rgba(255,106,0,0.65)] hover:shadow-[0_0_38px_rgba(255,106,0,0.90)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap cursor-pointer select-none"
              >
                <span>Book a Strategy Call</span>
                <span className="text-base font-bold leading-none select-none transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
