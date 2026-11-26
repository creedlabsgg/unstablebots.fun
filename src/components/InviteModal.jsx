import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, Zap, AlertTriangle, ExternalLink } from 'lucide-react';
import { BOTS } from '../data/bots';
import { usePageTransition } from '../contexts/transitionHook';
import { DiscordIcon } from './BrandIcons';
import { playPop } from '../utils/audio';

function InviteModalContent({ inviteBotId, closeInviteModal }) {
  const [selectedIds, setSelectedIds] = useState(() =>
    inviteBotId === 'all' ? BOTS.map((b) => b.id) : [inviteBotId]
  );
  const [vcEnabled, setVcEnabled] = useState(true);
  const [fightEnabled, setFightEnabled] = useState(true);
  const [deployed, setDeployed] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleBot = (id) => {
    playPop(1.0);
    setSelectedIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    );
  };

  const generatedInviteUrl = `https://discord.com/oauth2/authorize?client_id=unstable_${selectedIds.join('_')}&permissions=${
    vcEnabled ? '3147776' : '274877908992'
  }&scope=bot%20applications.commands&chaos=${fightEnabled ? 'max' : 'mild'}`;

  const copyLink = () => {
    navigator.clipboard.writeText(generatedInviteUrl).catch(() => {});
    setCopied(true);
    playPop(1.2);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 18 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-2xl rounded-3xl border border-white/15 bg-[#000000] shadow-[0_30px_100px_rgba(0,0,0,0.98)] overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#050507]">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[#FF1744]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            DISCORD OAUTH DISPATCHER — SANITY: 14%
          </span>
        </div>
        <button
          onClick={closeInviteModal}
          className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="font-unbounded font-black text-2xl text-white mb-1">
            Invite at your own risk.
          </h3>
          <p className="text-sm text-zinc-400 font-outfit">
            Select which emotionally compromised AI personalities to deploy into your Discord server.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BOTS.map((bot) => {
            const selected = selectedIds.includes(bot.id);
            return (
              <button
                key={bot.id}
                onClick={() => toggleBot(bot.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  selected
                    ? 'bg-white/[0.06] border-white/30'
                    : 'bg-[#050505] border-white/[0.06] opacity-60 hover:opacity-100'
                }`}
                style={selected ? { borderColor: bot.color, boxShadow: `0 0 20px ${bot.glow}` } : undefined}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-unbounded font-black text-sm text-white shrink-0"
                    style={{ backgroundColor: bot.color }}
                  >
                    {bot.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="font-unbounded font-bold text-sm text-white truncate">{bot.name}</div>
                    <div className="font-mono text-[10px]" style={{ color: bot.color }}>
                      {bot.subtitle} • {bot.prefix}
                    </div>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                    selected ? 'border-transparent text-white' : 'border-white/20'
                  }`}
                  style={selected ? { backgroundColor: bot.color } : undefined}
                >
                  {selected && <Check className="w-3 h-3" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <button
            onClick={() => setVcEnabled(!vcEnabled)}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
              vcEnabled ? 'border-[#7C4DFF]/50 bg-[#7C4DFF]/10 text-white' : 'border-white/10 bg-[#050505] text-zinc-500'
            }`}
          >
            <span>Enable Voice Chat Heckling</span>
            <span className={vcEnabled ? 'text-[#7C4DFF] font-bold' : ''}>{vcEnabled ? 'ON' : 'OFF'}</span>
          </button>
          <button
            onClick={() => setFightEnabled(!fightEnabled)}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
              fightEnabled ? 'border-[#FF1744]/50 bg-[#FF1744]/10 text-white' : 'border-white/10 bg-[#050505] text-zinc-500'
            }`}
          >
            <span>Allow 4-Bot Fight Mode</span>
            <span className={fightEnabled ? 'text-[#FF1744] font-bold' : ''}>{fightEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        <div className="bg-[#050505] border border-white/[0.08] rounded-xl p-3 font-mono text-[11px] flex items-center justify-between gap-3">
          <span className="text-zinc-400 truncate select-all">{generatedInviteUrl}</span>
          <button
            onClick={copyLink}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white shrink-0 flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              playPop(1.25);
              setDeployed(true);
            }}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-unbounded font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_30px_rgba(88,101,242,0.4)]"
          >
            <DiscordIcon className="w-4 h-4" />
            <span>
              {deployed
                ? `Authorization Ready (${selectedIds.length} Bots)`
                : `Authorize ${selectedIds.length} Bot${selectedIds.length > 1 ? 's' : ''} to Discord`}
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={closeInviteModal}
            className="py-3.5 px-6 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 font-mono text-xs font-bold uppercase cursor-pointer"
          >
            Close
          </button>
        </div>

        {deployed && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2"
          >
            <Zap className="w-4 h-4 shrink-0" />
            <span>
              Invite packet generated for {selectedIds.length} personalities. Copy the OAuth link above or test them live inside Chaos Arena!
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function InviteModal() {
  const { inviteBotId, closeInviteModal } = usePageTransition();

  return (
    <AnimatePresence>
      {inviteBotId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeInviteModal}
        >
          <InviteModalContent
            key={inviteBotId}
            inviteBotId={inviteBotId}
            closeInviteModal={closeInviteModal}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
