'use client';

import React, { useMemo, useState } from 'react';
import { Save } from 'lucide-react';
import { useSession } from 'next-auth/react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import SliderInput from '@/components/calculators/SliderInput';
import useCalculatorStore from '@/store/calculator';
import { calculateRent } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

export default function RentCalculator() {
  const { data: session } = useSession();
  const { currency, rentInputs, setRentInputs, triggerRefresh } = useCalculatorStore();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const results = useMemo(() => calculateRent(rentInputs.monthlyRent), [rentInputs.monthlyRent]);

  const handleSave = async () => {
    if (!session?.user?.id) {
      // Redirect to auth page if not logged in
      window.location.href = '/auth';
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/calculations/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'rent',
          currency,
          inputs: rentInputs,
          results,
        }),
      });

      if (response.ok) {
        setSaveMessage('✓ Calculation saved successfully!');
        triggerRefresh(); // Refresh saved calculations list
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('✗ Failed to save calculation');
      }
    } catch (error) {
      setSaveMessage('✗ Error saving calculation');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <GlassCard>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Rent Calculator
        </h2>

        <div className="space-y-6">
          <SliderInput
            label="Monthly Rent"
            value={rentInputs.monthlyRent}
            onChange={(value) => setRentInputs({ monthlyRent: value })}
            min={currency === 'INR' ? 5000 : 500}
            max={currency === 'INR' ? 200000 : 10000}
            step={currency === 'INR' ? 1000 : 100}
            formatValue={(v) => formatCurrency(v, currency)}
          />
        </div>

        <Button onClick={handleSave} isLoading={isSaving} className="w-full mt-6">
          <Save className="w-5 h-5" />
          {session ? 'Save Calculation' : 'Sign In to Save'}
        </Button>

        {saveMessage && (
          <p
            className="text-sm text-center mt-2"
            style={{ color: saveMessage.includes('✓') ? 'var(--color-success)' : 'var(--color-error)' }}
          >
            {saveMessage}
          </p>
        )}
      </GlassCard>

      {/* Results Panel */}
      <GlassCard>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Rent Projections
        </h2>

        <div className="space-y-6">
          <div>
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Monthly Rent
            </p>
            <div
              className="text-4xl font-bold gradient-text"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {formatCurrency(results.monthlyRent, currency, true)}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div
              className="p-4 rounded-lg"
              style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
            >
              <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                Yearly Cost
              </p>
              <p className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {formatCurrency(results.yearlyRent, currency)}
              </p>
            </div>

            <div
              className="p-4 rounded-lg"
              style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
            >
              <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                5-Year Cost
              </p>
              <p className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {formatCurrency(results.fiveYearRent, currency)}
              </p>
            </div>

            <div
              className="p-4 rounded-lg"
              style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
            >
              <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                10-Year Cost
              </p>
              <p className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {formatCurrency(results.tenYearRent, currency)}
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
