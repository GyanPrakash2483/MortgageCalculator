'use client';

import React from 'react';
import { DollarSign, IndianRupee } from 'lucide-react';
import useCalculatorStore from '@/store/calculator';

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCalculatorStore();

  return (
    <div className="flex gap-2 p-1 border-3" style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-neon-purple)' }}>
      <button
        onClick={() => setCurrency('USD')}
        className={`
          flex items-center gap-2 px-3 py-2 font-bold text-xs uppercase tracking-wider
          transition-all duration-200 border-2
          ${currency === 'USD' ? 'text-white' : 'hover:-translate-x-0.5 hover:-translate-y-0.5'}
        `}
        style={
          currency === 'USD'
            ? {
                background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-purple))',
                borderColor: 'var(--color-neon-cyan)',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
                fontFamily: 'var(--font-display)',
              }
            : { 
                color: 'var(--color-neon-cyan)',
                borderColor: 'transparent',
                fontFamily: 'var(--font-display)',
              }
        }
      >
        <DollarSign className="w-4 h-4" />
        <span className="hidden sm:inline">USD</span>
      </button>
      <button
        onClick={() => setCurrency('INR')}
        className={`
          flex items-center gap-2 px-3 py-2 font-bold text-xs uppercase tracking-wider
          transition-all duration-200 border-2
          ${currency === 'INR' ? 'text-white' : 'hover:-translate-x-0.5 hover:-translate-y-0.5'}
        `}
        style={
          currency === 'INR'
            ? {
                background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-purple))',
                borderColor: 'var(--color-neon-cyan)',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
                fontFamily: 'var(--font-display)',
              }
            : { 
                color: 'var(--color-neon-cyan)',
                borderColor: 'transparent',
                fontFamily: 'var(--font-display)',
              }
        }
      >
        <IndianRupee className="w-4 h-4" />
        <span className="hidden sm:inline">INR</span>
      </button>
    </div>
  );
}
