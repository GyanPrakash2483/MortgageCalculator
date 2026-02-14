'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: `
      bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-purple)]
      text-white border-3 border-[var(--color-neon-cyan)]
      hover:border-[var(--color-neon-pink)] hover:-translate-x-1 hover:-translate-y-1
      active:translate-x-0 active:translate-y-0
      shadow-[4px_4px_0_rgba(0,0,0,0.5)]
      hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]
    `,
    secondary: `
      bg-[var(--color-bg-tertiary)] text-[var(--color-neon-cyan)]
      border-3 border-[var(--color-neon-purple)]
      hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-neon-cyan)]
      shadow-[4px_4px_0_rgba(0,0,0,0.5)]
      hover:shadow-[0_0_20px_rgba(191,0,255,0.4)]
    `,
    ghost: `
      text-[var(--color-neon-cyan)] border-2 border-transparent
      hover:text-[var(--color-neon-pink)] hover:bg-[var(--color-surface)]
      hover:border-[var(--color-neon-pink)]
    `,
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      style={{
        fontFamily: 'var(--font-display)',
      }}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
}
