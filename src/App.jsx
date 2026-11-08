import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
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
      {/* Background Cosmic Starfield / Light Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[900px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(121,40,202,0.18),transparent)]" />
        <div className="absolute top-[800px] right-0 w-[500px] h-[600px] bg-[radial-gradient(circle_at_100%_50%,rgba(255,122,0,0.08),transparent)]" />
        <div className="absolute top-[1800px] left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_0%_50%,rgba(224,38,150,0.09),transparent)]" />
      </div>

      {/* Main Page Layout Sections in Strict Reference Order */}
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <main className="flex-1">
          {/* Unified Continuous Atmosphere Wrapper for Hero + Business Verticals */}
          <div className="relative w-full overflow-hidden bg-[#03020A]">
            {/* Right-side continuous warm golden-orange gradient glow */}
            <div 
              className="absolute top-0 right-0 w-[45%] h-[85%] pointer-events-none z-0"
              style={{
                background: 'radial-gradient(ellipse 90% 70% at 100% 45%, rgba(255, 106, 0, 0.20) 0%, rgba(255, 80, 0, 0.10) 45%, rgba(225, 29, 72, 0.03) 70%, transparent 100%)',
              }}
            />
            {/* Volumetric glow centered across the hero-verticals transition */}
            <div className="absolute top-[38%] right-[0%] w-[520px] h-[440px] rounded-full bg-[#FF6A00]/18 blur-[120px] pointer-events-none z-0" />
            <div className="absolute top-[58%] right-[0%] w-[420px] h-[320px] rounded-full bg-[#FF7A00]/13 blur-[110px] pointer-events-none z-0" />

            {/* Seamless Bottom Fade: Smoothly dissolves the warm color into #03020A at the end of the second section */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[140px] pointer-events-none z-0"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(3, 2, 10, 0.6) 50%, #03020A 100%)',
              }}
            />

            <HeroSection />
            <BusinessVerticals />
          </div>

          <ClientLogoBar />
          <WhatWeDoSection />
          <WorkPortfolioSection />
          <ImpactSection />
          <TestimonialsSection />
          <CtaBanner />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
