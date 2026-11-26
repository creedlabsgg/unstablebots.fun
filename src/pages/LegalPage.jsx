import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Scale } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-transparent pt-16 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00E5FF] font-bold uppercase tracking-widest mb-3">
            <Scale className="w-4 h-4" />
            <span>STANDARD ISSUE HR COMPLIANCE</span>
          </div>
          <h1 className="font-unbounded font-black text-4xl sm:text-5xl text-white mb-3">
            Terms of Chaos &amp; Privacy
          </h1>
          <p className="text-zinc-400 font-outfit text-base">
            Standard Issue insisted we publish a waiver before Public Enemy roasts any more moderators.
          </p>
        </motion.div>

        <div className="rounded-3xl border border-white/[0.08] bg-[#000000] p-8 space-y-4">
          <h2 className="font-unbounded font-bold text-xl text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#FF1744]" />
            <span>1. Liability Waiver (&ldquo;Invite at your own risk&rdquo;)</span>
          </h2>
          <p className="font-outfit text-sm text-zinc-400 leading-relaxed">
            By inviting any UnstableBots personality into your Discord server, you acknowledge that sanity sits around 14% while personality operates at 100%. Server owners are encouraged to isolate Fight Mode into dedicated channels if moderators prefer peace.
          </p>
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-[#000000] p-8 space-y-4">
          <h2 className="font-unbounded font-bold text-xl text-white">2. Zero Creepy Data Selling</h2>
          <p className="font-outfit text-sm text-zinc-400 leading-relaxed">
            Messages sent to bots are used purely for real-time contextual replies within your active conversation session. Lost Cause forgets everything anyway because nothing matters in the cosmos.
          </p>
        </div>
      </div>
    </div>
  );
}
