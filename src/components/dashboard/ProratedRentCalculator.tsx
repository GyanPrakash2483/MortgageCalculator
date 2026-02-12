'use client';

import React, { useMemo, useState } from 'react';
import { Save, Calendar } from 'lucide-react';
import { useSession } from 'next-auth/react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import SliderInput from '@/components/calculators/SliderInput';
import useCalculatorStore from '@/store/calculator';
import { calculateProratedRent } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

export default function ProratedRentCalculator() {
  const { data: session } = useSession();
  const { currency, proratedRentInputs, setProratedRentInputs, triggerRefresh } = useCalculatorStore();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const results = useMemo(
    () =>
      calculateProratedRent(
        proratedRentInputs.monthlyRent,
        proratedRentInputs.moveInDate,
        proratedRentInputs.daysOccupied
      ),
    [proratedRentInputs]
  );

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
          type: 'prorated_rent',
          currency,
          inputs: proratedRentInputs,
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
    } catch {
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
          Prorated Rent Calculator
        </h2>

        <div className="space-y-6">
          <SliderInput
            label="Monthly Rent"
            value={proratedRentInputs.monthlyRent}
            onChange={(value) => setProratedRentInputs({ monthlyRent: value })}
            min={currency === 'INR' ? 5000 : 500}
            max={currency === 'INR' ? 200000 : 10000}
            step={currency === 'INR' ? 1000 : 100}
            formatValue={(v) => formatCurrency(v, currency)}
          />

          <Input
            type="date"
            label="Move-In Date"
            value={proratedRentInputs.moveInDate}
            onChange={(e) => setProratedRentInputs({ moveInDate: e.target.value })}
            icon={<Calendar className="w-5 h-5" />}
          />

          <SliderInput
            label="Days Occupied"
            value={proratedRentInputs.daysOccupied}
            onChange={(value) => setProratedRentInputs({ daysOccupied: value })}
            min={1}
            max={31}
            step={1}
            unit="days"
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
          Prorated Amount
        </h2>

        <div>
          <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            You Pay
          </p>
          <div
            className="text-5xl font-bold mb-8 gradient-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {formatCurrency(results.proratedRent, currency, true)}
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="p-4 rounded-lg"
            style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Full Monthly Rent
            </p>
            <p className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {formatCurrency(proratedRentInputs.monthlyRent, currency)}
            </p>
          </div>

          <div
            className="p-4 rounded-lg"
            style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Daily Rate
            </p>
            <p className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {formatCurrency(results.dailyRate, currency, true)}
            </p>
          </div>

          <div
            className="p-4 rounded-lg"
            style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Days in Month
            </p>
            <p className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {results.daysInMonth} days
            </p>
          </div>

          <div
            className="p-4 rounded-lg"
            style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Days Occupied
            </p>
            <p className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {proratedRentInputs.daysOccupied} days
            </p>
          </div>
        </div>

        <div
          className="mt-6 p-4 rounded-lg"
          style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <strong>Formula:</strong> (Monthly Rent / Days in Month) × Days Occupied
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
            ({formatCurrency(proratedRentInputs.monthlyRent, currency)} / {results.daysInMonth}) × {proratedRentInputs.daysOccupied} ={' '}
            {formatCurrency(results.proratedRent, currency, true)}
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
