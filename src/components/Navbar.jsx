import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolledHeader : ''}`}>
      {/* Seamless Faded Glass Blur Backdrop (No borders, feather-soft vertical gradient fade) */}
      <div className={`${styles.backdropFaded} ${scrolled ? styles.backdropVisible : ''}`} />

      <div className={styles.container}>
        {/* Brand Logo - Scaled to match reference (38px x 38px) */}
        <a href="#" className={styles.brand}>
          <div className={styles.brandLogo}>
            <img 
              src="/assets/logo-bird.png" 
              alt="Amplify Digital Logo" 
              className={styles.logoImg}
            />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>
              AMPLIFY
            </span>
            <span className={styles.brandSub}>
              DIGITAL
            </span>
          </div>
        </a>

        {/* Center Floating Glass Capsule Navigation (394px wide, reference style) */}
        <nav className={`${styles.navCapsule} ${scrolled ? styles.scrolledNavCapsule : ''}`}>
          {/* Specular Top Cut-Glass Refraction Line */}
          <div className={styles.topSheen} />
          
          {/* Diagonal Glass Glare */}
          <div className={styles.diagonalGlare} />

          {/* What We Do with Dropdown */}
          <div 
            className={styles.navItemDropdownWrap}
            onMouseEnter={() => setActiveDropdown('what-we-do')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={styles.navItemBtn}>
              <span>What We Do</span>
              <ChevronDown className={`${styles.chevronIcon} ${activeDropdown === 'what-we-do' ? styles.chevronRotated : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {activeDropdown === 'what-we-do' && (
              <div className={styles.dropdownMenuLeft}>
                <a href="#services" className={styles.dropdownItem}>
                  <div className={styles.dropdownTitle}>Strategy & Brand</div>
                  <div className={styles.dropdownDesc}>Build a powerful brand with purpose</div>
                </a>
                <a href="#services" className={styles.dropdownItem}>
                  <div className={styles.dropdownTitle}>Content & Production</div>
                  <div className={styles.dropdownDesc}>Create unforgettable visual content</div>
                </a>
                <a href="#services" className={styles.dropdownItem}>
                  <div className={styles.dropdownTitle}>Social & Influence</div>
                  <div className={styles.dropdownDesc}>Grow audience presence across platforms</div>
                </a>
                <a href="#services" className={styles.dropdownItem}>
                  <div className={styles.dropdownTitle}>Performance & Growth</div>
                  <div className={styles.dropdownDesc}>Turn clicks into measurable growth</div>
                </a>
                <a href="#services" className={styles.dropdownItem}>
                  <div className={styles.dropdownTitle}>Digital Experiences</div>
                  <div className={styles.dropdownDesc}>Build immersive web apps & events</div>
                </a>
              </div>
            )}
          </div>

          <a href="#work" className={styles.navItemLink}>
            Work
          </a>

          <a href="#about" className={styles.navItemLink}>
            About
          </a>

          {/* Insights with Dropdown */}
          <div 
            className={styles.navItemDropdownWrap}
            onMouseEnter={() => setActiveDropdown('insights')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={styles.navItemBtn}>
              <span>Insights</span>
              <ChevronDown className={`${styles.chevronIcon} ${activeDropdown === 'insights' ? styles.chevronRotated : ''}`} />
            </button>

            {activeDropdown === 'insights' && (
              <div className={styles.dropdownMenuRight}>
                <a href="#insights" className={styles.dropdownItem}>
                  <div className={styles.dropdownTitle}>Industry Reports</div>
                  <div className={styles.dropdownDesc}>2026 Marketing & AI Benchmarks</div>
                </a>
                <a href="#insights" className={styles.dropdownItem}>
                  <div className={styles.dropdownTitle}>Case Studies</div>
                  <div className={styles.dropdownDesc}>Verified Client Growth Stories</div>
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Button: Let's Talk (Generous padding, clean border and arrow) */}
        <div className={styles.ctaWrap}>
          <a href="#contact" className={`glass-btn-clear ${styles.letstalkBtn}`}>
            {/* Specular Top Cut-Glass Refraction Line */}
            <span className={styles.btnTopSheen} />
            
            {/* Diagonal Ambient Studio Glare */}
            <span className={styles.btnGlare} />

            <span className={styles.btnText}>Let's Talk</span>
            <ArrowRight className={styles.btnArrow} />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileMenuBtn}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)}
            className={styles.mobileLink}
          >
            What We Do
          </a>
          <a 
            href="#work" 
            onClick={() => setMobileMenuOpen(false)}
            className={styles.mobileLink}
          >
            Work
          </a>
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className={styles.mobileLink}
          >
            About
          </a>
          <a 
            href="#insights" 
            onClick={() => setMobileMenuOpen(false)}
            className={styles.mobileLink}
          >
            Insights
          </a>
          <div className={styles.mobileCtaRow}>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={styles.mobileCtaBtn}
            >
              <span>Let's Talk</span>
              <ArrowRight className={styles.mobileCtaArrow} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
