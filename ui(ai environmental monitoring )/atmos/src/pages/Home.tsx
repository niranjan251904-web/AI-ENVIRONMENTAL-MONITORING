import React from 'react';
import HeroCanvas from '../components/HeroCanvas';
import GlobalImpactGlobe from '../components/GlobalImpactGlobe';
import AIMonitorSection from '../components/AIMonitorSection';
import SolutionsGrid from '../components/SolutionsGrid';
import FrameSequenceSection from '../components/FrameSequenceSection';
import PollutionTransformSection from '../components/PollutionTransformSection';
import LiveDataDashboard from '../components/LiveDataDashboard';
import ImpactStats from '../components/ImpactStats';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

const Home = () => {
  return (
    <div className="w-full">
      <HeroCanvas />
      <GlobalImpactGlobe />
      <AIMonitorSection />
      <SolutionsGrid />
      <FrameSequenceSection />
      <PollutionTransformSection />
      <LiveDataDashboard />
      <ImpactStats />
      <TestimonialsCarousel />
      <div className="h-screen bg-atmos-surface"></div>
    </div>
  );
};

export default Home;
