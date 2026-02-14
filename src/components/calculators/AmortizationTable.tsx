'use client';

import React from 'react';
import { AmortizationEntry } from '@/lib/calculations';
import { Currency } from '@/models/Calculation';
import { formatCurrency } from '@/lib/formatters';

interface AmortizationTableProps {
  data: AmortizationEntry[];
  currency: Currency;
}

export default function AmortizationTable({ data, currency }: AmortizationTableProps) {
  return (
    <div className="overflow-x-auto border-3" style={{ borderColor: 'var(--color-neon-purple)', background: 'var(--color-bg-tertiary)' }}>
      <table className="w-full">
        <thead>
          <tr
            className="border-b-2"
            style={{ borderColor: 'var(--color-neon-purple)', background: 'var(--color-bg-secondary)' }}
          >
            <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
              Year
            </th>
            <th className="text-right py-3 px-4 font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
              Principal Paid
            </th>
            <th className="text-right py-3 px-4 font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
              Interest Paid
            </th>
            <th className="text-right py-3 px-4 font-bold text-xs uppercase tracking-wider" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-display)' }}>
              Remaining Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr
              key={entry.year}
              className="border-b transition-all duration-200 hover:bg-opacity-50"
              style={{
                borderColor: 'var(--color-neon-purple)',
                background: entry.year % 2 === 0 ? 'var(--color-bg-tertiary)' : 'var(--color-bg-secondary)',
              }}
            >
              <td className="py-3 px-4 font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                Year {entry.year}
              </td>
              <td className="py-3 px-4 text-right font-bold" style={{ color: 'var(--color-neon-cyan)', fontFamily: 'var(--font-sans)' }}>
                {formatCurrency(entry.principalPaid, currency)}
              </td>
              <td className="py-3 px-4 text-right font-bold" style={{ color: 'var(--color-neon-pink)', fontFamily: 'var(--font-sans)' }}>
                {formatCurrency(entry.interestPaid, currency)}
              </td>
              <td className="py-3 px-4 text-right font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                {formatCurrency(entry.balance, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
