import React from 'react';
import { ArrowRight, Rocket, Award, Users } from 'lucide-react';
import RealisticGlassSurface from './RealisticGlassSurface';
import { useContactModal } from '../features/contact/context/ContactContext';
import { getAssetUrl } from '../utils/assetUrl';
import styles from './ImpactSection.module.css';

export default function ImpactSection() {
  const { openContactModal } = useContactModal();
  return (
    <section id="about" className={styles.impactSection}>
      <div className={styles.container}>
        
        {/* Section Tag Pill Outside on Top of the Card */}
        <div className={styles.tagWrap}>
          <div className={styles.tagPill}>
            <span className={styles.tagPillText}>
              OUR IMPACT
            </span>
          </div>
        </div>

        <div className={styles.chassis}>
          
          {/* Specular Top Border Sheen */}
          <div className={styles.topSheen} />

          {/* Left Edge Specular Refraction */}
          <div className={styles.leftEdgeRefract} />

          {/* Diagonal Glass Glare */}
          <div className={styles.diagonalGlare} />

          {/* Micro-Frosted Silica Grain */}
          <div className={styles.silicaGrain} />

          {/* Right Skyline Artwork (Panoramic glowing futuristic digital metropolis) */}
          <div className={styles.skylineArtwork}>
            <img
              src={getAssetUrl('assets/impact-bg-hd.jpg')}
              alt="Futuristic Digital Metropolis"
              className={styles.skylineImg}
              loading="lazy"
            />
            {/* Blending Gradients to melt seamlessly into card background */}
            <div className={styles.skylineBlendHoriz} />
            <div className={styles.skylineBlendVert} />
          </div>

          <div className={styles.contentGrid}>
            
            {/* Left Content Column */}
            <div className={styles.leftCol}>
              {/* Heading */}
              <h2 className={styles.heading}>
                Ideas. Strategy. <br />
                <span className={styles.headingGradient}>
                  Real Results.
                </span>
              </h2>

              {/* Subtext with Authentic Agency Story from Live Site */}
              <p className={styles.storyCopy}>
                With over 3+ years of invaluable market experience, we combine cutting-edge technology with honesty and transparency to propel brands from local businesses to industry leaders.
              </p>

              {/* Button */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  openContactModal({ source: 'Impact — Partner With Us', intent: 'partnership' });
                }}
                className={`glass-btn-luminous ${styles.partnerBtn}`}
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className={styles.btnSpecularCut} />
                
                {/* Diagonal Ambient Studio Glare */}
                <span className={styles.btnGlare} />

                <span className={styles.partnerBtnText}>Partner With Us</span>
                <ArrowRight className={styles.partnerArrowIcon} />
              </a>
            </div>

            {/* Middle Stats Columns — Populated with Verified Live Metrics */}
            <div className={styles.statsGrid}>
              
              {/* Stat 1: 320+ Campaigns */}
              <div
                className={styles.statCard}
                style={{
                  borderColor: 'rgba(255, 122, 0, 0.40)',
                  boxShadow: '0 10px 32px -8px rgba(255, 122, 0, 0.35), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1.5px 1px 0 rgba(0, 0, 0, 0.45), inset 0 0 20px 0 rgba(255, 255, 255, 0.03)',
                }}
              >
                <div className={styles.statIconWrap}>
                  <div
                    className={styles.statIconCircle}
                    style={{
                      backgroundColor: 'rgba(255, 122, 0, 0.20)',
                      color: '#FF7A00',
                      borderColor: 'rgba(255, 122, 0, 0.40)',
                    }}
                  >
                    <Rocket className={styles.statIconSvg} />
                  </div>
                </div>

                <div className={styles.statBody}>
                  <div className={`${styles.statNumber} text-gradient-orange-purple`}>
                    320+
                  </div>
                  <div className={styles.statTitle}>
                    Campaigns Delivered
                  </div>
                  <p className={styles.statDesc}>
                    Across retail, tech & commercial sectors
                  </p>
                </div>

                <div
                  className={styles.statBottomGlow}
                  style={{ background: 'linear-gradient(to top, rgba(255, 122, 0, 0.20) 0%, transparent 100%)' }}
                />
                <RealisticGlassSurface accentGlow="rgba(255, 122, 0, 0.35)" />
              </div>

              {/* Stat 2: 250+ Business Partners */}
              <div
                className={styles.statCard}
                style={{
                  borderColor: 'rgba(168, 85, 247, 0.40)',
                  boxShadow: '0 10px 32px -8px rgba(168, 85, 247, 0.35), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1.5px 1px 0 rgba(0, 0, 0, 0.45), inset 0 0 20px 0 rgba(255, 255, 255, 0.03)',
                }}
              >
                <div className={styles.statIconWrap}>
                  <div
                    className={styles.statIconCircle}
                    style={{
                      backgroundColor: 'rgba(168, 85, 247, 0.20)',
                      color: '#C77DFF',
                      borderColor: 'rgba(168, 85, 247, 0.40)',
                    }}
                  >
                    <Users className={styles.statIconSvg} />
                  </div>
                </div>

                <div className={styles.statBody}>
                  <div className={`${styles.statNumber} text-gradient-orange-purple`}>
                    250+
                  </div>
                  <div className={styles.statTitle}>
                    Business Partners
                  </div>
                  <p className={styles.statDesc}>
                    Startups to national enterprise brands
                  </p>
                </div>

                <div
                  className={styles.statBottomGlow}
                  style={{ background: 'linear-gradient(to top, rgba(168, 85, 247, 0.20) 0%, transparent 100%)' }}
                />
                <RealisticGlassSurface accentGlow="rgba(168, 85, 247, 0.35)" />
              </div>

              {/* Stat 3: 3+ Years of Excellence */}
              <div
                className={styles.statCard}
                style={{
                  borderColor: 'rgba(224, 38, 150, 0.40)',
                  boxShadow: '0 10px 32px -8px rgba(224, 38, 150, 0.35), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 1.5px 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1.5px 1px 0 rgba(0, 0, 0, 0.45), inset 0 0 20px 0 rgba(255, 255, 255, 0.03)',
                }}
              >
                <div className={styles.statIconWrap}>
                  <div
                    className={styles.statIconCircle}
                    style={{
                      backgroundColor: 'rgba(224, 38, 150, 0.20)',
                      color: '#FF5DA2',
                      borderColor: 'rgba(224, 38, 150, 0.40)',
                    }}
                  >
                    <Award className={styles.statIconSvg} />
                  </div>
                </div>

                <div className={styles.statBody}>
                  <div className={`${styles.statNumber} text-gradient-orange-purple`}>
                    3+
                  </div>
                  <div className={styles.statTitle}>
                    Years Market Experience
                  </div>
                  <p className={styles.statDesc}>
                    Proven track record of digital excellence
                  </p>
                </div>

                <div
                  className={styles.statBottomGlow}
                  style={{ background: 'linear-gradient(to top, rgba(224, 38, 150, 0.20) 0%, transparent 100%)' }}
                />
                <RealisticGlassSurface accentGlow="rgba(224, 38, 150, 0.35)" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
