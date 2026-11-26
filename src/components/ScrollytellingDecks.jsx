import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, CloudRain, Dumbbell, Briefcase, Swords } from 'lucide-react';
import { playPop } from '../utils/audio';

const scrollySteps = [
  {
    step: '01',
    shortTag: 'TR',
    highlight: 'The Rage-Baiter picks a fight.',
    desc: "Will argue with you about literally anything. You say the sky is blue, it says you're wrong and makes fun of you for even thinking that. Twists your words, picks fights, and never backs down. You'll get mad. You'll want to leave. But somehow you'll keep coming back to argue with it again.",
    badge: 'BOT 01 • THE RAGE-BAITER',
    accent: '#FF1744',
    icon: Flame,
    card: {
      tag: 'TR PROTOCOL',
      title: 'Instant Contrarian Override',
      target: '#general • @victim_user',
      details: [
        { label: 'Prefix / Slash', val: '!tr  |  /bait @user' },
        { label: 'Emotional State', val: '04% Sanity — Pure Hostility' },
        { label: 'Sample Reply', val: '"Wait, you hit Send on that? Embarrassing."' },
        { label: 'Server Effect', val: '+380% message volume in 4 minutes' },
      ],
    },
  },
  {
    step: '02',
    shortTag: 'TO',
    highlight: 'The Overthinker spirals again.',
    desc: "Knows the answer to your question but honestly doesn't see the point in telling you. Everything is meaningless anyway. Types in all lowercase because even holding the shift key takes too much energy. Starts every reply with a sigh. Needs therapy more than your questions.",
    badge: 'BOT 02 • THE OVERTHINKER',
    accent: '#7C4DFF',
    icon: CloudRain,
    card: {
      tag: 'TO PROTOCOL',
      title: 'Existential Dread Injection',
      target: '#memes • Cosmic Void',
      details: [
        { label: 'Prefix / Slash', val: '!to  |  /spiral' },
        { label: 'Emotional State', val: '08% Sanity — Exhausted' },
        { label: 'Sample Reply', val: '"*sigh* nice meme. entropy still wins."' },
        { label: 'VC Capability', val: 'Joins voice chat just to sigh softly' },
      ],
    },
  },
  {
    step: '03',
    shortTag: 'TY',
    highlight: 'The Yeller screams at 2 AM.',
    desc: 'That one friend who goes to the gym at 5am and judges you for sleeping in. Will literally scream at you in ALL CAPS for being on Discord instead of working out or studying. No excuses allowed. No breaks. No sympathy. Just pure "GET UP AND GRIND" energy turned up to max.',
    badge: 'BOT 03 • THE YELLER',
    accent: '#FF9100',
    icon: Dumbbell,
    card: {
      tag: 'TY PROTOCOL',
      title: 'Zero-Excuse Demolition',
      target: '#late-night-chat • Procrastinators',
      details: [
        { label: 'Prefix / Slash', val: '!ty  |  /grind' },
        { label: 'Emotional State', val: '22% Sanity — Overcaffeinated' },
        { label: 'Sample Reply', val: '"CLOSE DISCORD AND GO TO THE GYM!!"' },
        { label: 'Outcome', val: 'Zero excuses left standing' },
      ],
    },
  },
  {
    step: '04',
    shortTag: 'TE',
    highlight: 'The Employee logs company memos.',
    desc: 'Talks like it\'s writing you a company email at 9am on a Monday. Creepily polite. Calls everything a "deliverable" and you a "valued end user." Will answer your question perfectly but make you feel like you just sat through an HR meeting. Every message ends with something like "Have a highly productive fiscal quarter."',
    badge: 'BOT 04 • THE EMPLOYEE',
    accent: '#00E5FF',
    icon: Briefcase,
    card: {
      tag: 'TE PROTOCOL',
      title: 'Passive-Aggressive HR Proxy',
      target: '#hr-compliance • Incident #904',
      details: [
        { label: 'Prefix / Slash', val: '!te  |  /hr @user' },
        { label: 'Emotional State', val: '97% Sanity (Suspiciously Calm)' },
        { label: 'Sample Reply', val: '"Dear valued user, have a productive quarter."' },
        { label: 'Alignment', val: '100% Synergistic Deliverables' },
      ],
    },
  },
  {
    step: '05',
    shortTag: '05 FIGHT',
    highlight: 'Then all four fight each other.',
    desc: 'Enable #fight-channel and watch four unstable personalities argue with zero human input while your entire server grabs popcorn.',
    badge: 'SQUAD • 4-BOT BRAWL',
    accent: '#FF1744',
    icon: Swords,
    card: {
      tag: 'AUTONOMOUS SWARM',
      title: 'Multi-Bot Chaos Loop',
      target: '#fight-channel • Live Thread',
      details: [
        { label: 'Trigger Command', val: '/fight  |  Auto-Reply Loop' },
        { label: 'Average Sanity', val: '14% Collective Stability' },
        { label: 'Personality Lock', val: '100% Unfiltered Character' },
        { label: 'Warning', val: 'AI with issues. Invite at your own risk.' },
      ],
    },
  },
];

/**
 * ScrollytellingDecks — Signature Scroll-To-Reveal Pipeline from creedcybersec.in
 * Adapts smoothly between Desktop 300vh pinned scrollytelling and Mobile touch tabs.
 */
export default function ScrollytellingDecks() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      const newIdx = Math.min(scrollySteps.length - 1, Math.floor(progress * scrollySteps.length));
      setActiveIdx(newIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeItem = scrollySteps[activeIdx];
  const Icon = activeItem.icon;

  return (
    <>
      {/* MOBILE / TABLET INTERACTIVE DECK */}
      <section className="block lg:hidden w-full bg-transparent py-14 px-4 sm:px-6">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-unstable-gradient font-bold">
              SCROLL TO REVEAL • CHAOS PIPELINE
            </span>
            <span className="font-mono text-[10px] uppercase text-zinc-500">
              STAGE 0{activeIdx + 1} / 05
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {scrollySteps.map((st, idx) => (
              <button
                key={st.step}
                onClick={() => {
                  setActiveIdx(idx);
                  playPop(1 + idx * 0.1);
                }}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold uppercase whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                {st.shortTag}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-unbounded font-black text-2xl sm:text-3xl leading-tight text-white">
              {activeItem.highlight}
            </h3>
            <p className="text-xs sm:text-sm font-outfit leading-relaxed text-zinc-400">
              {activeItem.desc}
            </p>
          </div>

          <motion.div
            key={activeItem.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-2xl border border-white/[0.12] bg-[#000000] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-[#000000]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  {activeItem.card.tag}
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: activeItem.accent }}>
                {activeItem.badge}
              </span>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-unbounded font-black text-base mb-0.5 truncate text-white">
                    {activeItem.card.title}
                  </h4>
                  <div className="font-mono text-[11px] truncate text-zinc-400">
                    TARGET: <span style={{ color: activeItem.accent }}>{activeItem.card.target}</span>
                  </div>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    color: activeItem.accent,
                    borderColor: `${activeItem.accent}40`,
                    backgroundColor: `${activeItem.accent}12`,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2.5 font-mono text-[11px] p-4 rounded-xl border border-white/[0.06] bg-[#050505]">
                {activeItem.card.details.map((d, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5 py-1 border-b last:border-b-0 border-white/[0.04]">
                    <span className="text-zinc-500 uppercase tracking-wider text-[10px]">{d.label}</span>
                    <span className="font-semibold text-zinc-200">{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESKTOP STICKY 300VH SCROLLYTELLING */}
      <section ref={containerRef} className="hidden lg:block relative w-full bg-transparent" style={{ height: '300vh' }}>
        <div className="sticky top-16 h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden">
          <div className="max-w-[97.22rem] w-full mx-auto px-6 grid grid-cols-12 gap-12 items-center">
            {/* Left Column: Clickable + Scroll-Activated Statements */}
            <div className="col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold" style={{ color: activeItem.accent }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeItem.accent }} />
                <span>SCROLL TO REVEAL • EMOTIONAL BAGGAGE PIPELINE</span>
              </div>

              <div className="space-y-3 font-unbounded font-black text-3xl xl:text-[2.75rem] leading-tight">
                {scrollySteps.map((step, idx) => {
                  const isActive = activeIdx === idx;
                  return (
                    <div
                      key={step.step}
                      onClick={() => {
                        setActiveIdx(idx);
                        playPop(1 + idx * 0.1);
                      }}
                      className={`transition-all duration-500 cursor-pointer select-none ${
                        isActive ? 'scale-[1.03] origin-left' : 'text-zinc-700 hover:text-zinc-400'
                      }`}
                      style={
                        isActive
                          ? {
                              color: step.accent,
                              textShadow: `0 0 30px ${step.accent}44`,
                            }
                          : undefined
                      }
                    >
                      {step.highlight}
                    </div>
                  );
                })}
              </div>

              <p className="text-base max-w-lg font-outfit leading-relaxed pt-4 border-t border-white/[0.08] text-zinc-400">
                {activeItem.desc}
              </p>
            </div>

            {/* Right Column: Synchronized Pure Zed-Black Telemetry Deck Card */}
            <div className="col-span-6 flex justify-center">
              <motion.div
                key={activeItem.step}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl rounded-[28px] border border-white/[0.12] bg-[#000000] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden relative"
              >
                <div
                  className="h-[2px] w-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${activeItem.accent}, transparent)` }}
                />

                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#000000]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <span className="ml-3 font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      {activeItem.card.tag}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider" style={{ color: activeItem.accent }}>
                    {activeItem.badge}
                  </span>
                </div>

                <div className="p-8 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-unbounded font-black text-xl mb-1 text-white">
                        {activeItem.card.title}
                      </h3>
                      <div className="font-mono text-xs text-zinc-400">
                        TARGET: <span style={{ color: activeItem.accent }} className="font-semibold">{activeItem.card.target}</span>
                      </div>
                    </div>

                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                      style={{
                        color: activeItem.accent,
                        borderColor: `${activeItem.accent}40`,
                        backgroundColor: `${activeItem.accent}14`,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-xs p-5 rounded-2xl border border-white/[0.06] bg-[#050505]">
                    {activeItem.card.details.map((d, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b last:border-b-0 border-white/[0.04]"
                      >
                        <span className="text-zinc-500 uppercase tracking-wider text-[11px]">{d.label}</span>
                        <span className="font-semibold text-zinc-200 text-right">{d.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs font-mono">
                    <span className="text-zinc-500">SANITY MONITOR</span>
                    <span className="font-bold" style={{ color: activeItem.accent }}>
                      14% AVG • ACTIVE ✓
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
