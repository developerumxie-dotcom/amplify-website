import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 75;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - (sectionId === 'home' ? 0 : navOffset);
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${sectionId}`);
      }
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolledHeader : ''}`}>
      {/* Seamless Faded Glass Blur Backdrop (No borders, feather-soft vertical gradient fade) */}
      <div className={`${styles.backdropFaded} ${scrolled ? styles.backdropVisible : ''}`} />

      <div className={styles.container}>
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, 'home')} 
          className={styles.brand}
          aria-label="Amplify Digital Home"
        >
          <img 
            src="/assets/amplify-logo-dark.png" 
            alt="Amplify Digital" 
            className={styles.brandFullLogo}
          />
        </a>

        {/* Center Floating Glass Capsule Navigation */}
        <nav className={`${styles.navCapsule} ${scrolled ? styles.scrolledNavCapsule : ''}`}>
          {/* Specular Top Cut-Glass Refraction Line */}
          <div className={styles.topSheen} />
          
          {/* Diagonal Glass Glare */}
          <div className={styles.diagonalGlare} />

          {/* Navigation Links with Smooth Movement */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')} 
            className={styles.navItemLink}
          >
            Home
          </a>

          <a 
            href="#services" 
            onClick={(e) => scrollToSection(e, 'services')} 
            className={styles.navItemLink}
          >
            What We Do
          </a>

          <a 
            href="#work" 
            onClick={(e) => scrollToSection(e, 'work')} 
            className={styles.navItemLink}
          >
            Work
          </a>

          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')} 
            className={styles.navItemLink}
          >
            About
          </a>

          <a 
            href="#insights" 
            onClick={(e) => scrollToSection(e, 'insights')} 
            className={styles.navItemLink}
          >
            Insights
          </a>
        </nav>

        {/* Right CTA Button: Let's Talk */}
        <div className={styles.ctaWrap}>
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, 'contact')} 
            className={`glass-btn-clear ${styles.letstalkBtn}`}
          >
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
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')}
            className={styles.mobileLink}
          >
            Home
          </a>
          <a 
            href="#services" 
            onClick={(e) => scrollToSection(e, 'services')}
            className={styles.mobileLink}
          >
            What We Do
          </a>
          <a 
            href="#work" 
            onClick={(e) => scrollToSection(e, 'work')}
            className={styles.mobileLink}
          >
            Work
          </a>
          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')}
            className={styles.mobileLink}
          >
            About
          </a>
          <a 
            href="#insights" 
            onClick={(e) => scrollToSection(e, 'insights')}
            className={styles.mobileLink}
          >
            Insights
          </a>
          <div className={styles.mobileCtaRow}>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
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
