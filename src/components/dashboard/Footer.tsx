'use client';

import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-16 border-t py-12"
      style={{
        borderColor: '#e5e7eb',
        background: 'var(--color-bg-secondary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3
              className="text-lg font-bold tracking-tight mb-4"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-primary)',
              }}
            >
              Mortgage Calc
            </h3>
            <p
              className="text-sm font-medium mb-4"
              style={{
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Financial Calculator
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
              className="text-sm font-semibold mb-4"
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-sans)',
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
                    className="text-sm transition-all duration-200 hover:translate-x-1"
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-sans)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent-blue)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-sans)',
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
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: '#f3f4f6',
                    color: 'var(--color-text-primary)',
                  }}
                  aria-label={social.label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-accent-blue)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: '#e5e7eb' }}
        >
          <p
            className="text-sm flex items-center gap-2"
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
                  color: 'var(--color-accent-pink)',
                  fill: 'var(--color-accent-pink)',
                }}
              />{' '}
              for your future
            </span>
          </p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <button
                key={item}
                className="text-sm transition-all duration-200"
                style={{
                  color: 'var(--color-text-tertiary)',
                  fontFamily: 'var(--font-sans)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-tertiary)';
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
