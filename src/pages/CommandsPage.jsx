import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Search, Copy, Check } from 'lucide-react';
import { BOTS, COMMANDS_LIST } from '../data/bots';
import { playPop } from '../utils/audio';

export default function CommandsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [copiedCmd, setCopiedCmd] = useState(null);

  const categories = ['All', 'Text', 'Chaos', 'Voice', 'Moderation', 'Utility'];

  const filtered = COMMANDS_LIST.filter((c) => {
    const matchCat = category === 'All' || c.category === category;
    const q = search.toLowerCase();
    const matchQuery = !q || c.cmd.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  const copyCmd = (cmd) => {
    navigator.clipboard.writeText(cmd).catch(() => {});
    setCopiedCmd(cmd);
    playPop(1.2);
    setTimeout(() => setCopiedCmd(null), 1600);
  };

  return (
    <div className="min-h-screen bg-transparent pt-16 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[#00E5FF] font-bold mb-3">
            <Terminal className="w-4 h-4" />
            <span>PREFIX & SLASH CODEX</span>
          </div>
          <h1 className="font-unbounded font-black text-4xl sm:text-6xl text-white mb-4">
            Command <span className="text-unstable-gradient">Manual</span>
          </h1>
          <p className="font-outfit text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            Every command to summon roasts, start 4-bot brawls, log HR tickets, or measure server sanity.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search !pe, /fight, /target..."
              className="w-full bg-[#050507] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all cursor-pointer border ${
                  category === cat
                    ? 'bg-white text-black font-bold border-white'
                    : 'bg-[#050507] text-zinc-400 border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Commands Grid */}
        <div className="space-y-3.5">
          {filtered.map((item, idx) => {
            const bot = BOTS.find((b) => b.id === item.botId) || BOTS[0];
            return (
              <motion.div
                key={item.cmd}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="rounded-2xl border border-white/[0.08] bg-[#000000] hover:border-white/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <code
                      className="font-mono text-sm font-bold px-3 py-1 rounded-lg bg-[#0a0a0c] border border-white/10"
                      style={{ color: bot.color }}
                    >
                      {item.cmd}
                    </code>
                    <span className="font-mono text-[11px] uppercase text-zinc-500">
                      {item.category} · {bot.name}
                    </span>
                  </div>
                  <p className="font-outfit text-sm text-zinc-400">{item.desc}</p>
                </div>

                <button
                  onClick={() => copyCmd(item.cmd)}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 font-mono text-xs text-white flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copiedCmd === item.cmd ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedCmd === item.cmd ? 'Copied' : 'Copy'}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
