'use client';

import React from 'react';
import { Calculator, Home as HomeIcon, Calendar } from 'lucide-react';
import useCalculatorStore, { CalculatorTab } from '@/store/calculator';

const tabs: { id: CalculatorTab; label: string; icon: React.ReactNode }[] = [
  { id: 'mortgage', label: 'Mortgage', icon: <HomeIcon className="w-5 h-5" /> },
  { id: 'rent', label: 'Rent', icon: <Calculator className="w-5 h-5" /> },
  { id: 'prorated_rent', label: 'Prorated Rent', icon: <Calendar className="w-5 h-5" /> },
];

export default function TabNavigation() {
  const { activeTab, setActiveTab } = useCalculatorStore();

  return (
    <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider
            transition-all duration-200 whitespace-nowrap border-3
            ${activeTab === tab.id 
              ? 'text-white shadow-[4px_4px_0_rgba(0,0,0,0.8)]' 
              : 'hover:-translate-x-1 hover:-translate-y-1 shadow-[2px_2px_0_rgba(0,0,0,0.5)]'
            }
          `}
          style={
            activeTab === tab.id
              ? {
                  background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-purple))',
                  borderColor: 'var(--color-neon-cyan)',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.6), 4px 4px 0 rgba(0, 0, 0, 0.8)',
                  fontFamily: 'var(--font-display)',
                }
              : {
                  background: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-neon-purple)',
                  color: 'var(--color-neon-cyan)',
                  fontFamily: 'var(--font-display)',
                }
          }
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
