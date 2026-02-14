'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label 
          className="text-xs font-bold uppercase tracking-wider"
          style={{ 
            color: 'var(--color-neon-cyan)',
            textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-neon-purple)' }}
          >
            {icon}
          </div>
        )}
        <input
          className={`
            retro-input w-full
            ${icon ? 'pl-12 pr-4' : 'px-4'}
            py-3
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <div
          className="text-xs font-bold px-3 py-2 border-2"
          style={{ 
            color: 'var(--color-error)',
            borderColor: 'var(--color-error)',
            background: 'rgba(255, 0, 110, 0.1)',
            textShadow: '0 0 10px rgba(255, 0, 110, 0.5)',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
