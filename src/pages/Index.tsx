
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import UpcomingMatches from '../components/UpcomingMatches';
import ValueProposition from '../components/ValueProposition';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-black overflow-hidden">
      <Header />
      <main>
        <HeroSection />
        <UpcomingMatches />
        <ValueProposition />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
