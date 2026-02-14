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
          className="flex items-center gap-2 mb-6 px-4 py-2 transition-all duration-200 border-2 hover:-translate-x-1 hover:-translate-y-1 font-bold text-xs uppercase tracking-wider"
          style={{
            color: 'var(--color-neon-cyan)',
            borderColor: 'var(--color-neon-purple)',
            background: 'var(--color-bg-tertiary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </button>

        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-14 h-14 flex items-center justify-center border-3"
              style={{
                background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-pink))',
                borderColor: 'var(--color-bg-primary)',
                boxShadow: '0 0 30px rgba(0, 240, 255, 0.8), 4px 4px 0 rgba(0, 0, 0, 0.8)',
              }}
            >
              <Home className="w-7 h-7 text-white" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 1))' }} />
            </div>
          </div>
          <h1
            className="text-3xl font-bold uppercase tracking-wider mb-2 neon-text"
            style={{
              fontFamily: 'var(--font-display)',
            }}
          >
            Mortgage Calc
          </h1>
          <p 
            className="text-xs font-bold uppercase tracking-wide" 
            style={{ 
              color: 'var(--color-neon-purple)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Financial Calculator
          </p>
        </div>

        <GlassCard>
          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 border-2" style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-neon-purple)' }}>
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 font-bold text-sm uppercase tracking-wider transition-all duration-200 border-2 ${
                !isSignUp ? 'text-white' : ''
              }`}
              style={
                !isSignUp
                  ? {
                      background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-purple))',
                      borderColor: 'var(--color-neon-cyan)',
                      boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
                      fontFamily: 'var(--font-display)',
                    }
                  : { 
                      color: 'var(--color-neon-cyan)',
                      borderColor: 'transparent',
                      fontFamily: 'var(--font-display)',
                    }
              }
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 font-bold text-sm uppercase tracking-wider transition-all duration-200 border-2 ${
                isSignUp ? 'text-white' : ''
              }`}
              style={
                isSignUp
                  ? {
                      background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-purple))',
                      borderColor: 'var(--color-neon-cyan)',
                      boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
                      fontFamily: 'var(--font-display)',
                    }
                  : { 
                      color: 'var(--color-neon-cyan)',
                      borderColor: 'transparent',
                      fontFamily: 'var(--font-display)',
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
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-0.5" style={{ background: 'var(--color-neon-purple)' }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-display)' }}>
              OR
            </span>
            <div className="flex-1 h-0.5" style={{ background: 'var(--color-neon-purple)' }} />
          </div>

          {/* OAuth */}
          <OAuthButtons />
        </GlassCard>

        {/* Footer */}
        <p className="text-center text-sm mt-6 font-medium" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-bold hover:underline uppercase tracking-wide"
            style={{ color: 'var(--color-neon-cyan)', textShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}
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
