import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Swords, Send, Sparkles, CheckCircle2, Trash2 } from 'lucide-react';
import { BOTS, generateBotReply, FIGHT_SEQUENCES } from '../data/bots';
import { playPop } from '../utils/audio';

const PRESET_PROMPTS = [
  'Rate my Discord server honestly',
  'I stayed up until 4 AM gaming again',
  'You are literally just lines of Python',
  'Why is nothing going my way today?',
];

/**
 * Interactive Live Discord Sandbox modeled after quark.bot's live component preview
 * + CreeD Labs Engine DiscordPreview.jsx
 */
export default function LiveDiscordArena({ compact = false }) {
  const [selectedBotId, setSelectedBotId] = useState('public-enemy');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      botId: 'public-enemy',
      text: "Welcome to #chaos-sandbox. Say literally anything and watch me prove you wrong.",
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [fightRunning, setFightRunning] = useState(false);
  const scrollContainerRef = useRef(null);

  const selectedBot = BOTS.find((b) => b.id === selectedBotId) || BOTS[0];

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (textToSend) => {
    const clean = (textToSend ?? input).trim();
    if (!clean || isTyping) return;

    playPop(1.1);
    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: clean,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateBotReply(selectedBotId, clean);
      playPop(0.85);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          botId: selectedBotId,
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 650);
  };

  const triggerFightMode = () => {
    if (fightRunning || isTyping) return;
    setFightRunning(true);
    playPop(1.3);

    const sequence = FIGHT_SEQUENCES[Math.floor(Math.random() * FIGHT_SEQUENCES.length)];
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: 'system',
        text: '⚡ /fight triggered — releasing all 4 unstable personalities into #chaos-sandbox...',
      },
    ]);

    sequence.forEach((step, index) => {
      setTimeout(() => {
        playPop(0.9 + index * 0.1);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + index + 10,
            role: 'bot',
            botId: step.botId,
            text: step.text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        if (index === sequence.length - 1) {
          setFightRunning(false);
        }
      }, (index + 1) * 950);
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="rounded-[28px] border border-white/[0.1] bg-[#000000] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Top Interactive Control Header */}
        <div className="px-4 sm:px-6 py-4 bg-[#050505] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mr-1">
              ACTIVE PERSONALITY:
            </span>
            {BOTS.map((bot) => {
              const active = selectedBotId === bot.id;
              return (
                <button
                  key={bot.id}
                  onClick={() => {
                    setSelectedBotId(bot.id);
                    playPop(1.0);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                    active
                      ? 'text-white scale-[1.03]'
                      : 'text-zinc-400 border-white/[0.06] bg-white/[0.02] hover:text-white'
                  }`}
                  style={
                    active
                      ? {
                          backgroundColor: `${bot.color}20`,
                          borderColor: `${bot.color}80`,
                          boxShadow: `0 0 20px ${bot.glow}`,
                        }
                      : undefined
                  }
                >
                  {bot.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerFightMode}
              disabled={fightRunning}
              className="px-3.5 py-1.5 rounded-xl bg-[#FF1744] hover:bg-[#ff335a] disabled:opacity-50 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,23,68,0.4)]"
            >
              <Swords className="w-3.5 h-3.5" />
              <span>{fightRunning ? 'BRAWL IN PROGRESS...' : 'TRIGGER /fight BRAWL'}</span>
            </button>
            <button
              onClick={() => setMessages([])}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
              title="Clear Chat"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Discord Mock Interior */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Discord Channel Sidebar */}
          {!compact && (
            <div className="hidden lg:flex lg:col-span-3 flex-col bg-[#08080a] border-r border-white/[0.06] p-4 justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-3 px-2">
                  UNSTABLE ASYLUM HQ
                </div>
                <div className="space-y-1">
                  {['#chaos-sandbox', '#rage-bait-pit', '#existential-void', '#5am-grindset', '#hr-complaints'].map(
                    (ch, idx) => (
                      <div
                        key={ch}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono ${
                          idx === 0
                            ? 'bg-white/[0.08] text-white font-bold'
                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
                        }`}
                      >
                        <Hash className="w-3.5 h-3.5 opacity-60" />
                        <span>{ch.replace('#', '')}</span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-3 px-2">
                    ONLINE BOTS — 4
                  </div>
                  <div className="space-y-2.5">
                    {BOTS.map((bot) => (
                      <button
                        key={bot.id}
                        onClick={() => setSelectedBotId(bot.id)}
                        className="w-full flex items-center gap-2.5 px-2 py-1 rounded-lg hover:bg-white/[0.04] text-left transition-colors cursor-pointer"
                      >
                        <div className="relative">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white font-unbounded"
                            style={{ backgroundColor: bot.color }}
                          >
                            {bot.name[0]}
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#08080a]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-zinc-200 truncate">{bot.name}</div>
                          <div className="text-[10px] font-mono text-zinc-500 truncate">
                            Sanity: {bot.sanity}%
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] font-mono text-[10px] text-zinc-500">
                TIP: Click any preset below or hit <span className="text-[#FF1744]">TRIGGER /fight</span> to watch all 4 argue.
              </div>
            </div>
          )}

          {/* Right Chat Viewport */}
          <div className={`${compact ? 'lg:col-span-12' : 'lg:col-span-9'} flex flex-col bg-[#050507]`}>
            {/* Channel Header */}
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-zinc-500" />
                <span className="font-unbounded font-bold text-sm text-white">chaos-sandbox</span>
                <span className="hidden sm:inline text-xs text-zinc-500 font-mono">
                  — chatting with {selectedBot.name} ({selectedBot.prefix})
                </span>
              </div>
              <span
                className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg border"
                style={{
                  color: selectedBot.color,
                  borderColor: `${selectedBot.color}40`,
                  backgroundColor: `${selectedBot.color}12`,
                }}
              >
                SANITY {selectedBot.sanity}%
              </span>
            </div>

            {/* Messages Scroll */}
            <div
              ref={scrollContainerRef}
              className="p-5 space-y-4 h-[330px] sm:h-[380px] overflow-y-auto custom-scrollbar"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => {
                  if (msg.role === 'system') {
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center font-mono text-[11px] text-[#FF9100] bg-[#FF9100]/10 border border-[#FF9100]/20 rounded-xl py-2 px-4"
                      >
                        {msg.text}
                      </motion.div>
                    );
                  }

                  const botMeta = msg.role === 'bot' ? BOTS.find((b) => b.id === msg.botId) || BOTS[0] : null;

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3.5 items-start hover:bg-white/[0.02] p-2 -mx-2 rounded-xl transition-colors"
                    >
                      {msg.role === 'user' ? (
                        <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/15 flex items-center justify-center font-mono font-bold text-xs text-white shrink-0">
                          YOU
                        </div>
                      ) : (
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center font-unbounded font-black text-sm text-white shrink-0 shadow-lg"
                          style={{
                            backgroundColor: botMeta.color,
                            boxShadow: `0 0 18px ${botMeta.glow}`,
                          }}
                        >
                          {botMeta.name[0]}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="font-bold text-sm"
                            style={{ color: msg.role === 'bot' ? botMeta.color : '#ffffff' }}
                          >
                            {msg.role === 'bot' ? botMeta.name : 'Server Member'}
                          </span>
                          {msg.role === 'bot' && (
                            <span className="bg-[#5865F2] text-white text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase inline-flex items-center gap-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              BOT
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-zinc-600">{msg.time}</span>
                        </div>
                        <p className="text-sm text-zinc-200 leading-relaxed mt-1">{msg.text}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {isTyping && (
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 italic">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ color: selectedBot.color }} />
                  <span>{selectedBot.name} is composing something regrettable...</span>
                </div>
              )}
            </div>

            {/* Quick Presets Bar */}
            <div className="px-5 py-2.5 border-t border-white/[0.04] flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-mono text-[10px] text-zinc-600 shrink-0 uppercase">Test Prompt:</span>
              {PRESET_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.06] text-xs font-outfit text-zinc-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  "{prompt}"
                </button>
              ))}
            </div>

            {/* Chat Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-4 border-t border-white/[0.06] bg-[#000000]"
            >
              <div className="flex items-center gap-2 bg-[#0a0a0c] border border-white/[0.1] focus-within:border-white/25 rounded-xl px-4 py-2 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Provoke ${selectedBot.name} in #chaos-sandbox...`}
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-600 focus:outline-none font-outfit"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5"
                  style={{ backgroundColor: selectedBot.color }}
                >
                  <span>SEND</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
