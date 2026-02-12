'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse tracking
  const springConfig = { damping: 25, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        {/* Top-right gradient orb - follows mouse */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-cyan), transparent)',
            x: useSpring(
              useMotionValue(0),
              { damping: 30, stiffness: 50 }
            ),
            y: useSpring(
              useMotionValue(0),
              { damping: 30, stiffness: 50 }
            ),
            top: '10%',
            right: '10%',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Bottom-left gradient orb - follows mouse inversely */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-blue), transparent)',
            bottom: '10%',
            left: '10%',
          }}
          animate={{
            x: [0, -40, 50, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Center gradient orb - purple accent */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-8 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-purple), transparent)',
            top: '50%',
            left: '50%',
            marginTop: '-250px',
            marginLeft: '-250px',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Mouse follower orb - cyan */}
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-cyan), transparent)',
            x,
            y,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />

        {/* Secondary mouse follower orb - blue (lagging) */}
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-blue), transparent)',
            x: useSpring(mouseX, { damping: 40, stiffness: 60 }),
            y: useSpring(mouseY, { damping: 40, stiffness: 60 }),
            translateX: '-50%',
            translateY: '-50%',
          }}
        />

        {/* Animated lines/rays */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px opacity-5"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--color-accent-cyan), transparent)',
              width: '100%',
              top: `${20 + i * 30}%`,
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.05, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 
                ? 'var(--color-accent-cyan)' 
                : i % 3 === 1 
                ? 'var(--color-accent-blue)'
                : 'var(--color-accent-purple)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Radial grid pattern that pulses */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, transparent 0%, var(--color-bg-primary) 100%),
              repeating-radial-gradient(
                circle at 50% 50%,
                transparent,
                transparent 50px,
                rgba(6, 182, 212, 0.03) 51px,
                rgba(6, 182, 212, 0.03) 52px
              )
            `,
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
}
