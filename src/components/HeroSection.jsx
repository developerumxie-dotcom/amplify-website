import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import HeroBirdVisual from './HeroBirdVisual';
import styles from './HeroSection.module.css';

/**
 * AMPLIFY DIGITAL — HERO SECTION
 *
 * Sized and tuned with comfortable breathing room, scaled headline,
 * generous action buttons, and pixel-accurate reference lighting trails.
 */

export default function HeroSection() {
  return (
    <section id="home" className={styles.heroSection}>

      {/* ── Background Atmospheric Volumetric Nebulae ─────────────────── */}
      <div className={styles.atmosphereNebulae}>
        {/* Deep indigo/violet glow around bird */}
        <div className={styles.glowBirdViolet} />

        {/* Violet upper-right illumination */}
        <div className={styles.glowUpperRight} />

        {/* Warm golden-orange lower-right illumination */}
        <div className={styles.glowLowerRight} />

        {/* Hot magenta bottom-center floor illumination */}
        <div className={styles.glowFloorMagenta} />

        {/* Dark navy subtle haze behind headline for clean contrast */}
        <div className={styles.glowHeadlineNavy} />
      </div>

      {/* ── Sparse Pinpoint Star Particles ────────────────────────────── */}
      <div className={styles.starField}>
        <span
          className={`${styles.starParticle} ${styles.star1}`}
          style={{ left: '50.3%', top: '26.4%' }}
        />
        <span
          className={`${styles.starParticle} ${styles.star2}`}
          style={{ left: '52.0%', top: '54.6%' }}
        />
        <span
          className={`${styles.starParticle} ${styles.star3}`}
          style={{ left: '71.1%', top: '20.2%' }}
        />
        <span
          className={`${styles.starParticle} ${styles.star4}`}
          style={{ left: '78.7%', top: '34.1%' }}
        />
        <span
          className={`${styles.starParticle} ${styles.star5}`}
          style={{ left: '87.4%', top: '50.6%' }}
        />
        <span
          className={`${styles.starParticle} ${styles.star6}`}
          style={{ left: '95.5%', top: '27.3%' }}
        />
      </div>

      {/* ── SVG Decorative Lighting Trails & Horizon Waves ────────────── */}
      <svg
        className={styles.svgTrails}
        viewBox="0 0 1024 454"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.80" />
            <stop offset="70%" stopColor="#A855F7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="bottomWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
            <stop offset="15%" stopColor="#9333EA" stopOpacity="0.85" />
            <stop offset="42%" stopColor="#EC4899" stopOpacity="0.92" />
            <stop offset="72%" stopColor="#FF7A00" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFA000" stopOpacity="0.85" />
          </linearGradient>

          <filter id="orbitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="waveGlow" x="-10%" y="-40%" width="120%" height="180%">
            <feGaussianBlur stdDeviation="3.0" result="blur1" />
            <feGaussianBlur stdDeviation="6.0" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cyanGlint" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sweeping Bottom Horizon Wave */}
        <path
          d="M 380,454 C 520,430 650,402 760,392 C 840,384 940,368 1024,386"
          fill="none"
          stroke="url(#bottomWaveGrad)"
          strokeWidth="2.2"
          filter="url(#waveGlow)"
        />
      </svg>

      {/* ── Main Hero Content Grid ────────────────────────────────────── */}
      <div className={styles.contentContainer}>
        <div className={styles.gridRow}>

          {/* Left Column: Headline, Copy & CTAs */}
          <div className={styles.leftCol}>

            {/* Tag Badge: Creative • Strategy • Growth */}
            <div className={`glass-pill ${styles.tagBadge}`}>
              <span className={styles.tagTopReflect} />
              <span className={styles.tagText}>
                Creative • Strategy • Growth
              </span>
            </div>

            {/* Main Headline */}
            <h1 className={styles.headline}>
              We Turn Ideas <br />
              Into <span className="text-gradient-impact">Impact.</span>
            </h1>

            {/* Supporting Copy */}
            <p className={styles.subCopy}>
              A 360° creative, digital and growth studio<br className={styles.breakInline} /> for ambitious brands and businesses.
            </p>

            {/* Action Buttons */}
            <div className={styles.actionsRow}>
              {/* Primary CTA: Explore Our Work */}
              <a
                href="#work"
                className={`glass-btn-luminous ${styles.btnPrimary}`}
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className={styles.btnSpecularCut} />

                {/* Diagonal Ambient Studio Glare */}
                <span className={styles.btnGlareLuminous} />

                <span className={styles.btnText}>Explore Our Work</span>
                <ArrowRight className={styles.btnIcon} />
              </a>

              {/* Secondary CTA: Book a Strategy Call with circle icon */}
              <a
                href="#contact"
                className={`glass-btn-clear ${styles.btnSecondary}`}
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className={styles.btnSpecularCutClear} />

                {/* Diagonal Ambient Studio Glare */}
                <span className={styles.btnGlareClear} />

                <span className={styles.btnText}>Book a Strategy Call</span>
                <span className={styles.secondaryDotIndicator} />
              </a>
            </div>

            {/* Mouse Scroll Indicator */}
            <div className={styles.scrollIndicator}>
              <div className={styles.scrollMouse}>
                <span className={styles.scrollDot} />
              </div>
              <span className={styles.scrollText}>Scroll to explore</span>
            </div>
          </div>

          {/* Right Column: 3D Origami Bird Sculpture */}
          <div className={styles.rightCol}>
            <HeroBirdVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
