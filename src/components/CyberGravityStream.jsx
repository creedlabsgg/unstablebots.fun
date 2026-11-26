import React from 'react';
import { motion } from 'framer-motion';

/**
 * CyberGravityStream — Subtle Background Falling Neon Streams
 * Inspired by CreeD CyberSec & CreeD Labs Engine
 */
export default function CyberGravityStream() {
  const streams = Array.from({ length: 18 }).map((_, i) => {
    const colors = ['#FF1744', '#7C4DFF', '#FF9100', '#00E5FF'];
    return {
      leftPct: ((i * 5.6 + (i % 3) * 2.5) % 96) + 2,
      duration: 3.6 + (i % 4) * 1.1,
      delay: (i * 0.45) % 3,
      color: colors[i % colors.length],
    };
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25 flex justify-center w-full select-none">
      <div className="w-full max-w-[1440px] relative h-full">
        {streams.map((s, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-24 sm:h-36"
            style={{
              left: `${s.leftPct}%`,
              top: '-15vh',
              background: `linear-gradient(to bottom, transparent, ${s.color}, transparent)`,
            }}
            animate={{
              y: ['0vh', '130vh'],
              opacity: [0, 0.85, 0],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: s.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
