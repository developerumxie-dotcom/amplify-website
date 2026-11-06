import React from 'react';

/**
 * AMPLIFY DIGITAL — SECOND SECTION: BUSINESS VERTICALS
 * 
 * Exact 1:1 pixel recreation of Reference (1024x200):
 * - Three cards: Amplify Digital, Amplify Healthcare, Amplify Academy
 * - Exact dimensions: each card 304px x 182px (aspect 304/182)
 * - Container: max-w-[1024px] with exact 44px outer margins and 13px gaps
 * - Continuous background: seamless #03020A foundation with matching
 *   left crimson arc and right golden horizon wave flowing from the hero section
 */

const verticals = [
  {
    id: 'digital',
    title: 'Amplify Digital',
    subtitle: 'For Brands',
    description: 'Creative campaigns, powerful branding and digital growth.',
    cta: 'Explore Brands',
    link: '#brands',
    exactImage: '/assets/card-vertical-digital-exact.jpg',
    exactImage2x: '/assets/card-vertical-digital-exact@2x.jpg',
    borderColor: 'rgba(217, 70, 239, 0.40)',
    glowColor: 'rgba(217, 70, 239, 0.35)',
  },
  {
    id: 'healthcare',
    title: 'Amplify Healthcare',
    subtitle: 'For Healthcare',
    description: 'Hospital marketing, patient growth and automation.',
    cta: 'Explore Healthcare',
    link: '#healthcare',
    exactImage: '/assets/card-vertical-healthcare-exact.jpg',
    exactImage2x: '/assets/card-vertical-healthcare-exact@2x.jpg',
    borderColor: 'rgba(56, 189, 248, 0.40)',
    glowColor: 'rgba(14, 165, 233, 0.35)',
  },
  {
    id: 'academy',
    title: 'Amplify Academy',
    subtitle: 'For Learners',
    description: 'Digital marketing & AI education for the future.',
    cta: 'Explore Academy',
    link: '#academy',
    exactImage: '/assets/card-vertical-academy-exact.jpg',
    exactImage2x: '/assets/card-vertical-academy-exact@2x.jpg',
    borderColor: 'rgba(250, 204, 21, 0.40)',
    glowColor: 'rgba(234, 179, 8, 0.35)',
  },
];

export default function BusinessVerticals() {
  return (
    <section 
      id="verticals" 
      className="relative w-full overflow-hidden bg-[#03020A] pt-2 pb-5 lg:pt-2 lg:pb-5 z-10"
    >
      {/* ── Background Atmospheric Continuity with Hero ───────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle Deep Indigo Atmosphere */}
        <div className="absolute top-[10%] left-[35%] w-[460px] h-[260px] rounded-full bg-[#1a0a38]/20 blur-[120px]" />
        
        {/* Subtle Soft Golden-Orange Ambient Glow on Right matching Hero */}
        <div className="absolute -top-[15%] right-[0%] w-[440px] h-[320px] rounded-full bg-[#FF7A00]/12 blur-[110px]" />
      </div>

      {/* ── 3 Exact Business Vertical Glassmorphic Cards ────────────────── */}
      <div className="w-full max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[44px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-[13px] items-center">
          {verticals.map((v) => (
            <a
              key={v.id}
              href={v.link}
              className="group relative rounded-[18px] overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer block bg-[#080517] aspect-[304/182] w-full"
              style={{
                borderColor: v.borderColor,
                boxShadow: `0 6px 24px -4px ${v.glowColor}`,
              }}
              aria-label={`${v.title} - ${v.subtitle}: ${v.description}`}
            >
              {/* Exact Card Surface from Reference */}
              <picture className="w-full h-full block">
                <source srcSet={`${v.exactImage2x} 2x, ${v.exactImage} 1x`} />
                <img
                  src={v.exactImage}
                  alt={`${v.title} - ${v.subtitle}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </picture>

              {/* Specular Top Border Sheen */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
