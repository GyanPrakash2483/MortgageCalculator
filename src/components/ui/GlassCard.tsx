'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`
        glass-card p-6
        ${hover ? 'hover:border-(--color-border-light) hover:-translate-y-1 cursor-pointer' : ''}
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}
