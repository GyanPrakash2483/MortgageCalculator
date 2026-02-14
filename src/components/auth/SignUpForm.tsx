'use client';

import React, { useState } from 'react';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account');
      } else {
        setSuccess(true);
        setFormData({ name: '', email: '', password: '' });
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center border-3 p-6" style={{ borderColor: 'var(--color-neon-green)', background: 'rgba(57, 255, 20, 0.05)' }}>
        <div
          className="w-16 h-16 flex items-center justify-center border-3"
          style={{
            background: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-neon-green)',
            boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)',
          }}
        >
          <CheckCircle className="w-8 h-8" style={{ color: 'var(--color-neon-green)' }} />
        </div>
        <h3 
          className="text-xl font-bold uppercase tracking-wider neon-text" 
          style={{ 
            fontFamily: 'var(--font-display)',
            color: 'var(--color-neon-green)',
            textShadow: '0 0 20px rgba(57, 255, 20, 0.8)',
          }}
        >
          Check Your Email
        </h3>
        <p className="text-sm max-w-sm font-medium" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}>
          We&apos;ve sent a verification link to your email address. Please click the link to verify
          your account and sign in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        label="Full Name"
        placeholder="John Doe"
        icon={<User className="w-5 h-5" />}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        type="email"
        label="Email"
        placeholder="your@email.com"
        icon={<Mail className="w-5 h-5" />}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        type="password"
        label="Password"
        placeholder="••••••••"
        icon={<Lock className="w-5 h-5" />}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        minLength={6}
      />

      {error && (
        <div
          className="p-3 border-2 text-sm font-bold"
          style={{
            background: 'rgba(255, 0, 110, 0.1)',
            borderColor: 'var(--color-error)',
            color: 'var(--color-error)',
            textShadow: '0 0 10px rgba(255, 0, 110, 0.5)',
          }}
        >
          {error}
        </div>
      )}

      <Button type="submit" isLoading={isLoading} className="w-full mt-2">
        Create Account
      </Button>
    </form>
  );
}
