import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import ProjectsShowcase from '../components/sections/ProjectsShowcase';
import PhilosophySection from '../components/sections/PhilosophySection';
import FAQSection from '../components/sections/FAQSection';
import TeamSection from '../components/sections/TeamSection';
import FinalCTASection from '../components/sections/FinalCTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsShowcase />
      <PhilosophySection />
      <TeamSection />
      <FinalCTASection />
      <FAQSection />
    </>
  );
}
