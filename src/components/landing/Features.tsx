'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Calculator, Calendar, BarChart3, Save, Zap } from 'lucide-react';

const features = [
  {
    icon: Home,
    title: 'Mortgage Calculator',
    description: 'Calculate monthly payments, total interest, and view detailed amortization schedules',
    color: 'cyan',
  },
  {
    icon: Calculator,
    title: 'Rent Calculator',
    description: 'Project your yearly and multi-year rental costs with precision',
    color: 'pink',
  },
  {
    icon: Calendar,
    title: 'Prorated Rent',
    description: 'Calculate exact rent for partial months when moving in mid-cycle',
    color: 'purple',
  },
  {
    icon: BarChart3,
    title: 'Visual Charts',
    description: 'Interactive charts and graphs to visualize your financial data',
    color: 'cyan',
  },
  {
    icon: Save,
    title: 'Save & Track',
    description: 'Save calculations and compare different scenarios over time',
    color: 'pink',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Real-time calculations as you adjust your inputs with sliders',
    color: 'purple',
  },
];

const colorMap = {
  cyan: {
    border: 'var(--color-neon-cyan)',
    text: 'var(--color-neon-cyan)',
    shadow: 'rgba(0, 240, 255, 0.3)',
  },
  pink: {
    border: 'var(--color-neon-pink)',
    text: 'var(--color-neon-pink)',
    shadow: 'rgba(255, 0, 110, 0.3)',
  },
  purple: {
    border: 'var(--color-neon-purple)',
    text: 'var(--color-neon-purple)',
    shadow: 'rgba(191, 0, 255, 0.3)',
  },
};

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-4 neon-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Features
          </h2>
          <p
            className="text-lg font-bold max-w-2xl mx-auto"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Everything you need for smart financial planning
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color as keyof typeof colorMap];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
              >
                <div
                  className="p-6 border-3 h-full transition-all duration-300 group cursor-pointer"
                  style={{
                    background: 'var(--color-bg-secondary)',
                    borderColor: colors.border,
                    boxShadow: `0 0 20px ${colors.shadow}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 40px ${colors.shadow}, 4px 4px 0 rgba(0, 0, 0, 0.8)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 20px ${colors.shadow}`;
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 flex items-center justify-center border-3 mb-4"
                    style={{
                      background: 'var(--color-bg-tertiary)',
                      borderColor: colors.border,
                      color: colors.text,
                      boxShadow: `0 0 20px ${colors.shadow}`,
                    }}
                  >
                    <feature.icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold uppercase tracking-wide mb-3"
                    style={{
                      color: colors.text,
                      fontFamily: 'var(--font-display)',
                      textShadow: `0 0 10px ${colors.shadow}`,
                    }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm font-bold"
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
