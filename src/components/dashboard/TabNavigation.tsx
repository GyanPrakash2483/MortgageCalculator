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
    <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
            activeTab === tab.id ? 'text-white' : ''
          }`}
          style={
            activeTab === tab.id
              ? {
                  background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue))',
                  boxShadow: 'var(--shadow-glow-blue)',
                }
              : {
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
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
