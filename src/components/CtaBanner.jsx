import React, { useState, useRef } from 'react';
import { companyInfo } from '../data/websiteContent';
import RealisticGlassSurface from './RealisticGlassSurface';
import { getAssetUrl } from '../utils/assetUrl';
import styles from './CtaBanner.module.css';

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
    <section id="contact" className={styles.ctaSection}>

      <div className={styles.container}>
        
        {/* ── Wide Glassmorphism Banner Container ───────────────────── */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles.bannerCard}
          style={{
            boxShadow: isHovered
              ? '0 0 50px -5px rgba(255, 122, 0, 0.48), 0 0 35px -5px rgba(168, 85, 247, 0.38), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.60), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.30), inset 0 -1.5px 1px 0 rgba(0, 0, 0, 0.45), inset 0 0 28px 0 rgba(255, 255, 255, 0.04)'
              : '0 0 35px -5px rgba(255, 122, 0, 0.32), 0 0 25px -5px rgba(168, 85, 247, 0.25), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.50), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.35), inset 0 0 20px 0 rgba(255, 255, 255, 0.02)',
            transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovered ? 'scale(1.005)' : 'scale(1)'}`,
            transitionProperty: 'transform, box-shadow',
          }}
        >
          {/* Dual Glow Border (Violet on Top-Left, Fiery Orange on Bottom-Right) */}
          <div className={styles.dualGlowBorder} />

          {/* Top-Left Subtle Purple Atmosphere Glow */}
          <div className={styles.purpleGlowAtmosphere} />

          {/* Right Fiery Amber/Orange Atmosphere Glow */}
          <div className={styles.orangeGlowAtmosphere} />

          {/* Bird Atmospheric Radial Core Glow */}
          <div className={styles.birdCoreGlow} />

          {/* Neon Light Waves & Trails */}
          <div className={styles.neonTrailsSvgWrap}>
            <svg className={styles.neonSvg} viewBox="0 0 1200 130" fill="none" preserveAspectRatio="none">
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
          <div className={styles.birdWrap}>
            <img
              src={getAssetUrl('assets/cta-bird-isolated-hd.png')}
              alt=""
              className={styles.birdImg}
            />
          </div>

          {/* Interactive Mouse Spotlight Reflection Effect */}
          {isHovered && (
            <div
              className={styles.spotlightOverlay}
              style={{
                background: `radial-gradient(circle 380px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 130, 0, 0.14), rgba(168, 85, 247, 0.08) 50%, transparent 80%)`,
              }}
            />
          )}

          {/* ── Left Heading Block ──────────────────────────────────── */}
          <div className={styles.headingBlock}>
            <h2 className={styles.heading}>
              Have a vision? <br />
              Let's{' '}
              <span className={styles.headingGradient}>
                amplify it.
              </span>
            </h2>
          </div>

          {/* ── Center Action Button (Perfect Center-Right Placement) ── */}
          <div className={styles.actionWrapper}>
            <div className={styles.btnGroup}>
              {/* Luminous Orange Radial Halo Glow */}
              <div className={styles.orangeHaloGlow} />

              <a
                href={companyInfo.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-btn-luminous ${styles.strategyBtn}`}
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className={styles.btnCutSheen} />
                
                {/* Diagonal Ambient Studio Glare */}
                <span className={styles.btnGlare} />

                <span className={styles.btnText}>Book a Strategy Call</span>
                <span className={styles.btnArrow}>→</span>
              </a>
            </div>
          </div>

          {/* ── Realistic Optical Glass Surface (Topmost Z-Index Layer) ── */}
          <RealisticGlassSurface />
        </div>

      </div>
    </section>
  );
}
