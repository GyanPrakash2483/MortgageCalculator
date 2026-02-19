'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Smooth Gradient Background */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(191, 0, 255, 0.15), transparent),
          radial-gradient(ellipse 80% 80% at 50% 120%, rgba(0, 240, 255, 0.15), transparent),
          linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)
        `
      }} />

      {/* Animated Gradient Blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(191, 0, 255, 0.1), transparent 70%)',
          top: '10%',
          left: '5%',
        }}
        animate={{
          x: ['0%', '70%', '0%'],
          y: ['0%', '50%', '0%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08), transparent 70%)',
          top: '20%',
          right: '10%',
        }}
        animate={{
          x: ['0%', '-60%', '0%'],
          y: ['0%', '40%', '0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-neon-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-neon-cyan) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Subtle Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gentle Floating Orbs - Much fewer and subtler */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(191, 0, 255, 0.12), transparent 70%)',
          top: '10%',
          right: '15%',
        }}
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.1), transparent 70%)',
          bottom: '15%',
          left: '10%',
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, -20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Top Border Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-neon-cyan) 50%, transparent)',
          opacity: 0.3,
        }}
      />
    </div>
  );
}
