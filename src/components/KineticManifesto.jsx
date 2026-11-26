import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function ScrollyWord({ word, index, total, progress, isAccent, accentColor, glowColor }) {
  const step = 0.7 / total;
  const wordStart = 0.12 + index * step;

  const opacity = useTransform(progress, [wordStart - step * 0.5, wordStart], [0.14, 1]);
  const y = useTransform(progress, [wordStart - step * 0.5, wordStart], [18, 0]);
  const blurVal = useTransform(progress, [wordStart - step * 0.5, wordStart], [5, 0]);
  const scale = useTransform(progress, [wordStart - step * 0.5, wordStart], [0.96, 1]);

  const filterTransform = useTransform(blurVal, (v) => {
    const baseBlur = `blur(${v}px)`;
    if (isAccent && v < 2) {
      return `${baseBlur} drop-shadow(0 0 ${18 * (1 - v / 2)}px ${glowColor})`;
    }
    return baseBlur;
  });

  return (
    <span className="inline-block mr-2.5 sm:mr-3.5 md:mr-4 mb-1.5 sm:mb-2 relative">
      <motion.span
        style={{
          opacity,
          y,
          scale,
          filter: filterTransform,
          willChange: 'opacity, transform, filter',
          color: isAccent ? accentColor : '#ffffff',
        }}
        className="inline-block select-none"
      >
        {word}
      </motion.span>
    </span>
  );
}

/**
 * KineticManifesto — Quark.bot & creedcybersec.in Sticky Scroll-To-Reveal Manifesto
 */
export default function KineticManifesto() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const phrases = [
    {
      id: 'egos',
      words: [
        { text: 'Every', isAccent: false },
        { text: 'ego', isAccent: false },
        { text: 'humbled.', isAccent: true, accentColor: '#FF1744', glowColor: 'rgba(255, 23, 68, 0.7)' },
      ],
    },
    {
      id: 'vibes',
      words: [
        { text: 'Every', isAccent: false },
        { text: 'excuse', isAccent: false },
        { text: 'demolished.', isAccent: true, accentColor: '#FF9100', glowColor: 'rgba(255, 145, 0, 0.7)' },
      ],
    },
    {
      id: 'sanity',
      words: [
        { text: 'Zero', isAccent: false },
        { text: 'sanity', isAccent: false },
        { text: 'remaining.', isAccent: true, accentColor: '#7C4DFF', glowColor: 'rgba(124, 77, 255, 0.7)' },
      ],
    },
  ];

  const allWords = phrases.flatMap((p) => p.words);

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between overflow-hidden px-4 sm:px-6 pt-28 sm:pt-32 pb-8 sm:pb-10 select-none">
        {/* Radial Aura */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[680px] h-[520px] sm:h-[680px] rounded-full blur-[150px] opacity-20 bg-gradient-to-tr from-[#FF1744]/25 via-[#FF9100]/20 to-[#7C4DFF]/25" />
        </div>

        {/* Clean Monospace Eyebrow (NO PILL) */}
        <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#FF1744] font-bold shrink-0">
          Sanity: 14% · Personality: 100%
        </div>

        {/* Center Word-by-Word Scroll Reveal */}
        <div className="my-auto w-full max-w-5xl flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] font-unbounded font-black tracking-tight leading-[1.18] sm:leading-[1.22] flex flex-col items-center justify-center text-center w-full">
            {phrases.map((phrase, pIdx) => {
              const startIndex = phrases.slice(0, pIdx).reduce((acc, p) => acc + p.words.length, 0);
              return (
                <span key={phrase.id} className="flex flex-wrap justify-center items-center text-center my-0.5 sm:my-1">
                  {phrase.words.map((item, wIdx) => {
                    const globalIdx = startIndex + wIdx;
                    return (
                      <ScrollyWord
                        key={globalIdx}
                        word={item.text}
                        index={globalIdx}
                        total={allWords.length}
                        progress={scrollYProgress}
                        isAccent={item.isAccent}
                        accentColor={item.accentColor}
                        glowColor={item.glowColor}
                      />
                    );
                  })}
                </span>
              );
            })}
          </h2>
        </div>

        {/* Exact creedcybersec.in Scroll To Reveal Cue */}
        <div className="flex flex-col items-center gap-2 pointer-events-none opacity-75 shrink-0">
          <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
            Scroll to reveal
          </span>
          <div className="w-1 h-5 rounded-full bg-zinc-800 overflow-hidden">
            <div className="w-full h-1/2 bg-[#FF1744] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
