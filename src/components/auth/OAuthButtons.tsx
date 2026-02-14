'use client';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export default function OAuthButtons() {
  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/calculator' });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all duration-200 border-3 hover:-translate-x-1 hover:-translate-y-1 shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
        style={{
          background: 'var(--color-bg-tertiary)',
          borderColor: 'var(--color-neon-purple)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-display)',
        }}
      >
        <FcGoogle className="w-5 h-5" />
        Continue with Google
      </button>
    </div>
  );
}
