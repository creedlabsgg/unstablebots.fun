import React, { useState } from 'react';
import {
  Flame,
  CloudRain,
  Dumbbell,
  Briefcase,
  Swords,
  Mic,
  Terminal,
  Zap,
  ShieldAlert,
  MessageSquare,
  Sparkles,
  Volume2,
  Skull,
  Radio,
  Bot,
} from 'lucide-react';

function CoverageCard({ item }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const Icon = item.icon;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse((prev) => ({ ...prev, active: false }))}
      className="group/card relative h-32 w-80 shrink-0 rounded-2xl border border-white/10 bg-[#000000] hover:border-white/20 px-6 py-5 overflow-hidden transition-all duration-300 select-none"
    >
      {/* Dot Grid Background (Quark Signature) */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Dynamic Radial Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover/card:opacity-100 z-10"
        style={{
          background: `radial-gradient(240px circle at ${mouse.x}px ${mouse.y}px, ${item.color}25, transparent 80%)`,
        }}
      />

      {/* Mask Composite Border Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover/card:opacity-100 z-10"
        style={{
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          background: `radial-gradient(200px circle at ${mouse.x}px ${mouse.y}px, ${item.color}65, transparent 80%)`,
        }}
      />

      <div className="relative flex flex-col h-full justify-center z-20">
        <div className="flex items-center gap-3.5 mb-2">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 group-hover/card:scale-105"
            style={{
              color: mouse.active ? item.color : undefined,
              borderColor: mouse.active ? `${item.color}65` : undefined,
              backgroundColor: mouse.active ? `${item.color}18` : undefined,
            }}
          >
            <Icon className="w-5 h-5" strokeWidth={2} />
          </div>
          <h3 className="text-base font-bold font-unbounded tracking-tight truncate text-zinc-100 group-hover/card:text-white">
            {item.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm font-medium leading-relaxed text-zinc-500 pl-[3.4rem] line-clamp-2">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

/**
 * CompleteCoverageMarquee — Exact Quark.bot 3-Row Infinite Chaos Coverage Marquee
 */
export default function CompleteCoverageMarquee() {
  const rowOne = [
    { id: 'c1', title: 'Rage-Bait Engine', desc: 'Contrarian logic that disagrees with everything you type.', icon: Flame, color: '#FF1744' },
    { id: 'c2', title: '/bait @user', desc: 'Focus The Rage-Baiter onto one lucky server member.', icon: ShieldAlert, color: '#FF1744' },
    { id: 'c3', title: 'Existential Sighs', desc: 'Low-energy nihilistic wisdom delivered in all lowercase.', icon: CloudRain, color: '#7C4DFF' },
    { id: 'c4', title: 'ALL-CAPS Drills', desc: 'Zero-excuse 5 AM motivation straight into #general.', icon: Dumbbell, color: '#FF9100' },
    { id: 'c5', title: 'HR Escalation Tickets', desc: 'Passive-aggressive corporate compliance responses.', icon: Briefcase, color: '#00E5FF' },
  ];

  const rowTwo = [
    { id: 'c6', title: '4-Bot Fight Channels', desc: 'Lock all 4 bots in one channel and watch them argue.', icon: Swords, color: '#FF1744' },
    { id: 'c7', title: 'VC Voice Chaos', desc: 'Real-time voice channel roasting & nihilist sighing.', icon: Mic, color: '#7C4DFF' },
    { id: 'c8', title: 'Shared RAM Engine', desc: 'One unified engine driving all 4 chaotic personalities.', icon: Terminal, color: '#00E5FF' },
    { id: 'c9', title: 'Sub-250ms Roasts', desc: 'Fast comebacks before the user finishes typing another excuse.', icon: Zap, color: '#FF9100' },
    { id: 'c10', title: 'Context Memory', desc: 'They remember your worst server takes from earlier.', icon: MessageSquare, color: '#7C4DFF' },
  ];

  const rowThree = [
    { id: 'c11', title: 'Zero Filter Mode', desc: 'No boring "As an AI language model" disclaimers.', icon: Skull, color: '#FF1744' },
    { id: 'c12', title: 'Custom Prefixes', desc: '!tr, !to, !ty, !te — plus clean slash commands.', icon: Bot, color: '#00E5FF' },
    { id: 'c13', title: 'Audio Reactions', desc: 'Voice channel interruptions & emotional sound cues.', icon: Volume2, color: '#FF9100' },
    { id: 'c14', title: 'Live Sanity Telemetry', desc: 'Track collective server stability dropping in real time.', icon: Radio, color: '#7C4DFF' },
    { id: 'c15', title: 'Synergy Compliance', desc: 'The Employee logs every roast for Q4 review.', icon: Sparkles, color: '#00E5FF' },
  ];

  return (
    <section className="py-24 sm:py-28 bg-[#000000] overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#FF9100] font-bold mb-3 block">
          QUARK-SPEED PERSONALITIES
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5 font-unbounded">
          Complete <span className="text-zinc-500">chaos coverage</span>.
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-outfit">
          From ruthless comebacks to corporate HR gaslighting — every corner of your Discord server gets a personality upgrade.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 w-16 sm:w-44 bg-gradient-to-r from-[#000000] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 w-16 sm:w-44 bg-gradient-to-l from-[#000000] to-transparent" />

        <div className="flex flex-col gap-4 sm:gap-5">
          {/* Row 1 */}
          <div className="flex overflow-hidden py-1 gap-4 group/row">
            <div className="flex shrink-0 items-center gap-4 animate-marquee group-hover/row:[animation-play-state:paused]">
              {rowOne.concat(rowOne).map((item, i) => (
                <CoverageCard key={`${item.id}-${i}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 2 Reverse */}
          <div className="flex overflow-hidden py-1 gap-4 group/row">
            <div className="flex shrink-0 items-center gap-4 animate-marquee-reverse group-hover/row:[animation-play-state:paused]">
              {rowTwo.concat(rowTwo).map((item, i) => (
                <CoverageCard key={`${item.id}-${i}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex overflow-hidden py-1 gap-4 group/row">
            <div
              className="flex shrink-0 items-center gap-4 animate-marquee group-hover/row:[animation-play-state:paused]"
              style={{ animationDuration: '38s' }}
            >
              {rowThree.concat(rowThree).map((item, i) => (
                <CoverageCard key={`${item.id}-${i}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
