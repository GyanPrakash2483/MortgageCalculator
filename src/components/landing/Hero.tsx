'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 border-3 opacity-30"
        style={{
          borderColor: 'var(--color-neon-cyan)',
          boxShadow: '0 0 30px rgba(0, 240, 255, 0.3)',
        }}
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 border-3 opacity-20"
        style={{
          borderColor: 'var(--color-neon-pink)',
          boxShadow: '0 0 30px rgba(255, 0, 110, 0.3)',
        }}
        animate={{
          rotate: [360, 270, 180, 90, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 border-3"
            style={{
              background: 'var(--color-bg-tertiary)',
              borderColor: 'var(--color-neon-purple)',
              boxShadow: '0 0 20px rgba(191, 0, 255, 0.3)',
            }}
          >
            <Zap className="w-4 h-4" style={{ color: 'var(--color-neon-yellow)' }} />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{
                color: 'var(--color-neon-cyan)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Retro Financial System
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wider mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-pink))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(0, 240, 255, 0.5)',
            }}
          >
            Calculate
            <br />
            Your Future
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl font-bold mb-12 max-w-3xl mx-auto"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Smart mortgage, rent, and prorated rent calculations
            <br />
            <span className="neon-text">in retro style</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="primary"
              onClick={() => router.push('/calculator')}
              className="text-base px-8 py-4"
            >
              <Calculator className="w-5 h-5" />
              Get Started
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-base px-8 py-4"
            >
              <TrendingUp className="w-5 h-5" />
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: 'Calculations', value: '3 Types' },
              { label: 'Accuracy', value: '100%' },
              { label: 'Cost', value: 'Free' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="p-4 border-3"
                style={{
                  background: 'var(--color-bg-secondary)',
                  borderColor: index === 0 ? 'var(--color-neon-cyan)' : index === 1 ? 'var(--color-neon-pink)' : 'var(--color-neon-purple)',
                  boxShadow: `0 0 20px ${index === 0 ? 'rgba(0, 240, 255, 0.2)' : index === 1 ? 'rgba(255, 0, 110, 0.2)' : 'rgba(191, 0, 255, 0.2)'}`,
                }}
              >
                <div
                  className="text-3xl font-bold mb-1"
                  style={{
                    color: index === 0 ? 'var(--color-neon-cyan)' : index === 1 ? 'var(--color-neon-pink)' : 'var(--color-neon-purple)',
                    fontFamily: 'var(--font-sans)',
                    textShadow: `0 0 20px ${index === 0 ? 'rgba(0, 240, 255, 0.6)' : index === 1 ? 'rgba(255, 0, 110, 0.6)' : 'rgba(191, 0, 255, 0.6)'}`,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{
                    color: 'var(--color-text-tertiary)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
