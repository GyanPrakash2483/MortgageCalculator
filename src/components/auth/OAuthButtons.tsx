'use client';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export default function OAuthButtons() {
  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-primary)',
        }}
      >
        <FcGoogle className="w-5 h-5" />
        Continue with Google
      </button>
    </div>
  );
}
