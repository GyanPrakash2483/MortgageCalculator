'use client';

import React from 'react';
import { Home, LogOut, LogIn } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CurrencyToggle from './CurrencyToggle';
import Image from 'next/image';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header
      className="glass-card mb-6 border-3"
      style={{
        borderColor: 'var(--color-neon-purple)',
      }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div
            className="w-12 h-12 flex items-center justify-center border-3"
            style={{
              background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-pink))',
              borderColor: 'var(--color-bg-primary)',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.6)',
            }}
          >
            <Home className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))' }} />
          </div>
          <div>
            <h1
              className="text-xl font-bold uppercase tracking-wider neon-text"
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
        </button>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <CurrencyToggle />

          {/* User Menu */}
          {session ? (
            <div className="flex items-center gap-3">
              {session.user?.image ? (
                <div className="border-3 p-0.5" style={{ borderColor: 'var(--color-neon-cyan)' }}>
                  <Image
                    src={session.user.image}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10"
                    style={{ 
                      filter: 'contrast(1.2) saturate(1.3)',
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-10 h-10 flex items-center justify-center font-bold text-lg border-3"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-purple))',
                    color: 'white',
                    borderColor: 'var(--color-bg-primary)',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                    fontFamily: 'var(--font-display)',
                  }}
                  title={session.user?.name || session.user?.email || 'User'}
                >
                  {session.user?.name?.charAt(0).toUpperCase() || session.user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-4 py-2 transition-all duration-200 font-bold text-xs uppercase tracking-wider border-3 hover:-translate-x-1 hover:-translate-y-1 shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
                style={{
                  background: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-neon-pink)',
                  color: 'var(--color-neon-pink)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              className="flex items-center gap-2 px-5 py-2.5 transition-all duration-200 text-white font-bold text-sm uppercase tracking-wider border-3 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0_rgba(0,0,0,0.5)]"
              style={{
                background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-purple))',
                borderColor: 'var(--color-neon-cyan)',
                fontFamily: 'var(--font-display)',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.4), 4px 4px 0 rgba(0, 0, 0, 0.5)',
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
