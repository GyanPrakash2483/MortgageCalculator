'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Clock, Calculator, Home, Calendar as CalendarIcon, Upload } from 'lucide-react';
import { useSession } from 'next-auth/react';
import GlassCard from '@/components/ui/GlassCard';
import { formatCurrency } from '@/lib/formatters';
import { ICalculation } from '@/models/Calculation';
import { format } from 'date-fns';
import useCalculatorStore from '@/store/calculator';

export default function SavedCalculations() {
  const { data: session } = useSession();
  const { refreshTrigger, loadCalculation } = useCalculatorStore();
  const [calculations, setCalculations] = useState<ICalculation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchCalculations = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch('/api/calculations/list');
      if (response.ok) {
        const data = await response.json();
        setCalculations(data);
      }
    } catch (error) {
      console.error('Failed to fetch calculations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);

    try {
      const response = await fetch(`/api/calculations/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCalculations((prev) => prev.filter((calc) => calc._id.toString() !== id));
      }
    } catch (error) {
      console.error('Failed to delete calculation:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleLoad = (calc: ICalculation) => {
    setLoadingId(calc._id.toString());
    
    // Load the calculation into the store
    loadCalculation(calc.type as 'mortgage' | 'rent' | 'prorated_rent', calc.inputs, calc.currency);
    
    // Scroll to top to show the calculator
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Clear loading state after animation
    setTimeout(() => setLoadingId(null), 500);
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchCalculations();
    } else {
      setCalculations([]);
      setIsLoading(false);
    }
  }, [session, refreshTrigger, fetchCalculations]); // Re-fetch when refreshTrigger changes

  const getIcon = (type: string) => {
    switch (type) {
      case 'mortgage':
        return <Home className="w-5 h-5" />;
      case 'rent':
        return <Calculator className="w-5 h-5" />;
      case 'prorated_rent':
        return <CalendarIcon className="w-5 h-5" />;
      default:
        return <Calculator className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'mortgage':
        return 'Mortgage';
      case 'rent':
        return 'Rent';
      case 'prorated_rent':
        return 'Prorated Rent';
      default:
        return type;
    }
  };

  // Don't show section at all if not logged in
  if (!session?.user?.id) {
    return null;
  }

  if (isLoading) {
    return (
      <GlassCard>
        <div className="text-center py-12">
          <p style={{ color: 'var(--color-text-secondary)' }}>Loading saved calculations...</p>
        </div>
      </GlassCard>
    );
  }

  if (calculations.length === 0) {
    return (
      <GlassCard>
        <div className="text-center py-12">
          <Calculator className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-text-tertiary)' }} />
          <p className="text-lg font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
            No Saved Calculations
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Your saved calculations will appear here
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <h2
        className="text-2xl font-bold uppercase tracking-wider mb-6 neon-text"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Saved Calculations ({calculations.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {calculations.map((calc) => (
            <motion.div
              key={calc._id.toString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="p-4 border-3 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 cursor-pointer group shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
                style={{
                  background: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-neon-purple)',
                }}
                onClick={() => handleLoad(calc)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 flex items-center justify-center border-2"
                      style={{
                        background: 'var(--color-bg-tertiary)',
                        borderColor: 'var(--color-neon-cyan)',
                        color: 'var(--color-neon-cyan)',
                        boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
                      }}
                    >
                      {getIcon(calc.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
                        {getTypeLabel(calc.type)}
                      </h3>
                      <p className="text-xs font-bold" style={{ color: 'var(--color-neon-purple)', fontFamily: 'var(--font-sans)' }}>
                        {calc.currency}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {loadingId === calc._id.toString() && (
                      <div
                        className="px-2 py-1 text-xs font-bold uppercase border-2"
                        style={{ 
                          background: 'rgba(0, 240, 255, 0.1)',
                          color: 'var(--color-neon-cyan)',
                          borderColor: 'var(--color-neon-cyan)',
                          fontFamily: 'var(--font-display)',
                          boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
                        }}
                      >
                        Loaded
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(calc._id.toString());
                      }}
                      disabled={deletingId === calc._id.toString()}
                      className="p-2 border-2 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:-translate-x-0.5 hover:-translate-y-0.5"
                      style={{
                        color: 'var(--color-error)',
                        borderColor: 'var(--color-error)',
                        background: 'var(--color-bg-tertiary)',
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {calc.type === 'mortgage' && 'principal' in calc.inputs && 'downPayment' in calc.inputs && 'tenure' in calc.inputs && (
                    <>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}>
                          Monthly Payment
                        </p>
                        <p className="text-lg font-bold neon-pink" style={{ fontFamily: 'var(--font-sans)' }}>
                          {formatCurrency((calc.results.monthlyPayment as number) || 0, calc.currency, true)}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                            Loan
                          </p>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                            {formatCurrency(calc.inputs.principal - calc.inputs.downPayment, calc.currency)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                            Tenure
                          </p>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                            {calc.inputs.tenure}y
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {calc.type === 'rent' && (
                    <div>
                      <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                        Monthly Rent
                      </p>
                      <p className="text-lg font-bold neon-pink" style={{ fontFamily: 'var(--font-sans)' }}>
                        {formatCurrency((calc.results.monthlyRent as number) || 0, calc.currency, true)}
                      </p>
                    </div>
                  )}

                  {calc.type === 'prorated_rent' && (
                    <div>
                      <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                        Prorated Amount
                      </p>
                      <p className="text-lg font-bold neon-pink" style={{ fontFamily: 'var(--font-sans)' }}>
                        {formatCurrency((calc.results.proratedRent as number) || 0, calc.currency, true)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t-2" style={{ borderColor: 'var(--color-neon-purple)' }}>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" style={{ color: 'var(--color-text-tertiary)' }} />
                    <span className="text-xs font-bold" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}>
                      {format(new Date(calc.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-3 h-3" style={{ color: 'var(--color-neon-cyan)' }} />
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
                      Load
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}
