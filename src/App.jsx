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
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#03020A] text-slate-100 flex flex-col relative selection:bg-brand-orange selection:text-white">
      {/* Background Cosmic Starfield / Light Gradients for Hero */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[900px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(121,40,202,0.18),transparent)]" />
      </div>

      {/* Main Page Layout Sections — Seamless Single One-Page Continuous Canvas */}
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />

        {/* ── Single Unified Continuous Canvas (Zero Cut Lines, True One-Page Flow) ── */}
        <main className="relative w-full flex-1 overflow-hidden">
          <ContinuousNeonBackground />

          <div className="relative z-10">
            <HeroSection />
            <BusinessVerticals />
            <ClientLogoBar />
            <WhatWeDoSection />
            <WorkPortfolioSection />
            <ImpactSection />
            <TestimonialsSection />
            <CtaBanner />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
