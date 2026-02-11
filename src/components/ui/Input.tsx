'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 rounded-xl
            ${icon ? 'pl-12' : ''}
            text-(--color-text-primary) placeholder-slate-500
            focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50
            transition-all duration-200
            ${className}
          `}
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
          {...props}
        />
      </div>
      {error && (
        <span className="text-sm" style={{ color: 'var(--color-error)' }}>
          {error}
        </span>
      )}
    </div>
  );
}
