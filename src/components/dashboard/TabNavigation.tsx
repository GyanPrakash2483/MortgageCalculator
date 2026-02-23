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
            flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-lg
            transition-all duration-200 whitespace-nowrap
            ${activeTab === tab.id 
              ? 'text-white' 
              : 'hover:-translate-y-0.5 text-gray-700 hover:bg-gray-100'
            }
          `}
          style={
            activeTab === tab.id
              ? {
                  background: 'linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple))',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  fontFamily: 'var(--font-sans)',
                }
              : {
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  fontFamily: 'var(--font-sans)',
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
