import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ContinuousNeonBackground from './components/ContinuousNeonBackground';
import BusinessVerticals from './components/BusinessVerticals';
import ClientLogoBar from './components/ClientLogoBar';
import WhatWeDoSection from './components/WhatWeDoSection';
import WorkPortfolioSection from './components/WorkPortfolioSection';
import ImpactSection from './components/ImpactSection';
import TestimonialsSection from './components/TestimonialsSection';
import BriefBlueprintSection from './components/BriefBlueprintSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import AmplifyAI from './features/amplify-ai/AmplifyAI';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      {/* Background Cosmic Starfield / Light Gradients for Hero */}
      <div className={styles.cosmicBackground}>
        <div className={styles.heroGlowRadial} />
      </div>

      {/* Main Page Layout Sections — Seamless Single One-Page Continuous Canvas */}
      <div className={styles.layoutContent}>
        <Navbar />

        {/* ── Single Unified Continuous Canvas (Zero Cut Lines, True One-Page Flow) ── */}
        <main className={styles.mainCanvas}>
          <ContinuousNeonBackground />

          <div className={styles.sectionsStack}>
            <HeroSection />
            <BusinessVerticals />
            <ClientLogoBar />
            <WhatWeDoSection />
            <WorkPortfolioSection />
            <ImpactSection />
            <TestimonialsSection />
            <BriefBlueprintSection />
            <CtaBanner />
            <Footer />
          </div>
        </main>
      </div>

      {/* AMPLIFY AI — 3D Interactive Virtual Assistant */}
      <AmplifyAI />
    </div>
  );
}

export default App;
