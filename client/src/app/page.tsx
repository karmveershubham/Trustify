'use client';

import React, { useState, useRef } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import FaqSection from '../components/faq/FaqSection';
import FeatureCards from '../components/features/FeatureCards';
import FeatureDetails from '../components/features/FeatureDetails';
import DownloadApp from '@/components/downloadapp/DownloadApp';

export default function Home() {
  const [isLoaded] = useState(true); // No useEffect

  // Refs for sections
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to a section
  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
        about: aboutRef,
        features: featuresRef,
        faq: faqRef,
      };
      
      const ref = sectionRefs[sectionId];
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Delay to ensure DOM is fully loaded
  };

  return (
    <main className="min-h-screen flex flex-col bg-amber-50">
      <Header />
      <HeroSection />
      
      <div id="features" ref={featuresRef}>
        <FeatureCards />
        {/* <FeatureDetails /> */}
      </div>
      
      <div id="about" ref={aboutRef}>
        <AboutSection />
      </div>

      <div id="downloadapp">
        <DownloadApp />  
      </div>  

      <div id="faq" ref={faqRef}>
        <FaqSection />
      </div>
      
      <Footer />
    </main>
  );
}
