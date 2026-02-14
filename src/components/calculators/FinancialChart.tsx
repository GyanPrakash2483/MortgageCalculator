'use client';

import React from 'react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Currency } from '@/models/Calculation';
import { formatCurrency } from '@/lib/formatters';

interface ChartData {
  name?: string;
  value?: number;
  fill?: string;
  balance?: number;
  year?: number;
  [key: string]: string | number | undefined;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: ChartData;
    color: string;
  }>;
}

interface FinancialChartProps {
  type: 'donut' | 'area';
  data: ChartData[];
  currency: Currency;
}

export default function FinancialChart({ type, data, currency }: FinancialChartProps) {
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-3 border-3"
          style={{
            background: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-neon-cyan)',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
          }}
        >
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 border-2"
                style={{ 
                  background: entry.color,
                  borderColor: 'var(--color-bg-primary)',
                  boxShadow: `0 0 10px ${entry.color}`,
                }}
              />
              <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
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
            strokeWidth={2}
            stroke="var(--color-bg-primary)"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill as string || '#00f0ff'}
                style={{
                  filter: `drop-shadow(0 0 8px ${entry.fill as string || '#00f0ff'})`,
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span style={{ 
                color: 'var(--color-text-primary)', 
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
              }}>
                {value}
              </span>
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
              <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#bf00ff" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(191, 0, 255, 0.2)" 
            strokeWidth={1}
          />
          <XAxis
            dataKey="year"
            stroke="var(--color-neon-purple)"
            tick={{ 
              fill: 'var(--color-neon-cyan)', 
              fontSize: 11,
              fontWeight: 'bold',
              fontFamily: 'var(--font-sans)',
            }}
            axisLine={{ stroke: 'var(--color-neon-purple)', strokeWidth: 2 }}
          />
          <YAxis
            stroke="var(--color-neon-purple)"
            tick={{ 
              fill: 'var(--color-neon-cyan)', 
              fontSize: 11,
              fontWeight: 'bold',
              fontFamily: 'var(--font-sans)',
            }}
            axisLine={{ stroke: 'var(--color-neon-purple)', strokeWidth: 2 }}
            tickFormatter={(value) => formatCurrency(value, currency)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#00f0ff"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorBalance)"
            style={{
              filter: 'drop-shadow(0 0 8px #00f0ff)',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return null;
}
