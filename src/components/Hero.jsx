import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Swords, Zap, ArrowDown, Activity, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import { TAGLINES } from '../data/bots';
import { usePageTransition } from '../contexts/transitionHook';
import CyberGravityStream from './CyberGravityStream';
import SlotWheelBotCards from './SlotWheelBotCards';
import KineticManifesto from './KineticManifesto';
import ScrollytellingDecks from './ScrollytellingDecks';
import LiveDiscordArena from './LiveDiscordArena';
import CompleteCoverageMarquee from './CompleteCoverageMarquee';
import ConnectedChaosHub from './ConnectedChaosHub';
import CommunityProofGrid from './CommunityProofGrid';
import AnimatedLink from './AnimatedLink';
import { playPop } from '../utils/audio';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 36, rotateX: -75 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
};

export default function Hero() {
  const heroRef = useRef(null);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const { openInviteModal } = usePageTransition();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const yHero = useSpring(useTransform(scrollYProgress, [0, 0.7], [0, 60]), { stiffness: 100, damping: 28 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % TAGLINES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-transparent text-white relative overflow-x-clip">
      {/* =====================================================================
          FIRST FRAME: CENTERED STAGE HERO (No static cards crowding initial view)
         ===================================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 sm:px-6 pt-8 pb-16 overflow-hidden"
      >
        <CyberGravityStream />

        {/* Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#FFB703]/12 via-[#FB8500]/15 to-[#FF1744]/12 blur-[140px] rounded-full pointer-events-none" />

        <motion.div style={{ y: yHero }} className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Top Eyebrow Badge (Clean Monospace, Zero Pill Clutter) */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050505]/90 border border-[#FFB703]/25 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#FFB703] mb-6 shadow-[0_0_25px_rgba(255,183,3,0.15)]"
          >
            <Activity className="w-3.5 h-3.5 text-[#FFB703] animate-pulse" />
            <span>SANITY: 14% · PERSONALITY: 100% · AI WITH ISSUES</span>
          </motion.div>

          {/* Center Stage Headline */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-unbounded font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[1.04] tracking-tight text-center max-w-5xl mx-auto mb-6 flex flex-wrap justify-center gap-x-3 sm:gap-x-4.5 [perspective:1200px]"
          >
            {['Discord', 'bots', 'with'].map((w, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block text-white drop-shadow-2xl">
                {w}
              </motion.span>
            ))}
            <span className="inline-flex flex-wrap justify-center gap-x-3.5 text-gold-gradient pb-1">
              {['emotional', 'baggage.'].map((w, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block drop-shadow-[0_0_30px_rgba(255,183,3,0.3)]">
                  {w}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Rotating Taglines */}
          <div className="mb-8 text-center max-w-2xl mx-auto space-y-2">
            <div className="h-8 overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIdx}
                  initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35 }}
                  className="font-outfit text-base sm:text-xl font-medium text-zinc-300"
                >
                  {TAGLINES[taglineIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="font-mono text-xs text-zinc-400">
              AI with issues. Invite at your own risk. 4 chaotic personalities ready to infect #general.
            </p>
          </div>

          {/* Primary Action Controls */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 mb-10"
          >
            <button
              onClick={() => {
                playPop(1.2);
                openInviteModal('all');
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FFB703] via-[#FB8500] to-[#FF1744] hover:brightness-110 text-black font-unbounded font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all hover:scale-[1.04] active:scale-95 cursor-pointer shadow-[0_0_35px_rgba(255,183,3,0.35)]"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Invite All 4 Bots</span>
            </button>

            <a
              href="#slot-wheel"
              onClick={() => playPop(1.0)}
              className="px-7 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-white font-unbounded font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer hover:border-white/25"
            >
              <Swords className="w-4 h-4 text-[#FFB703]" />
              <span>Roll The Bot Slot</span>
            </a>
          </motion.div>

          {/* Live Server Proof Bar (NekoTickets style) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 border-t border-white/[0.08] text-xs font-mono text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
              <span className="font-bold text-white">12,450+</span> Servers Connected
            </div>
            <div className="hidden sm:inline-block text-zinc-700">•</div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#FFB703]" />
              <span className="font-bold text-white">4.8M</span> Chaotic Messages
            </div>
            <div className="hidden sm:inline-block text-zinc-700">•</div>
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span className="font-bold text-white">0%</span> Corporate Politeness
            </div>
          </motion.div>

          {/* Scroll Down Cue */}
          <motion.a
            href="#slot-wheel"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="mt-10 inline-flex flex-col items-center gap-1.5 text-zinc-500 hover:text-[#FFB703] transition-colors cursor-pointer"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase">DISCOVER THE ROSTER</span>
            <ArrowDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </section>

      {/* =====================================================================
          SECTION 2: HORIZONTAL SLOT-WHEEL BOT CARDS (CreeD Pricing Mist & Glow)
         ===================================================================== */}
      <div id="slot-wheel">
        <SlotWheelBotCards />
      </div>

      {/* =====================================================================
          SECTION 3: KINETIC MANIFESTO — SCROLL SCRUB TEXT REVEAL
         ===================================================================== */}
      <KineticManifesto />

      {/* =====================================================================
          SECTION 4: SCROLLYTELLING DECKS (Sticky 300vh Bot Protocols)
         ===================================================================== */}
      <ScrollytellingDecks />

      {/* =====================================================================
          SECTION 5: LIVE DISCORD SIMULATOR ARENA (With 4-Bot Fight Mode)
         ===================================================================== */}
      <div id="live-arena">
        <LiveDiscordArena />
      </div>

      {/* =====================================================================
          SECTION 6: INFINITE FEATURE MARQUEES (Quark-Style)
         ===================================================================== */}
      <CompleteCoverageMarquee />

      {/* =====================================================================
          SECTION 7: CONNECTED CHAOS HUB (Quark SVG Curved Beams)
         ===================================================================== */}
      <ConnectedChaosHub />

      {/* =====================================================================
          SECTION 8: COMMUNITY EVIDENCE TESTIMONIALS (Vertical Marquees)
         ===================================================================== */}
      <CommunityProofGrid />

      {/* =====================================================================
          SECTION 9: PRE-FOOTER INVASION CTA
         ===================================================================== */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-transparent via-[#050505] to-[#000000]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#FFB703]/30 font-mono text-xs uppercase tracking-widest text-[#FFB703] font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCORD SERVER INVASION PROTOCOL</span>
          </div>

          <h2 className="font-unbounded font-black text-3xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
            Ready to Ruin <span className="text-gold-gradient">#general?</span>
          </h2>

          <p className="font-outfit text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10">
            Discord bots with emotional baggage. Sanity: 14%. Personality: 100%. Invite at your own risk.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                playPop(1.2);
                openInviteModal('all');
              }}
              className="px-9 py-4 rounded-2xl bg-gradient-to-r from-[#FFB703] via-[#FB8500] to-[#FF1744] hover:brightness-110 text-black font-unbounded font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_40px_rgba(255,183,3,0.4)]"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Invite The 4 Bots Now</span>
            </button>

            <AnimatedLink
              to="/pricing"
              className="px-8 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-unbounded font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
            >
              <span>View Pricing Plans</span>
            </AnimatedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
