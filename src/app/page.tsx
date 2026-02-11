'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/dashboard/Header';
import TabNavigation from '@/components/dashboard/TabNavigation';
import MortgageCalculator from '@/components/dashboard/MortgageCalculator';
import RentCalculator from '@/components/dashboard/RentCalculator';
import ProratedRentCalculator from '@/components/dashboard/ProratedRentCalculator';
import SavedCalculations from '@/components/dashboard/SavedCalculations';
import useCalculatorStore from '@/store/calculator';
import { motion } from 'framer-motion';

function HomeContent() {
  const { activeTab } = useCalculatorStore();

  return (
    <div
      className="min-h-screen p-4 sm:p-6 lg:p-8 relative"
      style={{ background: 'var(--color-bg-primary)', zIndex: 2 }}
    >
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--color-accent-cyan)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--color-accent-blue)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Header />
        <TabNavigation />

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'mortgage' && <MortgageCalculator />}
          {activeTab === 'rent' && <RentCalculator />}
          {activeTab === 'prorated_rent' && <ProratedRentCalculator />}
        </motion.div>

        <div className="mt-8">
          <SavedCalculations />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  );
}
