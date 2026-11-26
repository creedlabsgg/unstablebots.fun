import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltCard — 3D Gyroscopic Spring Card with Depth Layers & Ambient Flame Mist
 * Grounded directly in CreeD Labs Engine / CreeD CyberSec physics
 */
export default function TiltCard({
  children,
  className = '',
  auraColor = 'crimson', // 'crimson' | 'violet' | 'amber' | 'cyan'
  enableFloat = true,
  floatDelay = 0,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 28 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 28 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const auraMap = {
    crimson: {
      c1: 'bg-rose-600/70',
      c2: 'bg-red-600/70',
      c3: 'bg-orange-500/45',
      border: 'via-[#FF1744]',
      shadowGlow: 'group-hover:bg-[#FF1744]/[0.09]',
    },
    violet: {
      c1: 'bg-violet-600/70',
      c2: 'bg-purple-600/70',
      c3: 'bg-indigo-400/50',
      border: 'via-[#7C4DFF]',
      shadowGlow: 'group-hover:bg-[#7C4DFF]/[0.09]',
    },
    amber: {
      c1: 'bg-amber-500/70',
      c2: 'bg-orange-600/70',
      c3: 'bg-yellow-400/45',
      border: 'via-[#FF9100]',
      shadowGlow: 'group-hover:bg-[#FF9100]/[0.09]',
    },
    cyan: {
      c1: 'bg-cyan-500/70',
      c2: 'bg-sky-600/70',
      c3: 'bg-teal-400/50',
      border: 'via-[#00E5FF]',
      shadowGlow: 'group-hover:bg-[#00E5FF]/[0.09]',
    },
  };

  const aura = auraMap[auraColor] || auraMap.crimson;

  return (
    <motion.div
      animate={enableFloat ? { y: [0, -10, 0] } : undefined}
      transition={
        enableFloat
          ? { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }
          : undefined
      }
      className="w-full h-full [perspective:1000px]"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full h-full group transition-all duration-300 ${className}`}
      >
        {/* 3D Depth Glow */}
        <div
          style={{ transform: 'translateZ(-25px)' }}
          className={`absolute inset-0 bg-white/[0.02] blur-2xl rounded-3xl transition-colors duration-500 ${aura.shadowGlow} pointer-events-none`}
        />

        {/* Ambient Mist Backdrop */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 inset-x-0 h-[85%] opacity-40 group-hover:opacity-85 transition-opacity duration-700 mix-blend-screen"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
            }}
          >
            <div className={`absolute -top-16 -left-16 w-56 h-56 ${aura.c1} blur-[55px] rounded-full`} />
            <div className={`absolute -top-16 -right-16 w-56 h-56 ${aura.c2} blur-[55px] rounded-full`} />
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-64 h-48 ${aura.c3} blur-[65px] rounded-[100%]`} />
          </div>

          {/* Hairline Top Accent */}
          <div
            className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent ${aura.border} to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
          />
        </div>

        {/* Elevated Inner Content */}
        <div style={{ transform: 'translateZ(22px)' }} className="w-full h-full relative z-10">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
