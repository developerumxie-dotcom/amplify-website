import React from 'react';
import { Quote, Star, CheckCircle2 } from 'lucide-react';
import { testimonials } from '../data/websiteContent';
import RealisticGlassSurface from './RealisticGlassSurface';
import styles from './TestimonialsSection.module.css';

const testimonialConfig = [
  {
    id: 'salekart',
    accentColor: '#FF7A00',
    borderColor: 'rgba(255, 122, 0, 0.45)',
    glowColor: 'rgba(255, 122, 0, 0.35)',
    badgeBg: 'rgba(255, 122, 0, 0.15)',
    gradient: 'linear-gradient(135deg, #FF7A00 0%, #E11D48 100%)',
  },
  {
    id: 'revolt',
    accentColor: '#A855F7',
    borderColor: 'rgba(168, 85, 247, 0.45)',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
  },
  {
    id: 'uspa',
    accentColor: '#E02696',
    borderColor: 'rgba(224, 38, 150, 0.45)',
    glowColor: 'rgba(224, 38, 150, 0.35)',
    badgeBg: 'rgba(224, 38, 150, 0.15)',
    gradient: 'linear-gradient(135deg, #E02696 0%, #FF7A00 100%)',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="insights" className={styles.testimonialsSection}>

      <div className={styles.container}>

        {/* ── Section Header Row (Harmonized Left Alignment) ────────── */}
        <div className={styles.headerCol}>
          {/* Section Tag Pill matching exact site model */}
          <div className={styles.tagPill}>
            <span className={styles.tagPillText}>
              CLIENT TESTIMONIALS
            </span>
          </div>

          <h2 className={styles.heading}>
            What Leading Brands{' '}
            <span className={styles.headingGradient}>
              Say About Us
            </span>
          </h2>

          <p className={styles.subtitle}>
            Real feedback from marketing leaders and executives who scaled their businesses with Amplify.
          </p>
        </div>

        {/* ── 3 Authentic Testimonials Grid with Glassmorphism ──────── */}
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, idx) => {
            const config = testimonialConfig[idx] || testimonialConfig[0];

            return (
              <div
                key={t.id}
                className={styles.testimonialCard}
                style={{
                  borderColor: config.borderColor,
                  boxShadow: `0 14px 40px -8px ${config.glowColor}, inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1.5px 1px 0 rgba(0, 0, 0, 0.45), inset 0 0 24px 0 rgba(255, 255, 255, 0.03)`,
                }}
              >

                {/* Hover Inner Glow Rim */}
                <div
                  className={styles.hoverInnerGlowRim}
                  style={{ boxShadow: `inset 0 0 28px ${config.glowColor}` }}
                />

                {/* Card Top: Glowing Quote Badge & 5 Stars */}
                <div className={styles.cardTopRow}>
                  <div className={styles.topRowFlex}>
                    {/* Glassmorphic Quote Badge */}
                    <div
                      className={styles.quoteBadge}
                      style={{
                        backgroundColor: config.badgeBg,
                        borderColor: config.borderColor,
                        boxShadow: `0 0 16px -2px ${config.glowColor}`,
                      }}
                    >
                      <Quote className={styles.quoteIcon} style={{ color: config.accentColor }} />
                    </div>

                    {/* 5 Stars Rating Pill */}
                    <div className={styles.starsPill}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={styles.starSvg} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Body: Highlight Tag & Authentic Quote */}
                <div className={styles.cardBody}>
                  {/* Scope / Highlight Pill */}
                  <div className={styles.highlightPillWrap}>
                    <span
                      className={styles.highlightPill}
                      style={{
                        color: config.accentColor,
                        borderColor: `${config.accentColor}35`,
                        backgroundColor: `${config.accentColor}12`
                      }}
                    >
                      {t.highlight}
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p className={styles.quoteText}>
                    "{t.quote}"
                  </p>
                </div>

                {/* Card Footer: Verified Author Attribution */}
                <div
                  className={styles.cardFooterRow}
                  style={{ borderColor: `${config.accentColor}25` }}
                >
                  {/* Initials Avatar */}
                  <div
                    className={styles.avatar}
                    style={{ background: config.gradient }}
                  >
                    {t.initials}
                  </div>

                  <div className={styles.authorMeta}>
                    <div className={styles.authorNameRow}>
                      <span className={styles.authorName}>
                        {t.author}
                      </span>
                      <CheckCircle2 className={styles.checkIcon} />
                    </div>
                    <div className={styles.authorRole} style={{ color: config.accentColor }}>
                      {t.role}
                    </div>
                    <div className={styles.authorCompany}>
                      {t.company}
                    </div>
                  </div>
                </div>

                {/* ── Realistic Optical Glass Surface (Topmost Z-Index Layer) ── */}
                <RealisticGlassSurface accentGlow={config.glowColor} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
