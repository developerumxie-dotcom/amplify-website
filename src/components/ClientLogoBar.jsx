import React from 'react';
import { ChevronRight } from 'lucide-react';
import RealisticGlassSurface from './RealisticGlassSurface';
import styles from './ClientLogoBar.module.css';

export default function ClientLogoBar() {
  return (
    <section className={styles.logoBarSection}>
      <div className={styles.container}>
        <div className={styles.glassCapsule}>
          {/* Left Label */}
          <div className={styles.leftLabel}>
            <div className={styles.labelTextCol}>
              <span className={styles.labelTop}>Trusted by</span>
              <span className={styles.labelBottom}>leading brands</span>
            </div>
          </div>

          {/* Authentic Client Logos Row */}
          <div className={styles.logosRow}>
            
            {/* 1. Amazon */}
            <div className={`${styles.logoItem} ${styles.logoAmazon}`}>
              <span className={styles.amazonText}>
                amazon
              </span>
            </div>

            {/* 2. Myntra */}
            <div className={`${styles.logoItem} ${styles.logoBright}`}>
              <img 
                src="./assets/clients/logo_client_1.png" 
                alt="Myntra" 
                className={styles.logoImgWhiteBg}
              />
            </div>

            {/* 3. U.S. POLO ASSN. */}
            <div className={`${styles.logoItem} ${styles.logoBright}`}>
              <img 
                src="./assets/clients/logo_client_3.png" 
                alt="U.S. POLO ASSN." 
                className={styles.logoImgLargeWhiteBg}
              />
            </div>

            {/* 4. Swiggy */}
            <div className={`${styles.logoItem} ${styles.logoBright}`}>
              <img 
                src="./assets/clients/logo_client_4.png" 
                alt="Swiggy" 
                className={styles.logoImgSwiggy}
              />
            </div>

            {/* 5. Peter England */}
            <div className={styles.logoItem}>
              <span className={styles.peterEnglandText}>
                PETER ENGLAND
              </span>
            </div>

            {/* 6. Aadona Networks */}
            <div className={`${styles.logoItem} ${styles.logoBright}`}>
              <img 
                src="./assets/clients/logo_client_6_aadona.png" 
                alt="Aadona Networks" 
                className={styles.logoImgWhiteBg}
              />
            </div>

            {/* 7. The SaleKart */}
            <div className={`${styles.logoItem} ${styles.logoBright}`}>
              <img 
                src="./assets/clients/logo_client_7.png" 
                alt="The SaleKart" 
                className={styles.logoImgWhiteBg}
              />
            </div>

            {/* 8. The Blue Lane */}
            <div className={`${styles.logoItem} ${styles.logoBright}`}>
              <img 
                src="./assets/clients/logo_client_8_bl.png" 
                alt="The Blue Lane Designs" 
                className={styles.logoImgPaddedWhiteBg}
              />
            </div>

          </div>

          {/* Right Chevron */}
          <div className={styles.rightChevronCol}>
            <ChevronRight className={styles.chevronIcon} />
          </div>

          {/* ── Realistic Optical Glass Surface (Topmost Z-Index Layer) ── */}
          <RealisticGlassSurface />
        </div>
      </div>
    </section>
  );
}
