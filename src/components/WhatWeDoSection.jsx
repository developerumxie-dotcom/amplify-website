import React, { useState } from 'react';
import { ArrowRight, ChevronRight, X, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../data/websiteContent';
import RealisticGlassSurface from './RealisticGlassSurface';
import styles from './WhatWeDoSection.module.css';

/**
 * AMPLIFY DIGITAL — WHAT WE DO SECTION
 *
 * Pixel-accurate recreation of the approved asymmetric two-row Bento reference:
 * - Left Column:
 *   • Small purple pill: "OUR SERVICES"
 *   • Large heading: "What We Do" ("What We" in white, "Do" in radiant orange gradient)
 *   • Rich multi-tiered supporting description & capability highlights
 *   • Bottom-aligned radiant gradient "Explore More" button (in place of 01-05 slider)
 * - Right Column (Asymmetric 2-Row Bento Grid):
 *   • Top Row (2 wider cards):
 *     01 — Strategy & Brand (purple chess image)
 *     02 — Content & Production (orange camera image)
 *   • Bottom Row (3 cards):
 *     03 — Social & Influence (pink social media image)
 *     04 — Performance & Growth (orange growth chart image)
 *     05 — Digital Experiences & Events (purple VR headset image)
 * - Section 2 Architecture Applied to Every Card:
 *   • Clean, plain 3D artwork layer on the right (zero baked-in text)
 *   • Left-to-right dark gradient scrim for 100% crystal-clear typography legibility
 *   • Real semantic HTML typography (`<h3>`, `<p>`, number badge pill)
 *   • Specular top border sheen
 *   • Circular corner pill button with `ChevronRight`
 *   • Interactive deep-dive capability breakdown modal
 */

const bentoCards = [
  {
    id: '01',
    dataId: '01',
    title: 'Strategy & Brand',
    description: 'Build a powerful brand with purpose.',
    image: '/assets/bento-art-chess-hd.jpg',
    fallbackImage: '/assets/plain-art-chess.png',
    borderColor: 'rgba(168, 85, 247, 0.45)',
    glow: 'rgba(168, 85, 247, 0.35)',
    accentColor: '#A855F7',
    badgeBorder: 'rgba(168, 85, 247, 0.55)',
    badgeBg: 'rgba(168, 85, 247, 0.16)',
  },
  {
    id: '02',
    dataId: '02',
    title: 'Content & Production',
    description: 'Create unforgettable content.',
    image: '/assets/bento-art-camera-hd.jpg',
    fallbackImage: '/assets/plain-art-camera.png',
    borderColor: 'rgba(249, 115, 22, 0.45)',
    glow: 'rgba(249, 115, 22, 0.35)',
    accentColor: '#F97316',
    badgeBorder: 'rgba(249, 115, 22, 0.55)',
    badgeBg: 'rgba(249, 115, 22, 0.16)',
  },
  {
    id: '03',
    dataId: '03',
    title: 'Social & Influence',
    description: 'Grow your presence across platforms.',
    image: '/assets/bento-art-social-hd.jpg',
    fallbackImage: '/assets/plain-art-social.png',
    borderColor: 'rgba(236, 72, 153, 0.45)',
    glow: 'rgba(236, 72, 153, 0.35)',
    accentColor: '#EC4899',
    badgeBorder: 'rgba(236, 72, 153, 0.55)',
    badgeBg: 'rgba(236, 72, 153, 0.16)',
  },
  {
    id: '04',
    dataId: '04',
    title: 'Performance & Growth',
    description: 'Turn clicks into measurable growth.',
    image: '/assets/bento-art-chart-hd.jpg',
    fallbackImage: '/assets/plain-art-chart.png',
    borderColor: 'rgba(234, 179, 8, 0.45)',
    glow: 'rgba(234, 179, 8, 0.35)',
    accentColor: '#EAB308',
    badgeBorder: 'rgba(234, 179, 8, 0.55)',
    badgeBg: 'rgba(234, 179, 8, 0.16)',
  },
  {
    id: '05',
    dataId: '05',
    title: 'Digital Experiences & Events',
    description: 'Build immersive digital experiences.',
    image: '/assets/bento-art-vr-hd.jpg',
    fallbackImage: '/assets/plain-art-vr.png',
    borderColor: 'rgba(147, 51, 234, 0.45)',
    glow: 'rgba(147, 51, 234, 0.35)',
    accentColor: '#9333EA',
    badgeBorder: 'rgba(147, 51, 234, 0.55)',
    badgeBg: 'rgba(147, 51, 234, 0.16)',
  },
];

export default function WhatWeDoSection() {
  const [selectedService, setSelectedService] = useState(null);

  const handleCardClick = (card) => {
    const fullData = servicesData.find((s) => s.id === card.dataId);
    if (fullData) {
      setSelectedService(fullData);
    }
  };

  const renderCard = (card, isTopRow = false) => {
    return (
      <div
        key={card.id}
        onClick={() => handleCardClick(card)}
        className={`${styles.bentoCard} ${isTopRow ? styles.cardTopRow : styles.cardBottomRow}`}
        style={{
          borderColor: card.borderColor,
          boxShadow: `0 12px 36px -6px ${card.glow}, inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1.5px 1px 0 rgba(0, 0, 0, 0.45), inset 0 0 24px 0 rgba(255, 255, 255, 0.03)`,
        }}
        role="button"
        tabIndex={0}
        aria-label={`Card ${card.id} - ${card.title}: ${card.description}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(card);
          }
        }}
      >
        {/* ── Plain 3D Artwork Layer (Right-aligned subject) ── */}
        <img
          src={card.image}
          alt=""
          onError={(e) => {
            // Fallback gracefully to plain-art crop if HD is not yet loaded
            if (card.fallbackImage && e.currentTarget.src !== card.fallbackImage) {
              e.currentTarget.src = card.fallbackImage;
            }
          }}
          className={styles.cardArtwork}
          loading="lazy"
        />

        {/* ── Smooth Left-to-Right Translucent Gradient Scrim ── */}
        <div className={styles.cardScrim} />

        {/* ── Real Semantic HTML Content (Matching Section 2 Structure) ── */}
        <div className={styles.cardContent}>
          {/* Upper Content: Number Badge & Headings */}
          <div>
            {/* Number Badge Pill */}
            <div
              className={styles.numberBadge}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderColor: card.badgeBorder,
                color: card.accentColor,
                boxShadow: `0 0 14px -2px ${card.glow}`,
              }}
            >
              {card.id}
            </div>

            {/* Title & Description */}
            <div className={styles.cardTextWrapper}>
              <h3 className={styles.cardTitle}>
                {card.title}
              </h3>
              <p className={styles.cardDesc}>
                {card.description}
              </p>
            </div>
          </div>

          {/* Bottom: Circular Corner Action Arrow */}
          <div className={styles.cardActionCorner}>
            <div className={styles.cornerPill}>
              <ChevronRight className={styles.cornerChevron} />
            </div>
          </div>
        </div>

        {/* ── Realistic Optical Glass Surface (Topmost Z-Index Layer) ── */}
        <RealisticGlassSurface accentGlow={card.glow} />
      </div>
    );
  };

  return (
    <section id="services" className={styles.servicesSection}>

      <div className={styles.container}>
        <div className={styles.mainGrid}>

          {/* ── Left Column: Header, Copy, Highlights & Bottom CTA ────────── */}
          <div className={styles.leftCol}>

            {/* Top Header Group */}
            <div className={styles.headerGroup}>
              {/* Small purple pill: "OUR SERVICES" */}
              <div className={styles.servicePill}>
                <span className={styles.servicePillText}>
                  OUR SERVICES
                </span>
              </div>

              {/* Large heading: "What We Do" */}
              <h2 className={styles.sectionHeading}>
                What We{' '}
                <span className={styles.headingGradient}>
                  Do
                </span>
              </h2>

              {/* Primary supporting description */}
              <p className={styles.primaryDescription}>
                A complete suite of creative, marketing and technology services to help your brand grow, engage and lead.
              </p>

              {/* Extended agency capability copy */}
              <p className={styles.extendedDescription}>
                Combining high-velocity creative production, data-driven performance marketing, and cutting-edge digital experiences into one cohesive engine built to scale ambitious brands.
              </p>
            </div>

            {/* Bottom Group: "Explore More" Button */}
            <div className={styles.bottomCtaWrapper}>
              <a
                href="#contact"
                className={`glass-btn-luminous ${styles.exploreBtn}`}
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className={styles.btnRefractCut} />
                
                {/* Diagonal Ambient Studio Glare */}
                <span className={styles.btnGlare} />

                <span>Explore More</span>
                <ArrowRight className={styles.exploreArrowIcon} />
              </a>
            </div>

          </div>

          {/* ── Right Column: Asymmetric Five-Card Bento Layout (Bigger & Fitted) ── */}
          <div className={styles.rightCol}>

            {/* Top Row: 2 Wider Cards */}
            <div className={styles.topRowGrid}>
              {renderCard(bentoCards[0], true)}
              {renderCard(bentoCards[1], true)}
            </div>

            {/* Bottom Row: 3 Cards */}
            <div className={styles.bottomRowGrid}>
              {renderCard(bentoCards[2], false)}
              {renderCard(bentoCards[3], false)}
              {renderCard(bentoCards[4], false)}
            </div>

          </div>

        </div>
      </div>

      {/* ── Interactive Deep-Dive Capability Breakdown Modal ──────────── */}
      {selectedService && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedService(null)}
        >
          <div
            className={styles.modalDialog}
            style={{ borderColor: selectedService.borderColor }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className={styles.modalCloseBtn}
              aria-label="Close dialog"
            >
              <X className={styles.modalCloseIcon} />
            </button>

            {/* Header */}
            <div className={styles.modalHeaderRow}>
              <span className={styles.modalIdPill}>
                {selectedService.id}
              </span>
              <span
                className={styles.modalSubtitle}
                style={{ color: selectedService.accentColor }}
              >
                Full Capability Breakdown
              </span>
            </div>

            <h3 className={styles.modalTitle}>
              {selectedService.title}
            </h3>

            <p className={styles.modalSummary}>
              {selectedService.detailedSummary}
            </p>

            {/* Itemized Capabilities */}
            <div className={styles.capabilitiesSection}>
              <h4 className={styles.capabilitiesHeading}>
                Included Offerings & Deliverables
              </h4>
              <div className={styles.offeringsGrid}>
                {selectedService.offerings.map((item, idx) => (
                  <div
                    key={idx}
                    className={styles.offeringItem}
                  >
                    <div className={styles.offeringContent}>
                      <CheckCircle2
                        className={styles.checkIcon}
                        style={{ color: selectedService.accentColor }}
                      />
                      <div>
                        <div className={styles.offeringName}>
                          {item.name}
                        </div>
                        <div className={styles.offeringDesc}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className={styles.modalFooter}>
              <span className={styles.modalFooterText}>
                Ready to amplify this capability for your brand?
              </span>
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className={`btn-gradient-primary ${styles.modalCtaBtn}`}
              >
                <span>Discuss {selectedService.title}</span>
                <ArrowRight className={styles.modalCtaIcon} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
