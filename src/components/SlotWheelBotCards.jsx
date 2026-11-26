import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, ArrowRight, Dices, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { BOTS } from '../data/bots';
import { usePageTransition } from '../contexts/transitionHook';
import { playPop, playSlotTick, playSlotWin, playGrab } from '../utils/audio';

// Custom card styling parameters for each chaotic bot personality
const BOT_THEMES = {
  'public-enemy': {
    primary: '#FF1744',
    secondary: '#FFB703',
    glow: 'rgba(255, 23, 68, 0.5)',
    mist: ['#FF1744', '#FF9100', '#FFB703'],
    archetype: '01 / RAGE-BAITER',
    accentText: 'text-[#FF1744]',
    borderActive: 'border-[#FF1744]/70 shadow-[0_0_40px_rgba(255,23,68,0.35)]',
    tag: 'CHAOS GRADE A',
    aggression: 99,
    cooldown: '0.2s',
    drama: 'SSS',
  },
  'lost-cause': {
    primary: '#7C4DFF',
    secondary: '#00E5FF',
    glow: 'rgba(124, 77, 255, 0.45)',
    mist: ['#7C4DFF', '#3D5AFE', '#00E5FF'],
    archetype: '02 / DEPRESSED NIHILIST',
    accentText: 'text-[#B388FF]',
    borderActive: 'border-[#7C4DFF]/70 shadow-[0_0_40px_rgba(124,77,255,0.35)]',
    tag: 'VOID VOICED',
    aggression: 4,
    cooldown: '3.5s',
    drama: 'D-',
  },
  'hard-truth': {
    primary: '#FB8500',
    secondary: '#FFD166',
    glow: 'rgba(251, 133, 0, 0.5)',
    mist: ['#FB8500', '#FFB703', '#FFD166'],
    archetype: '03 / AGGRESSIVE MOTIVATOR',
    accentText: 'text-[#FFB703]',
    borderActive: 'border-[#FB8500]/70 shadow-[0_0_40px_rgba(251,133,0,0.35)]',
    tag: '5 AM COLD SHOWER',
    aggression: 92,
    cooldown: '0.1s',
    drama: 'A+',
  },
  'standard-issue': {
    primary: '#00E5FF',
    secondary: '#10B981',
    glow: 'rgba(0, 229, 255, 0.45)',
    mist: ['#00E5FF', '#00B0FF', '#10B981'],
    archetype: '04 / CORPORATE HR ASSISTANT',
    accentText: 'text-[#00E5FF]',
    borderActive: 'border-[#00E5FF]/70 shadow-[0_0_40px_rgba(0,229,255,0.35)]',
    tag: 'TICKET #404-HR',
    aggression: 12,
    cooldown: '1.0s',
    drama: 'HR PENDING',
  },
};

// Gentle wheel curvatures for the 4 horizontal slot positions
const WHEEL_ANGLES = [-4.5, -1.5, 1.5, 4.5];
const WHEEL_Y = [12, 0, 0, 12];

export default function SlotWheelBotCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [audioPlayingBot, setAudioPlayingBot] = useState(null);
  const { openInviteModal } = usePageTransition();
  const spinTimerRef = useRef(null);

  // Clean up spin timer on unmount
  useEffect(() => {
    return () => {
      if (spinTimerRef.current) clearInterval(spinTimerRef.current);
    };
  }, []);

  // Slot machine roll action: spins rapidly across the 4 bots and lands with a win chime
  const handleSlotSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    playGrab();

    let steps = 0;
    const totalSteps = 14 + Math.floor(Math.random() * 6);
    let currentIdx = activeIndex;

    spinTimerRef.current = setInterval(() => {
      currentIdx = (currentIdx + 1) % BOTS.length;
      setActiveIndex(currentIdx);
      playSlotTick(1 + (steps % 4) * 0.15);
      steps++;

      if (steps >= totalSteps) {
        clearInterval(spinTimerRef.current);
        setIsSpinning(false);
        playSlotWin();
      }
    }, 75);
  };

  const handlePrev = () => {
    playPop(0.9);
    setActiveIndex((prev) => (prev === 0 ? BOTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playPop(1.1);
    setActiveIndex((prev) => (prev + 1) % BOTS.length);
  };

  const playVoiceSample = (botId) => {
    setAudioPlayingBot(botId);
    playPop(1.4);
    setTimeout(() => {
      playPop(0.8);
      setTimeout(() => setAudioPlayingBot(null), 1200);
    }, 200);
  };

  const effectiveHovered = hoveredIndex !== null ? hoveredIndex : null;

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-[97.22rem] mx-auto overflow-hidden">
      {/* Background Ambient Cyber Lighting */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center -z-10">
        <div className="w-[600px] h-[350px] bg-gradient-to-r from-[#FFB703]/10 via-[#FB8500]/15 to-[#FF1744]/10 blur-[120px] rounded-full" />
      </div>

      {/* Section Header with Neko / CreeD Bento Details */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0a0a0c] border border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#FFB703] font-bold mb-4 shadow-[0_0_20px_rgba(255,183,3,0.15)]">
          <Activity className="w-3.5 h-3.5 animate-pulse text-[#FFB703]" />
          <span>CYBER HORIZONTAL WHEEL • 4 LAUNCH PROTOCOLS</span>
        </div>
        <h2 className="font-unbounded font-black text-3xl sm:text-5xl text-white mb-4 tracking-tight">
          Pick Your <span className="text-gold-gradient">Mental Breakdown.</span>
        </h2>
        <p className="font-outfit text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
          Hover to focus a bot and fade the others. Or trigger the asylum slot machine to randomly unleash one into your Discord server.
        </p>

        {/* Slot Controls & Quick Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <button
            onClick={handleSlotSpin}
            disabled={isSpinning}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFB703] via-[#FB8500] to-[#FF1744] text-black font-unbounded font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(255,183,3,0.35)] hover:scale-105 active:scale-95 ${
              isSpinning ? 'opacity-80 animate-pulse' : ''
            }`}
          >
            <Dices className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'ROLLING REEL...' : 'SPIN ASYLUM SLOT'}</span>
          </button>

          <div className="flex items-center gap-1 bg-[#0a0a0c] border border-white/10 rounded-full p-1">
            <button
              onClick={handlePrev}
              aria-label="Previous Bot"
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-zinc-400 px-2 font-bold">
              {activeIndex + 1} / {BOTS.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next Bot"
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* The 4-Card Horizontal Wheel Slot Machine */}
      <div className="relative w-full max-w-7xl mx-auto perspective-1200 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 preserve-3d">
          {BOTS.map((bot, index) => {
            const theme = BOT_THEMES[bot.id] || BOT_THEMES['public-enemy'];
            const isHovered = effectiveHovered === index;
            const isFaded = effectiveHovered !== null && effectiveHovered !== index;
            const isSlotTarget = activeIndex === index;

            // Compute slight wheel curvature
            const naturalAngle = WHEEL_ANGLES[index];
            const naturalY = WHEEL_Y[index];

            return (
              <motion.div
                key={bot.id}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  playPop(1 + index * 0.12);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  rotateZ: isHovered ? 0 : naturalAngle,
                  y: isHovered ? -16 : isSlotTarget ? -6 : naturalY,
                  scale: isHovered ? 1.03 : isFaded ? 0.96 : 1,
                  opacity: isFaded ? 0.32 : 1,
                  filter: isFaded ? 'blur(1px)' : 'blur(0px)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 24,
                }}
                className={`relative rounded-3xl bg-[#050505] border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group ${
                  isHovered || (effectiveHovered === null && isSlotTarget)
                    ? theme.borderActive
                    : 'border-white/[0.08] hover:border-white/20'
                }`}
                style={{
                  minHeight: '480px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* CreeD Labs Engine Pricing Ambient Flame/Mist Background */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none bg-[#050505]">
                  <div
                    className={`absolute top-0 inset-x-0 h-[85%] transition-opacity duration-700 mix-blend-screen ${
                      isHovered ? 'opacity-90' : isSlotTarget ? 'opacity-70' : 'opacity-40'
                    }`}
                    style={{
                      WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 25%, transparent 100%)',
                    }}
                  >
                    <div
                      className="absolute -top-16 -left-16 w-64 h-64 blur-[60px] rounded-full"
                      style={{ backgroundColor: theme.mist[0], opacity: 0.65 }}
                    />
                    <div
                      className="absolute -top-16 -right-16 w-64 h-64 blur-[60px] rounded-full"
                      style={{ backgroundColor: theme.mist[1], opacity: 0.65 }}
                    />
                    <div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 w-72 h-56 blur-[65px] rounded-[100%]"
                      style={{ backgroundColor: theme.mist[2], opacity: 0.5 }}
                    />
                  </div>

                  {/* Top neon highlight seam line */}
                  <div
                    className="absolute top-0 inset-x-0 h-px transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to right, transparent, ${theme.primary}, transparent)`,
                      opacity: isHovered || isSlotTarget ? 1 : 0.3,
                    }}
                  />
                </div>

                {/* Card Top Bento Content */}
                <div className="p-6 relative z-10 flex flex-col">
                  {/* Monospace Header & Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] text-zinc-400 font-bold tracking-widest uppercase">
                      [ {theme.archetype} ]
                    </span>
                    <span
                      className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/10 uppercase tracking-wider"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: theme.primary,
                      }}
                    >
                      {theme.tag}
                    </span>
                  </div>

                  {/* Bot Identity */}
                  <div className="mb-4">
                    <h3 className="font-unbounded font-black text-2xl text-white tracking-tight group-hover:text-white flex items-center gap-2">
                      <span>{bot.name}</span>
                      <span className="text-xs font-mono font-normal text-zinc-400">{bot.slash || bot.prefix}</span>
                    </h3>
                    <p className={`font-mono text-xs font-bold uppercase tracking-wide mt-1 ${theme.accentText}`}>
                      {bot.subtitle}
                    </p>
                  </div>

                  {/* Clean Quote Box (No rounded AI pills) */}
                  <div className="my-3 p-3.5 rounded-2xl bg-black/75 border-l-2 border-white/20 font-outfit text-xs text-zinc-300 italic leading-relaxed">
                    &ldquo;{bot.sampleMessages?.[0] || 'AI with emotional baggage.'}&rdquo;
                  </div>

                  {/* Micro Bento Node Specs (Image 2 style) */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/[0.06]">
                    <div className="bg-[#0a0a0c]/80 rounded-xl p-2.5 border border-white/[0.04]">
                      <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">AGGRESSION</div>
                      <div className="font-unbounded font-bold text-xs text-white mt-0.5">
                        {theme.aggression}%
                      </div>
                    </div>
                    <div className="bg-[#0a0a0c]/80 rounded-xl p-2.5 border border-white/[0.04]">
                      <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">SANITY</div>
                      <div className="font-unbounded font-bold text-xs text-white mt-0.5">
                        {bot.sanity}%
                      </div>
                    </div>
                    <div className="bg-[#0a0a0c]/80 rounded-xl p-2.5 border border-white/[0.04]">
                      <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">COOLDOWN</div>
                      <div className="font-unbounded font-bold text-xs text-white mt-0.5">
                        {theme.cooldown}
                      </div>
                    </div>
                    <div className="bg-[#0a0a0c]/80 rounded-xl p-2.5 border border-white/[0.04]">
                      <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">DRAMA RATING</div>
                      <div className="font-unbounded font-bold text-xs text-[#FFB703] mt-0.5">
                        {theme.drama}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Actions (Fine details arrow button & voice trigger) */}
                <div className="p-6 pt-0 relative z-10 flex items-center justify-between gap-3 border-t border-white/[0.04] mt-4">
                  {/* Voice Preview Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playVoiceSample(bot.id);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white font-mono text-[11px] transition-all cursor-pointer"
                    title="Play Bot Audio Transmission"
                  >
                    <Volume2
                      className={`w-3.5 h-3.5 ${
                        audioPlayingBot === bot.id ? 'animate-bounce text-[#FFB703]' : ''
                      }`}
                    />
                    <span>{audioPlayingBot === bot.id ? 'SYNTHING...' : 'TRANSMIT'}</span>
                  </button>

                  {/* Invite Button with Glowing Circular Arrow (Image 1 Fine Details) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playPop(1.2);
                      openInviteModal(bot.id);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-black font-unbounded font-black text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                    style={{
                      backgroundColor: theme.secondary || '#FFB703',
                    }}
                  >
                    <span>INVITE</span>
                    <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-black" strokeWidth={3} />
                    </div>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
