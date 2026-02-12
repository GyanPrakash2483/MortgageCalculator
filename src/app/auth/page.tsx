'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import OAuthButtons from '@/components/auth/OAuthButtons';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{ zIndex: 2 }}
    >

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-all duration-300 hover:-translate-x-1"
          style={{
            color: 'var(--color-text-secondary)',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Calculator</span>
        </button>

        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue))',
              }}
            >
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1
              className="text-3xl font-bold"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-primary)',
              }}
            >
              Mortgage Calculator
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Smart financial planning for your dream home
          </p>
        </div>

        <GlassCard>
          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 rounded-lg" style={{ background: 'var(--color-bg-secondary)' }}>
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                !isSignUp ? 'text-white' : ''
              }`}
              style={
                !isSignUp
                  ? {
                      background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue))',
                    }
                  : { color: 'var(--color-text-secondary)' }
              }
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                isSignUp ? 'text-white' : ''
              }`}
              style={
                isSignUp
                  ? {
                      background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue))',
                    }
                  : { color: 'var(--color-text-secondary)' }
              }
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          <motion.div
            key={isSignUp ? 'signup' : 'signin'}
            initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {isSignUp ? <SignUpForm /> : <SignInForm />}
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              OR
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
          </div>

          {/* OAuth */}
          <OAuthButtons />
        </GlassCard>

        {/* Footer */}
        <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-tertiary)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-medium hover:underline"
            style={{ color: 'var(--color-accent-cyan)' }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
