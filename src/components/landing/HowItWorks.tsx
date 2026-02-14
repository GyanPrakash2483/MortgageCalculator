'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, Settings, LineChart } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MousePointerClick,
    title: 'Choose Your Calculator',
    description: 'Select from mortgage, rent, or prorated rent calculators based on your needs',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Enter Your Details',
    description: 'Input your financial parameters using our intuitive sliders and inputs',
  },
  {
    number: '03',
    icon: LineChart,
    title: 'Get Instant Results',
    description: 'View detailed breakdowns, charts, and amortization tables instantly',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-32 relative">
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
            className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-4 neon-pink"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            How It Works
          </h2>
          <p
            className="text-lg font-bold max-w-2xl mx-auto"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Get started in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines (Desktop) */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-neon-purple)] to-transparent opacity-30" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative"
            >
              <div
                className="p-8 border-3 text-center group hover:-translate-y-2 transition-all duration-300"
                style={{
                  background: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-neon-purple)',
                  boxShadow: '0 0 20px rgba(191, 0, 255, 0.2), 4px 4px 0 rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* Number Badge */}
                <div
                  className="inline-flex items-center justify-center w-16 h-16 border-3 mb-6 relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-pink))',
                    borderColor: 'var(--color-bg-primary)',
                    boxShadow: '0 0 30px rgba(0, 240, 255, 0.6)',
                  }}
                >
                  <span
                    className="text-2xl font-bold"
                    style={{
                      color: 'white',
                      fontFamily: 'var(--font-display)',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center mx-auto mb-4"
                  style={{
                    color: 'var(--color-neon-cyan)',
                  }}
                >
                  <step.icon className="w-10 h-10" />
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold uppercase tracking-wide mb-3"
                  style={{
                    color: 'var(--color-neon-cyan)',
                    fontFamily: 'var(--font-display)',
                    textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm font-bold"
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
