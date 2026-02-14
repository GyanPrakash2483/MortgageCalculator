'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              var(--color-neon-cyan) 40px,
              var(--color-neon-cyan) 41px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              var(--color-neon-pink) 40px,
              var(--color-neon-pink) 41px
            )
          `,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-12 md:p-16 border-3 text-center relative"
          style={{
            background: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-neon-purple)',
            boxShadow: '0 0 40px rgba(191, 0, 255, 0.4), 8px 8px 0 rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Decorative Corner Elements */}
          <div
            className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3"
            style={{ borderColor: 'var(--color-neon-cyan)' }}
          />
          <div
            className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3"
            style={{ borderColor: 'var(--color-neon-pink)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3"
            style={{ borderColor: 'var(--color-neon-pink)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3"
            style={{ borderColor: 'var(--color-neon-cyan)' }}
          />

          {/* Icon */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-flex items-center justify-center w-16 h-16 mb-6"
            style={{
              color: 'var(--color-neon-yellow)',
              filter: 'drop-shadow(0 0 20px var(--color-neon-yellow))',
            }}
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>

          {/* Headline */}
          <h2
            className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-pink))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ready to Calculate?
          </h2>

          {/* Subheadline */}
          <p
            className="text-xl font-bold mb-8 max-w-2xl mx-auto"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Start making smarter financial decisions today with our free calculator suite
          </p>

          {/* CTA Button */}
          <Button
            variant="primary"
            onClick={() => router.push('/calculator')}
            className="text-lg px-10 py-4"
          >
            Start Calculating
            <ArrowRight className="w-5 h-5" />
          </Button>

          {/* Trust Line */}
          <p
            className="mt-6 text-xs font-bold uppercase tracking-wider"
            style={{
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            No Sign-up Required • 100% Free • Instant Results
          </p>
        </motion.div>
      </div>
    </section>
  );
}
