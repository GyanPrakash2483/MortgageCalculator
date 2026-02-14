'use client';

import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-12 border-t-3 py-8"
      style={{
        borderColor: 'var(--color-neon-purple)',
        background: 'rgba(26, 11, 46, 0.6)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3
              className="text-lg font-bold uppercase tracking-wider mb-4 neon-text"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Mortgage Calc
            </h3>
            <p
              className="text-sm font-bold mb-4"
              style={{
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              RETRO FINANCIAL SYSTEM
            </p>
            <p
              className="text-xs"
              style={{
                color: 'var(--color-text-tertiary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Your trusted calculator for mortgages, rent, and prorated rent planning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{
                color: 'var(--color-neon-cyan)',
                fontFamily: 'var(--font-display)',
                textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Calculators', path: '/calculator' },
                { label: 'Sign In', path: '/auth' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => router.push(link.path)}
                    className="text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:-translate-x-1"
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-sans)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-neon-pink)';
                      e.currentTarget.style.textShadow = '0 0 10px rgba(255, 0, 110, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    &gt; {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{
                color: 'var(--color-neon-cyan)',
                fontFamily: 'var(--font-display)',
                textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
              }}
            >
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map((social) => (
                <button
                  key={social.label}
                  className="w-10 h-10 flex items-center justify-center border-3 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
                  style={{
                    background: 'var(--color-bg-tertiary)',
                    borderColor: 'var(--color-neon-purple)',
                    color: 'var(--color-neon-cyan)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-neon-cyan)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.4), 2px 2px 0 rgba(0, 0, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-neon-purple)';
                    e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0, 0, 0, 0.5)';
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 border-t-2 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--color-neon-purple)' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-wide flex items-center gap-2"
            style={{
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <span>&copy; {currentYear} Mortgage Calc</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Made with{' '}
              <Heart
                className="w-3 h-3"
                style={{
                  color: 'var(--color-neon-pink)',
                  fill: 'var(--color-neon-pink)',
                }}
              />{' '}
              in Retro Style
            </span>
          </p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <button
                key={item}
                className="text-xs font-bold uppercase tracking-wide transition-all duration-200"
                style={{
                  color: 'var(--color-text-tertiary)',
                  fontFamily: 'var(--font-sans)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-neon-cyan)';
                  e.currentTarget.style.textShadow = '0 0 10px rgba(0, 240, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-tertiary)';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
