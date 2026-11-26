import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Flame, CloudRain, Dumbbell, Briefcase, Terminal, Zap, Swords } from 'lucide-react';
import { BOTS } from '../data/bots';
import TiltCard from '../components/TiltCard';
import AnimatedLink from '../components/AnimatedLink';
import { usePageTransition } from '../contexts/transitionHook';
import { playPop } from '../utils/audio';

const BOT_ICONS = {
  'public-enemy': Flame,
  'lost-cause': CloudRain,
  'hard-truth': Dumbbell,
  'standard-issue': Briefcase,
};

function BotDossierCard({ bot, index, onInvite }) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const Icon = BOT_ICONS[bot.id] || Flame;

  const copyPrompt = () => {
    navigator.clipboard.writeText(bot.systemPrompt).catch(() => {});
    setCopiedPrompt(true);
    playPop(1.2);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <motion.div
      id={bot.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="scroll-mt-24"
    >
      <TiltCard auraColor={bot.aura} enableFloat={false}>
        <div className="rounded-3xl border border-white/[0.1] bg-[#000000]/95 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-9">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0"
                style={{
                  color: bot.color,
                  borderColor: `${bot.color}45`,
                  backgroundColor: `${bot.color}14`,
                  boxShadow: `0 0 28px ${bot.glow}`,
                }}
              >
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  {bot.roleLabel} · {bot.prefix} / {bot.slash}
                </div>
                <h2 className="font-unbounded font-black text-2xl sm:text-3xl text-white">
                  {bot.name}
                </h2>
                <p className="font-outfit font-semibold text-sm sm:text-base" style={{ color: bot.color }}>
                  {bot.subtitle}
                </p>
              </div>
            </div>

            <div className="font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-3">
              <span style={{ color: bot.color }}>{bot.status}</span>
              {bot.vcEnabled && <span className="text-zinc-400">· VC ENABLED</span>}
            </div>
          </div>

          <p className="text-zinc-300 text-base leading-relaxed mb-6 font-outfit">
            {bot.description}
          </p>

          {/* Traits as clean typographic grid (NO PILLS) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 pb-6 border-b border-white/[0.06]">
            {bot.traits.map((trait) => (
              <div key={trait} className="font-mono text-xs text-zinc-400 border-l pl-2.5" style={{ borderColor: `${bot.color}55` }}>
                {trait}
              </div>
            ))}
          </div>

          {/* Sanity Meter */}
          <div className="mb-6 p-4 rounded-2xl bg-[#050507] border border-white/[0.06]">
            <div className="flex items-center justify-between font-mono text-xs mb-2">
              <span className="text-zinc-500">SANITY METER</span>
              <span className="font-bold" style={{ color: bot.color }}>{bot.sanity}% · PERSONALITY {bot.personality}%</span>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${bot.sanity}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="h-full"
                style={{ backgroundColor: bot.color }}
              />
            </div>
          </div>

          {/* System Prompt Preview */}
          <div className="mb-6 rounded-2xl border border-white/[0.08] bg-[#040406] p-4 font-mono text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-500 flex items-center gap-1.5 uppercase">
                <Terminal className="w-3.5 h-3.5" style={{ color: bot.color }} />
                CORE SYSTEM PROMPT
              </span>
              <button
                onClick={copyPrompt}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPrompt ? 'Copied' : 'Copy Prompt'}</span>
              </button>
            </div>
            <p className="text-zinc-400 leading-relaxed">{bot.systemPrompt}</p>
          </div>

          {/* Sample Messages */}
          <div className="space-y-2.5 mb-7">
            <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
              VERIFIED DISCORD TRANSMISSIONS
            </div>
            {bot.sampleMessages.map((msg, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-sm text-zinc-300 italic">
                &ldquo;{msg}&rdquo;
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                playPop(1.2);
                onInvite(bot.id);
              }}
              className="flex-1 py-3.5 px-6 rounded-2xl font-unbounded font-black text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
              style={{
                backgroundColor: `${bot.color}30`,
                border: `1px solid ${bot.color}65`,
                boxShadow: `0 0 25px ${bot.glow}`,
              }}
            >
              <Zap className="w-4 h-4" />
              <span>Invite {bot.name}</span>
            </button>
            <AnimatedLink
              to="/arena"
              className="py-3.5 px-6 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all"
            >
              <Swords className="w-4 h-4 text-[#FF9100]" />
              <span>Provoke in Arena</span>
            </AnimatedLink>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function BotsPage() {
  const { openInviteModal } = usePageTransition();

  return (
    <div className="min-h-screen bg-transparent pt-16 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-xs text-[#FF1744] tracking-[0.28em] uppercase mb-3 block font-bold">
            PERSONNEL DOSSIERS • THE ROSTER
          </span>
          <h1 className="font-unbounded font-black text-4xl sm:text-6xl text-white mb-4">
            Meet The <span className="text-unstable-gradient">Bot Squad</span>
          </h1>
          <p className="font-outfit text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Discord bots with emotional baggage. Inspect their exact system prompts, sanity levels, and sample roasts before unleashing them.
          </p>
        </motion.div>

        <div className="space-y-10">
          {BOTS.map((bot, idx) => (
            <BotDossierCard key={bot.id} bot={bot} index={idx} onInvite={openInviteModal} />
          ))}
        </div>
      </div>
    </div>
  );
}
