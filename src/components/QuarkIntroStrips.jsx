import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * QuarkIntroStrips — Stealth Editorial Parting Curtain Reveal on initial `/` visit
 * Alternating #09090b & #151518 horizontal strips with hardware-accelerated slide wipe
 */
const stripsData = [
  {
    id: 1,
    word: 'EMOTIONAL',
    dir: -1,
    bg: 'bg-[#09090b]',
    textGradient: 'linear-gradient(135deg, #FF1744 0%, #FF6D00 65%, #FF9100 100%)',
    desktopClass: 'sm:justify-start sm:pl-[8vw]',
  },
  {
    id: 2,
    word: 'BAGGAGE',
    dir: 1,
    bg: 'bg-[#121215]',
    textGradient: 'linear-gradient(135deg, #7C4DFF 0%, #B388FF 60%, #00E5FF 100%)',
    desktopClass: 'sm:justify-end sm:pr-[10vw]',
  },
  {
    id: 3,
    word: 'SANITY 14%',
    dir: -1,
    bg: 'bg-[#09090b]',
    textGradient: 'linear-gradient(135deg, #FF1744 0%, #FF9100 50%, #00E5FF 100%)',
    desktopClass: 'sm:justify-center sm:px-4',
  },
  {
    id: 4,
    word: 'ZERO FILTER',
    dir: 1,
    bg: 'bg-[#121215]',
    textGradient: 'linear-gradient(135deg, #FF9100 0%, #FF1744 70%, #D50000 100%)',
    desktopClass: 'sm:justify-start sm:pl-[13vw]',
  },
  {
    id: 5,
    word: 'UNSTABLE.FUN',
    dir: -1,
    bg: 'bg-[#09090b]',
    textGradient: 'linear-gradient(135deg, #00E5FF 0%, #7C4DFF 60%, #FF1744 100%)',
    desktopClass: 'sm:justify-end sm:pr-[8vw]',
  },
];

export default function QuarkIntroStrips() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.location.pathname !== '/') return false;
    return !window.__unstableIntroPlayed;
  });

  const [textSlideIn, setTextSlideIn] = useState(false);
  const [stripsSlideOut, setStripsSlideOut] = useState(false);

  useEffect(() => {
    if (!visible) return;
    window.__unstableIntroPlayed = true;

    const startTextAnimation = () => {
      requestAnimationFrame(() => setTextSlideIn(true));
    };

    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(startTextAnimation);
      const fallbackTimer = setTimeout(startTextAnimation, 120);
      return () => clearTimeout(fallbackTimer);
    } else {
      startTextAnimation();
    }
  }, [visible]);

  useEffect(() => {
    if (!textSlideIn) return;
    const exitTimer = setTimeout(() => setStripsSlideOut(true), 1100);
    const hideTimer = setTimeout(() => setVisible(false), 1950);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [textSlideIn]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex flex-col select-none overflow-hidden bg-transparent pointer-events-auto">
        {stripsData.map((strip, idx) => (
          <motion.div
            key={strip.id}
            initial={{ x: 0 }}
            animate={stripsSlideOut ? { x: strip.dir === -1 ? '-105%' : '105%' } : { x: 0 }}
            transition={{
              duration: 0.78,
              delay: idx * 0.03,
              ease: [0.87, 0, 0.13, 1],
            }}
            className={`relative flex-1 w-full ${strip.bg} flex items-center justify-center ${strip.desktopClass} px-3 sm:px-0 overflow-hidden border-b border-white/[0.05]`}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
              }}
            />

            <motion.div
              initial={{ x: strip.dir === -1 ? -60 : 60, opacity: 0, filter: 'blur(4px)' }}
              animate={
                textSlideIn
                  ? { x: 0, opacity: 1, filter: 'blur(0px)' }
                  : { x: strip.dir === -1 ? -60 : 60, opacity: 0, filter: 'blur(4px)' }
              }
              transition={{
                duration: 0.6,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 whitespace-nowrap will-change-transform max-w-full text-center sm:text-left"
            >
              <span
                className="font-unbounded font-black text-[clamp(1.35rem,6.8vw,2.75rem)] sm:text-[9vh] md:text-[11vh] lg:text-[12.5vh] uppercase select-none leading-none tracking-tight sm:tracking-[-0.04em] block max-w-full"
                style={{
                  background: strip.textGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {strip.word}
              </span>
            </motion.div>
          </motion.div>
        ))}

        {/* Skip button in bottom-right corner */}
        <button
          onClick={() => {
            setStripsSlideOut(true);
            setTimeout(() => setVisible(false), 600);
          }}
          className="fixed bottom-5 right-6 z-[100000] px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 font-mono text-[10px] uppercase tracking-widest border border-white/10 transition-colors cursor-pointer"
        >
          Skip Intro ✕
        </button>
      </div>
    </AnimatePresence>
  );
}
