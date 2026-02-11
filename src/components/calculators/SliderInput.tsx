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

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </label>
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {displayValue}
          {unit && ` ${unit}`}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, var(--color-accent-cyan) 0%, var(--color-accent-blue) ${
              ((value - min) / (max - min)) * 100
            }%, var(--color-border) ${((value - min) / (max - min)) * 100}%, var(--color-border) 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
        <span>{formatValue ? formatValue(min) : min}{unit && ` ${unit}`}</span>
        <span>{formatValue ? formatValue(max) : max}{unit && ` ${unit}`}</span>
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
          transition: all 0.2s;
        }

        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.6);
        }

        input[type='range']::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue));
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
          transition: all 0.2s;
        }

        input[type='range']::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.6);
        }
      `}</style>
    </div>
  );
}
