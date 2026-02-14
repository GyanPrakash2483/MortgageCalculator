'use client';

import React from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  formatValue?: (value: number) => string;
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit = '',
  formatValue,
}: SliderInputProps) {
  const displayValue = formatValue ? formatValue(value) : value;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label 
          className="text-xs font-bold uppercase tracking-wider"
          style={{ 
            color: 'var(--color-neon-cyan)',
            fontFamily: 'var(--font-display)',
            textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
          }}
        >
          {label}
        </label>
        <span 
          className="text-lg font-bold px-3 py-1 border-2"
          style={{ 
            color: 'var(--color-neon-pink)',
            borderColor: 'var(--color-neon-pink)',
            background: 'var(--color-bg-tertiary)',
            fontFamily: 'var(--font-sans)',
            textShadow: '0 0 10px rgba(255, 0, 110, 0.6)',
            boxShadow: '0 0 15px rgba(255, 0, 110, 0.2)',
          }}
        >
          {displayValue}
          {unit && ` ${unit}`}
        </span>
      </div>
      <div className="relative h-8 border-3 bg-[var(--color-bg-tertiary)]" style={{ borderColor: 'var(--color-neon-purple)' }}>
        {/* Progress bar */}
        <div
          className="absolute left-0 top-0 h-full transition-all duration-200"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, var(--color-neon-cyan), var(--color-neon-pink))',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
          }}
        />
        
        {/* Slider thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 border-3 cursor-grab active:cursor-grabbing transition-all duration-200"
          style={{
            left: `calc(${percentage}% - 12px)`,
            background: 'var(--color-neon-yellow)',
            borderColor: 'var(--color-bg-primary)',
            boxShadow: '0 0 20px var(--color-neon-yellow), 0 0 40px var(--color-neon-yellow)',
          }}
        />
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>
      <div 
        className="flex justify-between text-xs font-bold uppercase"
        style={{ 
          color: 'var(--color-text-tertiary)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <span>{formatValue ? formatValue(min) : min}{unit && ` ${unit}`}</span>
        <span>{formatValue ? formatValue(max) : max}{unit && ` ${unit}`}</span>
      </div>
    </div>
  );
}
