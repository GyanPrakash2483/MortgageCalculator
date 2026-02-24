'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import LandingNav from '@/components/landing/LandingNav';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/dashboard/Footer';

function LandingContent() {
  return (
    <div className="min-h-screen relative" style={{ zIndex: 2 }}>
      <LandingNav />
      <div className="pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <SessionProvider>
      <LandingContent />
    </SessionProvider>
  );
}
