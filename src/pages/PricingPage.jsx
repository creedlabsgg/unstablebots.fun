import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, Zap, Sparkles, Flame, HelpCircle } from 'lucide-react';
import { usePageTransition } from '../contexts/transitionHook';
import { playPop } from '../utils/audio';

// 3D Tilt Card wrapper modeled directly after CreeD Labs Engine Pricing
function TiltPricingCard({ children, className = '' }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      className={`relative w-full ${className}`}
    >
      <div style={{ transform: 'translateZ(40px)' }} className="w-full h-full relative">
        {children}
      </div>
    </motion.div>
  );
}

const COMPARISON_ROWS = [
  { feature: 'All 4 Bot Personalities', free: '1 Server', pro: 'Unlimited Servers', syndicate: 'Unlimited' },
  { feature: 'Chat Roasts & Rage-Baiting', free: 'Standard', pro: 'Zero Cooldown', syndicate: 'Dedicated Router' },
  { feature: 'Voice Channel Roasts & Sighs', free: '—', pro: 'Full VC Mode', syndicate: 'Custom Soundboard' },
  { feature: '4-Bot Autonomous Fight Mode', free: 'Basic Text', pro: 'Text + Voice Brawl', syndicate: 'Custom Scripts' },
  { feature: 'Custom Bot Branding & Name', free: '—', freeBool: false, pro: '—', proBool: false, syndicate: 'White-Label' },
  { feature: 'Dedicated Python Instance', free: '—', freeBool: false, pro: '—', proBool: false, syndicate: 'Isolated VM' },
  { feature: 'Incident Reports by Standard Issue', free: 'Weekly', pro: 'Real-time Webhook', syndicate: 'Custom Webhooks' },
  { feature: 'Discord Support Channel', free: 'Community', pro: 'Priority Role', syndicate: 'Private Dev Channel' },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const { openInviteModal } = usePageTransition();

  return (
    <div className="pt-24 pb-28 px-4 sm:px-6 min-h-screen flex flex-col items-center relative overflow-hidden">
      
      {/* Background Cyber Glow from CreeD Labs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#FFB703]/10 via-[#FB8500]/12 to-[#FF1744]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative z-10"
      >
        <span className="font-mono text-xs text-[#FFB703] tracking-[0.28em] uppercase mb-4 block font-bold">
          [ SERVER TARIFFS // TRANSPARENT PRICING ]
        </span>
        <h1 className="font-unbounded font-black text-4xl sm:text-6xl text-white mb-4 tracking-tight">
          Unleash Chaos Without <span className="text-gold-gradient">Limits.</span>
        </h1>
        <p className="font-outfit text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
          Start 100% free with the whole crew. Upgrade for voice channel roasts, zero cooldowns, and server-wide brawl rights.
        </p>

        {/* Modern Segmented Pill Toggle (Exact CreeD Labs Engine) */}
        <div className="flex justify-center mt-10 relative z-10">
          <div className="flex bg-[#050505] border border-white/10 p-1.5 rounded-full relative shadow-[inset_0_2px_12px_rgba(0,0,0,0.8)]">
            <motion.div
              className="absolute inset-y-1.5 w-[140px] bg-gradient-to-r from-[#FFB703] to-[#FB8500] rounded-full shadow-[0_0_25px_rgba(255,183,3,0.35)]"
              animate={{ x: isYearly ? 140 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
            <button
              onClick={() => {
                playPop(0.9);
                setIsYearly(false);
              }}
              className={`relative z-10 w-[140px] py-2.5 rounded-full font-unbounded font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                !isYearly ? 'text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => {
                playPop(1.1);
                setIsYearly(true);
              }}
              className={`relative z-10 w-[140px] py-2.5 rounded-full font-unbounded font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                isYearly ? 'text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Yearly</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/20 text-black font-mono font-bold">
                -35%
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 3 Pricing Cards Grid with CreeD Labs Top Ambient Mist/Flame Aura */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mb-24">
        
        {/* Tier 1: Free Chaos */}
        <TiltPricingCard>
          <div className="bg-[#050505] border border-white/10 rounded-3xl h-full flex flex-col justify-between shadow-xl relative group transition-all duration-300 hover:border-white/20">
            {/* CreeD Labs Top Mist/Flame Aura */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none bg-[#050505]">
              <div
                className="absolute top-0 inset-x-0 h-[80%] opacity-50 group-hover:opacity-75 transition-opacity duration-700 mix-blend-screen"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 25%, transparent 100%)',
                }}
              >
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-emerald-600/60 blur-[60px] rounded-full" />
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-teal-600/60 blur-[60px] rounded-full" />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-72 h-56 bg-cyan-400/40 blur-[70px] rounded-[100%]" />
              </div>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="p-8 relative z-10 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-emerald-400 tracking-widest uppercase">
                  [ STARTER DISCORD TIER ]
                </span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">FREE FOREVER</span>
              </div>
              <h3 className="font-unbounded font-black text-2xl text-white mb-2">Free Chaos</h3>
              <p className="font-outfit text-xs text-zinc-400 mb-6">
                All 4 bots in your server for daily roastings and passive-aggressive HR reports.
              </p>

              <div className="mb-6 flex items-baseline">
                <span className="font-unbounded font-black text-5xl text-white tracking-tight">$0</span>
                <span className="text-zinc-500 font-outfit text-sm ml-2">/ server forever</span>
              </div>

              <div className="h-px w-full bg-white/[0.08] mb-6" />

              <ul className="space-y-3.5 font-outfit text-xs sm:text-sm text-zinc-300 flex-grow">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>All 4 bots in 1 Discord server</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unlimited text channel roasts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Autonomous /fight commands</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard Issue HR ticket generation</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-500">
                  <span className="w-4 text-center">—</span>
                  <span>Voice channel roasts (Pro only)</span>
                </li>
              </ul>
            </div>

            <div className="p-8 pt-0 relative z-10">
              <button
                onClick={() => {
                  playPop(1.1);
                  openInviteModal('all');
                }}
                className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-unbounded font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Add Free Bots to Server
              </button>
            </div>
          </div>
        </TiltPricingCard>

        {/* Tier 2: Asylum Pro (Featured Popular Card with Molten Gold Aura) */}
        <TiltPricingCard>
          <div className="bg-[#050505] border border-[#FFB703]/50 rounded-3xl h-full flex flex-col justify-between shadow-[0_0_40px_rgba(255,183,3,0.2)] relative group transform md:-translate-y-4 transition-all duration-300 hover:border-[#FFB703] hover:shadow-[0_0_60px_rgba(255,183,3,0.35)]">
            
            {/* Popular Badge Floating Upwards */}
            <div className="absolute -top-3.5 right-6 flex items-center gap-1.5 text-[11px] font-unbounded font-black tracking-wider text-black bg-gradient-to-r from-[#FFB703] to-[#FB8500] px-3.5 py-1 rounded-full shadow-[0_4px_20px_rgba(255,183,3,0.4)] z-20">
              <Flame className="w-3.5 h-3.5 fill-black" />
              <span>MOST UNHINGED</span>
            </div>

            {/* CreeD Labs Top Ambient Gold Mist/Flame */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none bg-[#050505]">
              <div
                className="absolute top-0 inset-x-0 h-[85%] opacity-80 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                }}
              >
                <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#FF1744]/70 blur-[60px] rounded-full" />
                <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#FB8500]/70 blur-[60px] rounded-full" />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-80 h-64 bg-[#FFB703]/60 blur-[70px] rounded-[100%]" />
              </div>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFB703] to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="p-8 relative z-10 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[#FFB703] tracking-widest uppercase">
                  [ PREMIUM ASYLUM PASS ]
                </span>
                <span className="font-mono text-[10px] text-[#FFB703] uppercase font-bold">TOP CHOICE</span>
              </div>
              <h3 className="font-unbounded font-black text-2xl text-white mb-2 flex items-center gap-2">
                <span>Asylum Pro</span>
                <Sparkles className="w-5 h-5 text-[#FFB703]" />
              </h3>
              <p className="font-outfit text-xs text-zinc-300 mb-6">
                Unlimited servers, live voice channel roasts, zero cooldowns, and chaotic custom tuning.
              </p>

              <div className="mb-6 flex flex-col">
                <div className="flex items-baseline">
                  <span className="font-unbounded font-black text-5xl sm:text-6xl text-white drop-shadow-[0_0_20px_rgba(255,183,3,0.3)]">
                    ${isYearly ? '3.25' : '4.99'}
                  </span>
                  <span className="text-[#FFB703] font-outfit text-sm ml-2 font-medium">/ month</span>
                </div>
                {isYearly && (
                  <span className="text-xs font-mono font-bold text-[#10B981] mt-1">
                    Billed $39/year • Includes 3 months extra free
                  </span>
                )}
              </div>

              <div className="h-px w-full bg-[#FFB703]/20 mb-6" />

              <ul className="space-y-3.5 font-outfit text-xs sm:text-sm text-zinc-200 flex-grow">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FFB703] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                  </div>
                  <span className="text-white font-medium">Everything in Free Chaos</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FFB703] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                  </div>
                  <span className="text-white font-medium">All 4 bots across Unlimited Servers</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FFB703] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                  </div>
                  <span className="text-white font-medium">Live Voice Channel Roasts & Audio Synthesizer</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FFB703] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                  </div>
                  <span className="text-white font-medium">Priority Router: Zero cooldown latency</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FFB703] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                  </div>
                  <span className="text-white font-medium">Fight Mode Spectator Betting System</span>
                </li>
              </ul>
            </div>

            <div className="p-8 pt-0 relative z-10">
              <button
                onClick={() => {
                  playPop(1.2);
                  openInviteModal('all');
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FFB703] via-[#FB8500] to-[#FF1744] hover:brightness-110 text-black font-unbounded font-black text-xs uppercase tracking-wider transition-all hover:scale-[1.03] active:scale-95 cursor-pointer shadow-[0_0_30px_rgba(255,183,3,0.35)] flex items-center justify-center gap-2"
              >
                <span>Upgrade to Asylum Pro</span>
                <Zap className="w-4 h-4 fill-black" />
              </button>
            </div>
          </div>
        </TiltPricingCard>

        {/* Tier 3: Server Syndicate (White-label & Lifetime) */}
        <TiltPricingCard>
          <div className="bg-[#050505] border border-white/10 rounded-3xl h-full flex flex-col justify-between shadow-xl relative group transition-all duration-300 hover:border-[#7C4DFF]/40">
            {/* CreeD Labs Violet/Indigo Mist Aura */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none bg-[#050505]">
              <div
                className="absolute top-0 inset-x-0 h-[80%] opacity-60 group-hover:opacity-85 transition-opacity duration-700 mix-blend-screen"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                }}
              >
                <div className="absolute -top-16 -left-16 w-72 h-72 bg-indigo-600/70 blur-[60px] rounded-full" />
                <div className="absolute -top-16 -right-16 w-72 h-72 bg-purple-600/70 blur-[60px] rounded-full" />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-80 h-64 bg-fuchsia-400/50 blur-[70px] rounded-[100%]" />
              </div>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#7C4DFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="p-8 relative z-10 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[#B388FF] tracking-widest uppercase">
                  [ ENTERPRISE SYNDICATE ]
                </span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">WHITE-LABEL</span>
              </div>
              <h3 className="font-unbounded font-black text-2xl text-white mb-2">Syndicate License</h3>
              <p className="font-outfit text-xs text-zinc-400 mb-6">
                Custom bot identity, dedicated compute VM, soundboard injector, and private dev support.
              </p>

              <div className="mb-6 flex flex-col">
                <div className="flex items-baseline">
                  <span className="font-unbounded font-black text-5xl text-white tracking-tight">
                    ${isYearly ? '12.50' : '19.99'}
                  </span>
                  <span className="text-zinc-500 font-outfit text-sm ml-2">/ month</span>
                </div>
                {isYearly && (
                  <span className="text-xs font-mono font-bold text-purple-400 mt-1">
                    Or $149 One-Time Lifetime Pass
                  </span>
                )}
              </div>

              <div className="h-px w-full bg-white/[0.08] mb-6" />

              <ul className="space-y-3.5 font-outfit text-xs sm:text-sm text-zinc-300 flex-grow">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Custom bot name & custom avatar</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Dedicated isolated Python VM instance</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Custom soundboard audio clip injection</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Private Discord developer channel</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>99.99% enterprise uptime SLA guarantee</span>
                </li>
              </ul>
            </div>

            <div className="p-8 pt-0 relative z-10">
              <button
                onClick={() => {
                  playPop(1.0);
                  openInviteModal('all');
                }}
                className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-purple-500/30 text-white font-unbounded font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Deploy Syndicate License
              </button>
            </div>
          </div>
        </TiltPricingCard>
      </div>

      {/* Feature Comparison Table (CreeD Labs Engine Design) */}
      <div className="w-full max-w-5xl mx-auto mb-20 relative z-10">
        <div className="text-center mb-10">
          <h2 className="font-unbounded font-black text-2xl sm:text-4xl text-white mb-2">
            Compare Plan Capabilities
          </h2>
          <p className="font-outfit text-zinc-400 text-sm">
            Complete technical breakdown between Free Chaos, Asylum Pro, and Syndicate.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#050505] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-4 bg-[#0a0a0c] p-4 sm:p-5 border-b border-white/10 font-mono text-[11px] font-bold tracking-widest uppercase text-zinc-400">
            <div className="col-span-1 pl-2">PROTOCOL FEATURE</div>
            <div className="col-span-1 text-center text-white">FREE CHAOS</div>
            <div className="col-span-1 text-center text-[#FFB703]">ASYLUM PRO</div>
            <div className="col-span-1 text-center text-purple-400">SYNDICATE</div>
          </div>

          <div className="divide-y divide-white/[0.06] font-outfit text-xs sm:text-sm">
            {COMPARISON_ROWS.map((row, i) => (
              <div key={i} className="grid grid-cols-4 p-4 sm:p-5 items-center hover:bg-white/[0.02] transition-colors">
                <div className="col-span-1 font-medium text-zinc-300 pl-2">{row.feature}</div>
                <div className="col-span-1 text-center text-zinc-400">{row.free}</div>
                <div className="col-span-1 text-center text-white font-bold">{row.pro}</div>
                <div className="col-span-1 text-center text-purple-300 font-bold">{row.syndicate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Support Callout */}
      <div className="rounded-3xl border border-white/10 bg-[#050505] p-8 sm:p-10 max-w-3xl mx-auto text-center relative z-10">
        <HelpCircle className="w-8 h-8 text-[#FFB703] mx-auto mb-3" />
        <h3 className="font-unbounded font-black text-xl text-white mb-2">
          Need a custom server quote or partnership?
        </h3>
        <p className="font-outfit text-sm text-zinc-400 mb-6">
          Reach out in our Discord Asylum HQ. Standard Issue will file an expedited inquiry ticket within minutes.
        </p>
        <button
          onClick={() => openInviteModal('all')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFB703] to-[#FB8500] text-black font-unbounded font-bold text-xs uppercase tracking-wider cursor-pointer hover:scale-105 transition-all"
        >
          <span>Contact Asylum Desk</span>
        </button>
      </div>
    </div>
  );
}
