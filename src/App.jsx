import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BusinessVerticals from './components/BusinessVerticals';
import ClientLogoBar from './components/ClientLogoBar';
import WhatWeDoSection from './components/WhatWeDoSection';
import ImpactSection from './components/ImpactSection';
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
          <HeroSection />
          <BusinessVerticals />
          <ClientLogoBar />
          <WhatWeDoSection />
          <ImpactSection />
          <CtaBanner />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
