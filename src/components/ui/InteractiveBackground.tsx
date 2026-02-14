'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Generate particle data only on client to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    top: number;
    xOffset: number;
    duration: number;
    delay: number;
  }>>([]);

  // Only generate particles on client mount
  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        xOffset: Math.random() * 100 - 50,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 5,
      }))
    );
  }, []);

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
      {/* Retro Grid Floor */}
      <div className="absolute inset-0">
        {/* Perspective Grid */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(0deg, transparent 0%, var(--color-bg-primary) 100%),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 40px,
                rgba(0, 240, 255, 0.1) 40px,
                rgba(0, 240, 255, 0.1) 41px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 40px,
                rgba(255, 0, 110, 0.1) 40px,
                rgba(255, 0, 110, 0.1) 41px
              )
            `,
            transform: 'perspective(500px) rotateX(60deg) scale(2)',
            transformOrigin: 'center bottom',
            opacity: 0.3,
          }}
        />

        {/* Neon Grid Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-neon-cyan) 2px, transparent 2px),
              linear-gradient(90deg, var(--color-neon-cyan) 2px, transparent 2px)
            `,
            backgroundSize: '80px 80px',
            opacity: 0.05,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '80px 80px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Glowing Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3), transparent)',
            top: '10%',
            right: '10%',
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.3, 0.9, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 110, 0.3), transparent)',
            bottom: '10%',
            left: '10%',
          }}
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.9, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(191, 0, 255, 0.2), transparent)',
            top: '50%',
            left: '50%',
            marginTop: '-250px',
            marginLeft: '-250px',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Mouse Followers with Retro Colors */}
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.4), transparent)',
            x,
            y,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />

        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 110, 0.3), transparent)',
            x: useSpring(mouseX, { damping: 40, stiffness: 60 }),
            y: useSpring(mouseY, { damping: 40, stiffness: 60 }),
            translateX: '-50%',
            translateY: '-50%',
          }}
        />

        {/* Animated Laser Lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`laser-${i}`}
            className="absolute h-0.5 w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${
                i % 2 === 0 ? 'var(--color-neon-cyan)' : 'var(--color-neon-pink)'
              }, transparent)`,
              top: `${15 + i * 18}%`,
              boxShadow: i % 2 === 0 ? 'var(--shadow-glow-cyan)' : 'var(--shadow-glow-pink)',
            }}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.2,
            }}
          />
        ))}

        {/* Floating Neon Particles */}
        {particles.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute w-2 h-2"
            style={{
              background: 
                particle.id % 4 === 0 
                  ? 'var(--color-neon-cyan)' 
                  : particle.id % 4 === 1 
                  ? 'var(--color-neon-pink)'
                  : particle.id % 4 === 2
                  ? 'var(--color-neon-purple)'
                  : 'var(--color-neon-yellow)',
              boxShadow: 
                particle.id % 4 === 0 
                  ? 'var(--shadow-glow-cyan)' 
                  : particle.id % 4 === 1 
                  ? 'var(--shadow-glow-pink)'
                  : 'var(--shadow-glow-purple)',
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, particle.xOffset, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}

        {/* Retro Sun/Circle */}
        <motion.div
          className="absolute left-1/2 top-20 -translate-x-1/2"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-neon-pink), var(--color-neon-yellow))',
            boxShadow: `
              0 0 20px var(--color-neon-pink),
              0 0 40px var(--color-neon-pink),
              0 0 60px var(--color-neon-pink),
              inset 0 0 30px rgba(0, 0, 0, 0.3)
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px var(--color-neon-pink), 0 0 40px var(--color-neon-pink), 0 0 60px var(--color-neon-pink)',
              '0 0 30px var(--color-neon-yellow), 0 0 60px var(--color-neon-yellow), 0 0 90px var(--color-neon-yellow)',
              '0 0 20px var(--color-neon-pink), 0 0 40px var(--color-neon-pink), 0 0 60px var(--color-neon-pink)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Inner rings */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transform: `scale(${0.6 + i * 0.15})`,
              }}
            />
          ))}
        </motion.div>

        {/* Pulsing Border Frame */}
        <motion.div
          className="absolute inset-8"
          style={{
            border: '3px solid var(--color-neon-cyan)',
            boxShadow: 'inset var(--shadow-glow-cyan)',
          }}
          animate={{
            borderColor: [
              'var(--color-neon-cyan)',
              'var(--color-neon-pink)',
              'var(--color-neon-purple)',
              'var(--color-neon-cyan)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  );
}
