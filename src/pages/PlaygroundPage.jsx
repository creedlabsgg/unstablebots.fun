import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import LiveDiscordArena from '../components/LiveDiscordArena';
import { usePageTransition } from '../contexts/transitionHook';

export default function PlaygroundPage() {
  const { openInviteModal } = usePageTransition();

  return (
    <div className="min-h-screen bg-transparent pt-16 pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="font-mono text-xs text-[#FF1744] tracking-[0.28em] uppercase font-bold mb-3">
            INTERACTIVE CHAOS SIMULATOR
          </div>
          <h1 className="font-unbounded font-black text-4xl sm:text-6xl text-white mb-4">
            4-Bot <span className="text-unstable-gradient">Fight Arena</span>
          </h1>
          <p className="font-outfit text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Test any bot in real time or drop a match in the room with <strong className="text-white">/fight</strong>. No Discord login required.
          </p>
        </motion.div>

        <LiveDiscordArena />

        <div className="mt-12 text-center">
          <button
            onClick={() => openInviteModal('all')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FF1744] hover:bg-[#ff2c56] text-white font-unbounded font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(255,23,68,0.4)] cursor-pointer transition-all hover:scale-105"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Like the chaos? Invite All 4 Bots</span>
          </button>
        </div>
      </div>
    </div>
  );
}
