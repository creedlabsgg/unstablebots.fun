import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowDown, Flame, CloudRain, Dumbbell, Briefcase, Swords, Zap } from 'lucide-react';
import { BOTS, TAGLINES } from '../data/bots';
import { usePageTransition } from '../contexts/transitionHook';
import CyberGravityStream from './CyberGravityStream';
import TiltCard from './TiltCard';
import KineticManifesto from './KineticManifesto';
import ScrollytellingDecks from './ScrollytellingDecks';
import LiveDiscordArena from './LiveDiscordArena';
import CompleteCoverageMarquee from './CompleteCoverageMarquee';
import ConnectedChaosHub from './ConnectedChaosHub';
import CommunityProofGrid from './CommunityProofGrid';
import AnimatedLink from './AnimatedLink';
import { playPop } from '../utils/audio';

const BOT_ICONS = {
  'public-enemy': Flame,
  'lost-cause': CloudRain,
  'hard-truth': Dumbbell,
  'standard-issue': Briefcase,
};

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

function FloatingLaunchBotCard({ bot, index, onInvite }) {
  const Icon = BOT_ICONS[bot.id] || Flame;
  const [quoteIdx, setQuoteIdx] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 45, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <TiltCard auraColor={bot.aura} enableFloat={true} floatDelay={index * 0.45}>
        <div
          onClick={() => {
            setQuoteIdx((prev) => (prev + 1) % bot.sampleMessages.length);
            playPop(1 + index * 0.1);
          }}
          className="h-full rounded-3xl border border-white/[0.1] bg-[#000000]/95 p-6 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.95)] cursor-pointer group/bot"
        >
          <div>
            {/* Clean CreeD-style Icon & Sharp Monospace Label (NO PILLS) */}
            <div className="flex items-start justify-between gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform duration-300 group-hover/bot:scale-110"
                style={{
                  color: bot.color,
                  borderColor: `${bot.color}40`,
                  backgroundColor: `${bot.color}12`,
                  boxShadow: `0 0 22px ${bot.color}25`,
                }}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: bot.color }}>
                {bot.roleLabel}
              </span>
            </div>

            {/* Bot Identity */}
            <div className="mb-4">
              <h3 className="font-unbounded font-black text-xl text-white tracking-tight">
                {bot.name}
              </h3>
              <p className="font-outfit font-semibold text-sm mt-0.5" style={{ color: bot.color }}>
                {bot.subtitle}
              </p>
            </div>

            {/* Clean Typographic Sample Line */}
            <div className="border-l-2 pl-3.5 py-1 mb-5 min-h-[60px] flex items-center" style={{ borderColor: `${bot.color}66` }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIdx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed line-clamp-3"
                >
                  &ldquo;{bot.sampleMessages[quoteIdx]}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div>
            {/* Minimal Sanity Readout */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-500 tracking-wider">SANITY {bot.sanity}%</span>
                <span className="text-zinc-400">PERSONALITY 100%</span>
              </div>
              <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${bot.sanity}%` }}
                  transition={{ duration: 1.2, delay: 0.4 + index * 0.1 }}
                  className="h-full"
                  style={{ backgroundColor: bot.color }}
                />
              </div>
            </div>

            {/* Clean Footer Divider Action Row (CreeD CyberSec style) */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playPop(1.2);
                  onInvite(bot.id);
                }}
                className="font-unbounded font-bold text-xs uppercase tracking-wider text-white hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: bot.color }}
              >
                + Invite {bot.name}
              </button>
              <AnimatedLink
                to={`/bots#${bot.id}`}
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[11px] text-zinc-500 hover:text-white transition-colors"
              >
                {bot.prefix} / {bot.slash} →
              </AnimatedLink>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Hero() {
  const { openInviteModal } = usePageTransition();
  const [taglineIdx, setTaglineIdx] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const yHero = useSpring(useTransform(scrollYProgress, [0, 0.7], [0, 60]), { stiffness: 100, damping: 28 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % TAGLINES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-transparent text-white relative overflow-x-clip">
      {/* =====================================================================
          HERO LAUNCH VIEWPORT — ZED BLACK + 4 FLOATING BOT CARDS ON LAUNCH
         ===================================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-4.5rem)] flex flex-col items-center justify-center px-4 sm:px-6 pt-12 pb-16 overflow-hidden"
      >
        <CyberGravityStream />

        <motion.div style={{ y: yHero }} className="relative z-10 w-full max-w-[92rem] mx-auto flex flex-col items-center">
          {/* Clean Editorial Eyebrow (NO PILL) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="font-mono text-xs font-bold tracking-[0.26em] uppercase text-[#FF1744] mb-5 text-center"
          >
            SANITY: 14% · PERSONALITY: 100%
          </motion.div>

          {/* 3D Spring CreeD-Style Headline */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-unbounded font-black text-4xl sm:text-6xl lg:text-7xl xl:text-[4.75rem] leading-[1.03] tracking-tight text-center max-w-5xl mx-auto mb-5 flex flex-wrap justify-center gap-x-3.5 sm:gap-x-4 [perspective:1200px]"
          >
            {['Discord', 'bots', 'with'].map((w, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block text-white">
                {w}
              </motion.span>
            ))}
            <span className="inline-flex flex-wrap justify-center gap-x-3.5 text-unstable-gradient pb-1">
              {['emotional', 'baggage.'].map((w, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Rotating Editorial Subheadline (Zero Pill Clutter) */}
          <div className="mb-8 text-center max-w-2xl mx-auto space-y-1.5">
            <div className="h-7 overflow-hidden flex items-center justify-center">
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
            <p className="font-mono text-xs text-zinc-500">
              AI with issues. Invite at your own risk. Click any floating card to sample lines.
            </p>
          </div>

          {/* Primary Hero Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 mb-12"
          >
            <button
              onClick={() => {
                playPop(1.2);
                openInviteModal('all');
              }}
              className="px-7 py-3.5 rounded-2xl bg-[#FF1744] hover:bg-[#ff2c56] text-white font-unbounded font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer shadow-[0_0_35px_rgba(255,23,68,0.45)]"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Invite All 4 Bots</span>
            </button>

            <a
              href="#live-arena"
              onClick={() => playPop(1.0)}
              className="px-7 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-white font-unbounded font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Swords className="w-4 h-4 text-[#FF9100]" />
              <span>Test 4-Bot Fight Mode</span>
            </a>
          </motion.div>

          {/* THE 4 FLOATING BOT CARDS RIGHT ON LAUNCH */}
          <div id="bots" className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
            {BOTS.map((bot, i) => (
              <FloatingLaunchBotCard key={bot.id} bot={bot} index={i} onInvite={openInviteModal} />
            ))}
          </div>

          {/* Scroll to Reveal Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-12 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
              Scroll to reveal chaos
            </span>
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <ArrowDown className="w-4 h-4 text-[#FF1744]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: QUARK.BOT KINETIC MANIFESTO */}
      <KineticManifesto />

      {/* SECTION 3: CREEDCYBERSEC SCROLL-TO-REVEAL PIPELINE */}
      <ScrollytellingDecks />

      {/* SECTION 4: LIVE INTERACTIVE DISCORD ARENA */}
      <section id="live-arena" className="py-24 sm:py-28 px-4 sm:px-6 relative bg-[#000000]">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.25em] font-bold text-[#00E5FF] mb-3">
            LIVE SANDBOX · ZERO SIGNUP NEEDED
          </div>
          <h2 className="font-unbounded font-black text-3xl sm:text-5xl text-white mb-4">
            Provoke them yourself.
          </h2>
          <p className="font-outfit text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
            Pick a bot personality, type literally anything, or hit <span className="text-[#FF1744] font-bold">TRIGGER /fight</span> to watch all four lose their minds right here.
          </p>
        </div>

        <LiveDiscordArena />
      </section>

      {/* SECTION 5: QUARK.BOT COMPLETE COVERAGE MARQUEE */}
      <CompleteCoverageMarquee />

      {/* SECTION 6: QUARK.BOT CONNECTED CHAOS HUB */}
      <ConnectedChaosHub />

      {/* SECTION 7: QUARK.BOT COMMUNITY PROOF MARQUEE */}
      <CommunityProofGrid />

      {/* SECTION 8: METRICS + FINAL CTA */}
      <section className="py-20 border-y border-white/[0.06] bg-[#000000] relative">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '4', label: 'Unhinged Personalities', color: '#FF1744' },
            { value: '14%', label: 'Collective Sanity', color: '#7C4DFF' },
            { value: '100%', label: 'Pure Personality', color: '#FF9100' },
            { value: '0', label: 'Boring Disclaimers', color: '#00E5FF' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <div className="font-unbounded font-black text-4xl sm:text-6xl mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-28 sm:py-36 bg-[#000000] relative text-center px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#FF1744]/[0.06] blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="font-mono text-xs text-[#FF1744] uppercase tracking-[0.28em] font-bold mb-4">
            FINAL WARNING
          </div>
          <h2 className="font-unbounded font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.02] mb-6">
            AI with issues. <br />
            <span className="text-unstable-gradient">Invite at your own risk.</span>
          </h2>
          <p className="font-outfit text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto mb-10">
            Discord bots with emotional baggage. Sanity: 14%. Personality: 100%. Ready to ruin #general forever?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openInviteModal('all')}
              className="px-9 py-4 rounded-2xl bg-[#FF1744] hover:bg-[#ff2c56] text-white font-unbounded font-black text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_45px_rgba(255,23,68,0.5)]"
            >
              Deploy All 4 Bots
            </button>
            <AnimatedLink
              to="/community"
              className="px-9 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-unbounded font-bold text-sm uppercase tracking-wider transition-all"
            >
              Visit Asylum Community
            </AnimatedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
