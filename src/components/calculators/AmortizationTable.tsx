'use client';

import React from 'react';
import { AmortizationEntry } from '@/lib/calculations';
import { Currency } from '@/models/Calculation';
import { formatCurrency, formatNumber } from '@/lib/formatters';

interface AmortizationTableProps {
  data: AmortizationEntry[];
  currency: Currency;
}

export default function AmortizationTable({ data, currency }: AmortizationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr
            className="border-b"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <th className="text-left py-3 px-4" style={{ color: 'var(--color-text-secondary)' }}>
              Year
            </th>
            <th className="text-right py-3 px-4" style={{ color: 'var(--color-text-secondary)' }}>
              Principal Paid
            </th>
            <th className="text-right py-3 px-4" style={{ color: 'var(--color-text-secondary)' }}>
              Interest Paid
            </th>
            <th className="text-right py-3 px-4" style={{ color: 'var(--color-text-secondary)' }}>
              Remaining Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr
              key={entry.year}
              className="border-b hover:bg-opacity-50 transition-colors"
              style={{
                borderColor: 'var(--color-border)',
              }}
            >
              <td className="py-3 px-4 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                Year {entry.year}
              </td>
              <td className="py-3 px-4 text-right" style={{ color: 'var(--color-accent-cyan)' }}>
                {formatCurrency(entry.principalPaid, currency)}
              </td>
              <td className="py-3 px-4 text-right" style={{ color: 'var(--color-accent-blue)' }}>
                {formatCurrency(entry.interestPaid, currency)}
              </td>
              <td className="py-3 px-4 text-right font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {formatCurrency(entry.balance, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
