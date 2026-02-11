'use client';

import React from 'react';
import { DollarSign, IndianRupee } from 'lucide-react';
import useCalculatorStore from '@/store/calculator';

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCalculatorStore();

  return (
    <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--color-bg-secondary)' }}>
      <button
        onClick={() => setCurrency('USD')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          currency === 'USD' ? 'text-white' : ''
        }`}
        style={
          currency === 'USD'
            ? {
                background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue))',
              }
            : { color: 'var(--color-text-secondary)' }
        }
      >
        <DollarSign className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">USD</span>
      </button>
      <button
        onClick={() => setCurrency('INR')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          currency === 'INR' ? 'text-white' : ''
        }`}
        style={
          currency === 'INR'
            ? {
                background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue))',
              }
            : { color: 'var(--color-text-secondary)' }
        }
      >
        <IndianRupee className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">INR</span>
      </button>
    </div>
  );
}
