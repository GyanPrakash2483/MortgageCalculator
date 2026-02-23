'use client';

import React, { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import Footer from '@/components/dashboard/Footer';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import OAuthButtons from '@/components/auth/OAuthButtons';

function AuthContent() {
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
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5 font-medium text-sm border"
          style={{
            color: 'var(--color-text-secondary)',
            borderColor: '#e5e7eb',
            background: 'white',
            fontFamily: 'var(--font-sans)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-14 h-14 flex items-center justify-center rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
            >
              <Home className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1
            className="text-3xl font-bold tracking-tight mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            Mortgage Calc
          </h1>
          <p 
            className="text-sm font-medium" 
            style={{ 
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Financial Calculator
          </p>
        </div>

        <GlassCard>
          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 rounded-lg" style={{ background: '#f3f4f6' }}>
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2.5 px-4 font-semibold text-sm rounded-md transition-all duration-200`}
              style={
                !isSignUp
                  ? {
                      background: 'white',
                      color: 'var(--color-text-primary)',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      fontFamily: 'var(--font-sans)',
                    }
                  : { 
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-sans)',
                      background: 'transparent',
                    }
              }
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2.5 px-4 font-semibold text-sm rounded-md transition-all duration-200`}
              style={
                isSignUp
                  ? {
                      background: 'white',
                      color: 'var(--color-text-primary)',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      fontFamily: 'var(--font-sans)',
                    }
                  : { 
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-sans)',
                      background: 'transparent',
                    }
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
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ background: '#e5e7eb' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}>
              OR
            </span>
            <div className="flex-1 h-px" style={{ background: '#e5e7eb' }} />
          </div>

          {/* OAuth */}
          <OAuthButtons />
        </GlassCard>

        {/* Footer */}
        <p className="text-center text-sm mt-6 font-medium" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-semibold hover:underline transition-colors"
            style={{ color: 'var(--color-accent-blue)' }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <Footer />
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <SessionProvider>
      <AuthContent />
    </SessionProvider>
  );
}
