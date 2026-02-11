'use client';

import React from 'react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Currency } from '@/models/Calculation';
import { formatCurrency } from '@/lib/formatters';

interface FinancialChartProps {
  type: 'donut' | 'area';
  data: any[];
  currency: Currency;
}

export default function FinancialChart({ type, data, currency }: FinancialChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-3 rounded-lg"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: entry.color }}
              />
              <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                {entry.name}: {formatCurrency(entry.value, currency, true)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'donut') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span style={{ color: 'var(--color-text-primary)', fontSize: '14px' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="year"
            stroke="var(--color-text-tertiary)"
            tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12 }}
          />
          <YAxis
            stroke="var(--color-text-tertiary)"
            tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12 }}
            tickFormatter={(value) => formatCurrency(value, currency)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#06b6d4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorBalance)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return null;
}
