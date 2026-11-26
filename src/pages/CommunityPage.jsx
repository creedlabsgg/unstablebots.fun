import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, ThumbsUp, Plus, ArrowUpRight, Copy, Check, Trophy } from 'lucide-react';
import { BOTS, INITIAL_MELTDOWNS } from '../data/bots';
import AnimatedLink from '../components/AnimatedLink';
import { DiscordIcon } from '../components/BrandIcons';
import CommunityProofGrid from '../components/CommunityProofGrid';
import { playPop } from '../utils/audio';

const FILTER_TAGS = ['All', 'Rage-Bait', 'Nihilism', 'Grindset', 'Corporate HR', '4-Bot Brawl'];

/**
 * CommunityPage — Modeled after Quark.bot & creedcybersec.in Community Hubs
 * Includes: Official Discord HQ Banner, Upvotable Meltdown Feed, Submit Form, and Prompt Sharing.
 */
export default function CommunityPage() {
  const [meltdowns, setMeltdowns] = useState(INITIAL_MELTDOWNS);
  const [upvotedIds, setUpvotedIds] = useState([]);
  const [activeTag, setActiveTag] = useState('All');
  const [newTitle, setNewTitle] = useState('');
  const [newSnippet, setNewSnippet] = useState('');
  const [newBotId, setNewBotId] = useState('public-enemy');
  const [copiedId, setCopiedId] = useState(null);

  const handleUpvote = (id) => {
    playPop(1.15);
    const already = upvotedIds.includes(id);
    setUpvotedIds((prev) => (already ? prev.filter((x) => x !== id) : [...prev, id]));
    setMeltdowns((prev) =>
      prev.map((m) => (m.id === id ? { ...m, votes: m.votes + (already ? -1 : 1) } : m))
    );
  };

  const handleSubmitMeltdown = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSnippet.trim()) return;
    playPop(1.3);
    const bot = BOTS.find((b) => b.id === newBotId) || BOTS[0];
    const item = {
      id: `m-${Date.now()}`,
      botId: newBotId,
      server: 'Your Server',
      title: newTitle.trim(),
      snippet: newSnippet.trim(),
      votes: 1,
      tag: bot.id === 'public-enemy' ? 'Rage-Bait' : bot.id === 'lost-cause' ? 'Nihilism' : bot.id === 'hard-truth' ? 'Grindset' : 'Corporate HR',
    };
    setMeltdowns((prev) => [item, ...prev]);
    setUpvotedIds((prev) => [...prev, item.id]);
    setNewTitle('');
    setNewSnippet('');
  };

  const copyPrompt = (bot) => {
    navigator.clipboard.writeText(bot.systemPrompt).catch(() => {});
    setCopiedId(bot.id);
    playPop(1.1);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const visibleMeltdowns =
    activeTag === 'All' ? meltdowns : meltdowns.filter((m) => m.tag === activeTag);

  return (
    <div className="min-h-screen bg-transparent pt-16 pb-20 text-zinc-300 font-outfit">
      <div className="max-w-[97.22rem] mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-12 space-y-3"
        >
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF1744] font-bold">
            UNSTABLE ASYLUM HUB & CHAOS WALL
          </div>
          <h1 className="font-unbounded text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Where Chaotic Servers Gather.
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Inspired by Quark.bot&apos;s community ecosystem — browse real Discord meltdowns, upvote unhinged bot ratios, copy system prompts, and join the Asylum HQ.
          </p>
        </motion.div>

        {/* Official Discord Operations HQ Banner (from creedcybersec.in Community.jsx) */}
        <div className="mb-16 rounded-[32px] bg-[#000000] border border-white/[0.12] p-6 sm:p-10 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.98)] relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1744]/50 to-transparent" />
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#FF1744] text-xs font-mono font-bold">
              <span className="w-2 h-2 rotate-45 bg-[#FF1744] animate-pulse" />
              <span>OFFICIAL ASYLUM HEADQUARTERS</span>
            </div>
            <h2 className="font-unbounded font-black text-2xl sm:text-4xl text-white">
              Direct Live Therapy on Discord
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Watch all 4 bots fight 24/7 in #the-fight-pit, request unhinged new personalities, test VC voice heckling, and vote on weekly prompt buffs.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF1744]" />
                <span>18,400+ Asylum Members</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5865F2]" />
                <span>24/7 4-Bot Fight Channel</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                <span>14% Sanity Guaranteed</span>
              </div>
            </div>
          </div>

          <AnimatedLink
            to="/arena"
            className="px-8 py-4 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-unbounded font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(88,101,242,0.4)] shrink-0"
          >
            <DiscordIcon className="w-5 h-5" />
            <span>Enter Live Discord Arena</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </AnimatedLink>
        </div>

        {/* Interactive Meltdown Feed + Submit Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Left: Feed */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#FF9100]" />
                <h2 className="font-unbounded font-black text-2xl text-white">Hall of Meltdowns</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {FILTER_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setActiveTag(tag);
                      playPop(1.0);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer border ${
                      activeTag === tag
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-[#050507] text-zinc-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {visibleMeltdowns.map((item) => {
                const bot = BOTS.find((b) => b.id === item.botId) || BOTS[0];
                const upvoted = upvotedIds.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-white/[0.08] bg-[#040406] p-6 flex flex-col sm:flex-row gap-5 justify-between items-start hover:border-white/20 transition-colors"
                  >
                    <div className="space-y-2.5 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap font-mono text-[11px]">
                        <span className="font-bold uppercase tracking-wider" style={{ color: bot.color }}>
                          {bot.name}
                        </span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-400">{item.server}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-zinc-500">{item.tag}</span>
                      </div>
                      <h3 className="font-unbounded font-bold text-lg text-white">{item.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed bg-black border border-white/[0.05] rounded-xl p-3.5 font-mono">
                        {item.snippet}
                      </p>
                    </div>

                    <button
                      onClick={() => handleUpvote(item.id)}
                      className={`px-4 py-3 rounded-2xl border flex sm:flex-col items-center justify-center gap-1.5 shrink-0 cursor-pointer transition-all ${
                        upvoted
                          ? 'bg-[#FF1744]/20 border-[#FF1744] text-white'
                          : 'bg-[#000000] border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="font-mono text-xs font-bold">{item.votes}</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Submit Meltdown + Copy Prompts */}
          <div className="lg:col-span-4 space-y-6">
            <form
              onSubmit={handleSubmitMeltdown}
              className="rounded-3xl border border-white/[0.1] bg-[#000000] p-6 space-y-4"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-[#FF1744] font-bold uppercase">
                <Plus className="w-4 h-4" />
                <span>SUBMIT SERVER MELTDOWN</span>
              </div>
              <div>
                <label className="block font-mono text-[10px] text-zinc-500 uppercase mb-1.5">
                  Culprit Bot
                </label>
                <select
                  value={newBotId}
                  onChange={(e) => setNewBotId(e.target.value)}
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1744]"
                >
                  {BOTS.map((b) => (
                    <option key={b.id} value={b.id}>{b.name} — {b.subtitle}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-mono text-[10px] text-zinc-500 uppercase mb-1.5">
                  Incident Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Bot roasted owner into deleting channel"
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF1744]"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-zinc-500 uppercase mb-1.5">
                  Chat Log Snippet
                </label>
                <textarea
                  rows={3}
                  value={newSnippet}
                  onChange={(e) => setNewSnippet(e.target.value)}
                  placeholder='Paste the funniest quote...'
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF1744]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#FF1744] hover:bg-[#ff2c56] text-white font-unbounded font-black text-xs uppercase tracking-wider cursor-pointer transition-all"
              >
                Post to Wall
              </button>
            </form>

            {/* Open-Source System Prompt Blueprints */}
            <div className="rounded-3xl border border-white/[0.1] bg-[#000000] p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF] font-bold uppercase">
                <Flame className="w-4 h-4" />
                <span>OPEN PERSONALITY BLUEPRINTS</span>
              </div>
              <div className="space-y-3">
                {BOTS.map((bot) => (
                  <div
                    key={bot.id}
                    className="p-3.5 rounded-2xl border border-white/[0.06] bg-[#050507] flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="font-unbounded font-bold text-xs text-white truncate">{bot.name}</div>
                      <div className="font-mono text-[10px]" style={{ color: bot.color }}>{bot.subtitle}</div>
                    </div>
                    <button
                      onClick={() => copyPrompt(bot)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-white flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedId === bot.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === bot.id ? 'Copied' : 'Prompt'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Re-use Quark 3-Col Infinite Marquee */}
      <CommunityProofGrid />
    </div>
  );
}
