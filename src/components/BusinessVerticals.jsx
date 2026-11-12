import React from 'react';
import { Sparkles, Heart, GraduationCap, ArrowRight, ChevronRight } from 'lucide-react';
import RealisticGlassSurface from './RealisticGlassSurface';
import styles from './BusinessVerticals.module.css';

/**
 * AMPLIFY DIGITAL — SECOND SECTION: BUSINESS VERTICALS
 * 
 * Featuring:
 * - Clean, plain photography without baked-in text or graphics
 * - Real React / HTML semantic typography and accessible markup
 * - Real glassmorphic circular badges with glowing Lucide icons
 * - Interactive hover states, specular top sheens, and responsive scaling
 */

const verticals = [
  {
    id: 'digital',
    title: 'Amplify Digital',
    subtitle: 'For Brands',
    description: 'Creative campaigns, powerful branding and digital growth.',
    cta: 'Explore Brands',
    link: '#brands',
    photo: '/assets/card-photo-digital.jpg',
    borderColor: 'rgba(217, 70, 239, 0.40)',
    glowColor: 'rgba(217, 70, 239, 0.35)',
    accentColor: '#E879F9',
    badgeGlow: 'rgba(217, 70, 239, 0.30)',
    badgeBorder: 'rgba(217, 70, 239, 0.50)',
    icon: Sparkles,
  },
  {
    id: 'healthcare',
    title: 'Amplify Healthcare',
    subtitle: 'For Healthcare',
    description: 'Hospital marketing, patient growth and automation.',
    cta: 'Explore Healthcare',
    link: '#healthcare',
    photo: '/assets/card-photo-healthcare.jpg',
    borderColor: 'rgba(56, 189, 248, 0.40)',
    glowColor: 'rgba(14, 165, 233, 0.35)',
    accentColor: '#38BDF8',
    badgeGlow: 'rgba(56, 189, 248, 0.30)',
    badgeBorder: 'rgba(56, 189, 248, 0.50)',
    icon: Heart,
  },
  {
    id: 'academy',
    title: 'Amplify Academy',
    subtitle: 'For Learners',
    description: 'Digital marketing & AI education for the future.',
    cta: 'Explore Academy',
    link: '#academy',
    photo: '/assets/card-photo-academy.jpg',
    borderColor: 'rgba(250, 204, 21, 0.40)',
    glowColor: 'rgba(234, 179, 8, 0.35)',
    accentColor: '#FACC15',
    badgeGlow: 'rgba(250, 204, 21, 0.30)',
    badgeBorder: 'rgba(250, 204, 21, 0.50)',
    icon: GraduationCap,
  },
];

export default function BusinessVerticals() {
  return (
    <section
      id="verticals"
      className={styles.verticalsSection}
    >
      {/* ── 3 Exact Business Vertical Glassmorphic Cards ────────────────── */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {verticals.map((v) => {
            const IconComponent = v.icon;
            return (
              <a
                key={v.id}
                href={v.link}
                className={styles.card}
                style={{
                  borderColor: v.borderColor,
                  boxShadow: `0 12px 36px -6px ${v.glowColor}, inset 0 1.5px 1px 0 rgba(255,255,255,0.55), inset 1.5px 0 1px 0 rgba(255,255,255,0.25), inset 0 -1.5px 1px 0 rgba(0,0,0,0.45), inset 0 0 24px 0 rgba(255,255,255,0.03)`,
                }}
                aria-label={`${v.title} - ${v.subtitle}: ${v.description}`}
              >
                {/* ── Plain Photography Layer (Right-aligned subject) ── */}
                <img
                  src={v.photo}
                  alt=""
                  className={styles.cardPhoto}
                  loading="lazy"
                />

                {/* ── Smooth Left-to-Right Translucent Gradient for Text Legibility ── */}
                <div className={styles.scrimGradient} />

                {/* ── Real Content Layout (Clean Typography & Icons) ── */}
                <div className={styles.contentWrapper}>
                  {/* Top: Real Icon Badge & Headings */}
                  <div>
                    {/* Glassmorphic Icon Badge */}
                    <div
                      className={styles.iconBadge}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        borderColor: v.badgeBorder,
                        boxShadow: `0 0 16px 2px ${v.badgeGlow}`,
                      }}
                    >
                      <IconComponent className={styles.iconSvg} style={{ color: v.accentColor }} />
                    </div>

                    {/* Headings */}
                    <div className={styles.headingsWrapper}>
                      <h3 className={styles.cardTitle}>
                        {v.title}
                      </h3>
                      <p
                        className={styles.cardSubtitle}
                        style={{ color: v.accentColor }}
                      >
                        {v.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className={styles.cardDescription}>
                      {v.description}
                    </p>
                  </div>

                  {/* Bottom: Real CTA Link & Corner Action Arrow */}
                  <div className={styles.cardBottom}>
                    <span
                      className={styles.ctaText}
                      style={{ color: v.accentColor }}
                    >
                      <span>{v.cta}</span>
                      <ArrowRight className={styles.ctaArrow} />
                    </span>

                    {/* Circular Corner Pill Button */}
                    <div className={styles.cornerPillBtn}>
                      <ChevronRight className={styles.chevronIcon} />
                    </div>
                  </div>
                </div>

                {/* ── Realistic Optical Glass Surface (Topmost Z-Index Layer) ── */}
                <RealisticGlassSurface accentGlow={v.glowColor} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
