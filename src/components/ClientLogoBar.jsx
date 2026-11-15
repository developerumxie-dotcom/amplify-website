import React from 'react';
import { clientLogos } from '../data/websiteContent';
import { getAssetUrl } from '../utils/assetUrl';
import styles from './ClientLogoBar.module.css';

/**
 * AMPLIFY DIGITAL — "TRUSTED BY LEADING BRANDS" MARQUEE SECTION
 * Re-imagined in sleek, borderless, Linear & Apple inspired dark obsidian aesthetic (#03020A):
 * - Micro-label: Centered "TRUSTED BY OVER 50+ LEADING BRANDS" with letter-spacing tracking
 * - Borderless infinite kinetic marquee of partner logos
 * - Dual edge dissolves (smooth gradient fade to deep obsidian on left & right)
 * - Uniform frosted silver-white monochrome styling at 70% opacity with hover glow
 * - Moving automatically on mobile and desktop without interruption
 */
export default function ClientLogoBar() {
  // Duplicate logos for seamless infinite CSS scroll loop (-50%)
  const marqueeLogos = [...clientLogos, ...clientLogos];

  return (
    <section className={styles.marqueeSection} aria-label="Trusted by Leading Brands">
      {/* Centered Minimalist Micro-Label */}
      <div className={styles.labelContainer}>
        <span className={styles.microLabel}>
          Trusted by over 50+ leading brands
        </span>
      </div>

      {/* Borderless Infinite Horizontal Marquee Row with Soft Edge Fades */}
      <div className={styles.marqueeContainer}>
        {/* Left & Right Soft Dissolve Gradients */}
        <div className={styles.fadeLeft} aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />

        {/* Continuous Kinetic Marquee Track */}
        <div className={styles.marqueeTrack}>
          {marqueeLogos.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className={styles.logoItem}
              title={brand.name}
            >
              <img
                src={getAssetUrl(brand.logo)}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                className={styles.brandLogoImg}
                style={{
                  maxHeight: `${brand.height || 34}px`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
