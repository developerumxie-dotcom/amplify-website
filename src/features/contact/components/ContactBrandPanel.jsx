import React from 'react';
import { getAssetUrl } from '../../../utils/assetUrl';
import styles from '../styles/ContactBrandPanel.module.css';

export default function ContactBrandPanel({ modalSource, modalIntent }) {
  const isStrategyCall = modalIntent === 'strategy-call' || modalSource.includes('Strategy Call');
  const kickerText = isStrategyCall ? 'BOOK A STRATEGY CALL' : "LET'S TALK";

  return (
    <div className={styles.panelContainer}>
      {/* Ambient Neon Atmosphere Behind Bird */}
      <div className={styles.ambientAtmosphere} />
      <div className={styles.ambientGlowOrange} />

      {/* Brand Header: Logo & Name */}
      <div className={styles.brandRow}>
        <img
          src={getAssetUrl('assets/logo-bird.png')}
          alt="Amplify Digital Logo"
          className={styles.birdLogoMark}
        />
        <div className={styles.brandNameBlock}>
          <span className={styles.brandNamePrimary}>AMPLIFY</span>
          <span className={styles.brandNameSecondary}>DIGITAL</span>
        </div>
      </div>

      {/* Typography Block */}
      <div className={styles.typographyBlock}>
        <div className={styles.kickerTag}>
          <span className={styles.kickerText}>{kickerText}</span>
        </div>

        <h2 className={styles.mainHeadline}>
          Let's Build <br />
          Something <br />
          <span className={styles.impactfulText}>Impactful.</span>
        </h2>

        <p className={styles.supportingCopy}>
          Share a few details and our team will get in touch to explore the right strategy for your brand.
        </p>
      </div>

      {/* Floating 3D Origami Brand Sculpture Artwork */}
      <div className={styles.artworkContainer}>
        <div className={styles.birdGlowHalo} />
        <img
          src={getAssetUrl('assets/contact-bird-render.jpg')}
          alt="Amplify Digital 3D Origami Bird"
          className={styles.sculptureImage}
          loading="eager"
        />
      </div>
    </div>
  );
}
