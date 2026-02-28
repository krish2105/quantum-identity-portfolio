'use client';

import { useState } from 'react';
import SentientSplashScreen from '@/components/SentientSplashScreen';
import BackgroundCanvas from '@/components/BackgroundCanvas';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import JourneySection from '@/components/JourneySection';
import ContactFooterSection from '@/components/ContactFooterSection';

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <>
      {!isBooted && (
        <SentientSplashScreen onComplete={() => setIsBooted(true)} />
      )}

      {/* The background stays mounted behind everything */}
      <BackgroundCanvas />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col gap-12">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <ContactFooterSection />
      </div>
    </>
  );
}
