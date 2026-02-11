'use client';

import React from 'react';
import { Home, LogOut, UserCircle, LogIn } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CurrencyToggle from './CurrencyToggle';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header
      className="glass-card mb-6"
      style={{
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue))',
            }}
          >
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1
              className="text-xl font-bold"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-primary)',
              }}
            >
              Mortgage Calculator
            </h1>
            <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              Financial Planning Dashboard
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <CurrencyToggle />

          {/* User Menu */}
          {session ? (
            <div className="flex items-center gap-3">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt=""
                  className="w-10 h-10 rounded-full border-2"
                  style={{ borderColor: 'var(--color-border)' }}
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-base"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue))',
                    color: 'white',
                  }}
                  title={session.user?.name || session.user?.email || 'User'}
                >
                  {session.user?.name?.charAt(0).toUpperCase() || session.user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 text-white font-medium"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue))',
              }}
            >
              <LogIn className="w-4 h-4" />
              <span className="text-sm">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
