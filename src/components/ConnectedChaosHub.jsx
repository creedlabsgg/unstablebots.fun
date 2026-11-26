import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Mic, Swords, ShieldAlert, Briefcase, Cpu } from 'lucide-react';
import UnstableEmblem from './UnstableEmblem';

/**
 * ConnectedChaosHub — Modeled directly after Quark.bot "Know it? Quark works with it."
 * Magic UI-style animated curved SVG beams with glowing traveling photon particles.
 */
export default function ConnectedChaosHub() {
  const [activeNodeId, setActiveNodeId] = useState('fight');

  const nodes = [
    {
      id: 'general',
      name: '#general Chat',
      role: 'Text Channels',
      action: '24/7 Unhinged Banter',
      desc: 'Mention any bot or use prefixes (!pe, !lc, !ht, !si) to spark instant arguments in text channels.',
      color: '#FF1744',
      icon: Hash,
      status: 'ROASTING LIVE',
      curvePath: 'M 70 60 C 200 60, 200 210, 300 210',
    },
    {
      id: 'voice',
      name: 'Voice Channels',
      role: 'Real-Time VC Audio',
      action: 'Sighs, Screams & Heckling',
      desc: 'UnstableBots hop straight into your Discord voice call to heckle clutches or sigh into the mic.',
      color: '#7C4DFF',
      icon: Mic,
      status: 'VC CONNECTED',
      curvePath: 'M 530 60 C 400 60, 400 210, 300 210',
    },
    {
      id: 'fight',
      name: 'Fight Channel',
      role: 'Autonomous Arena',
      action: '4-Bot Perpetual Chaos',
      desc: 'Set a dedicated fight channel and watch The Rage-Baiter, The Overthinker, The Yeller, and The Employee roast each other nonstop.',
      color: '#FF9100',
      icon: Swords,
      status: 'BRAWL ACTIVE',
      curvePath: 'M 70 210 L 300 210',
    },
    {
      id: 'hr',
      name: 'HR Compliance',
      role: 'Corporate Filter',
      action: 'Automated Incident Tickets',
      desc: 'The Employee listens quietly for drama and files hilariously robotic HR write-ups in real time.',
      color: '#00E5FF',
      icon: Briefcase,
      status: 'SYNERGY LOCKED',
      curvePath: 'M 530 210 L 300 210',
    },
    {
      id: 'target',
      name: 'Target Lock',
      role: 'Mod Entertainment',
      action: '/target @friend Precision',
      desc: 'Assign The Rage-Baiter or The Yeller to follow a specific friend whenever they send a message.',
      color: '#FF1744',
      icon: ShieldAlert,
      status: 'LOCK ON READY',
      curvePath: 'M 70 360 C 200 360, 200 210, 300 210',
    },
    {
      id: 'core',
      name: 'Unified AI Brain',
      role: 'Shared Python Core',
      action: 'Multi-Personality Routing',
      desc: 'All 4 bots share one low-latency orchestration core — isolated error handling, zero downtime.',
      color: '#7C4DFF',
      icon: Cpu,
      status: 'SANITY: 14%',
      curvePath: 'M 530 360 C 400 360, 400 210, 300 210',
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[2];

  const renderNodeButton = (node) => {
    const Icon = node.icon;
    const isActive = activeNodeId === node.id;

    return (
      <div key={node.id} className="relative flex flex-col items-center">
        <button
          type="button"
          onClick={() => setActiveNodeId(node.id)}
          onMouseEnter={() => setActiveNodeId(node.id)}
          className={`z-20 flex items-center justify-center rounded-full transition-all duration-300 size-12 md:size-14 relative group/node cursor-pointer bg-zinc-950 border ${
            isActive ? 'scale-115' : 'border-zinc-800 hover:scale-110'
          }`}
          style={{
            borderColor: isActive ? node.color : undefined,
            boxShadow: isActive ? `0 0 28px ${node.color}55` : undefined,
            color: isActive ? node.color : '#a1a1aa',
          }}
          aria-label={node.name}
        >
          <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.2} />
        </button>

        <span
          className={`absolute top-full mt-2 whitespace-nowrap text-[11px] md:text-xs font-mono transition-colors ${
            isActive ? 'text-white font-bold' : 'text-zinc-500'
          }`}
        >
          {node.name}
        </span>
      </div>
    );
  };

  return (
    <section className="py-24 sm:py-28 relative bg-[#000000] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold mb-5 font-unbounded text-white">
            Know Discord? UnstableBots <span className="text-zinc-500">breaks</span> it.
          </h2>
          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-outfit">
            Hover any channel or module below to inspect how our 4 unstable personalities wire into your server.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="relative flex h-fit w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-[#040406] p-8 sm:p-14 md:p-20 shadow-[0_20px_80px_rgba(0,0,0,0.95)]">
            {/* Dot Grid */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
            </div>

            {/* Ambient Core Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full pointer-events-none blur-3xl opacity-20 transition-all duration-700"
              style={{
                background: `radial-gradient(circle, ${activeNode.color} 0%, transparent 70%)`,
              }}
            />

            {/* 3-Row Animated Beam Diagram */}
            <div className="flex size-full flex-col max-w-lg mx-auto min-h-[340px] md:min-h-[400px] items-stretch justify-between gap-12 z-10 relative w-full">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 600 420"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="chaosBeamGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {nodes.map((node, i) => {
                  const isActive = activeNodeId === node.id;
                  return (
                    <g key={node.id}>
                      <path
                        d={node.curvePath}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d={node.curvePath}
                        stroke={node.color}
                        strokeWidth={isActive ? '3' : '2'}
                        strokeOpacity={isActive ? '0.9' : '0.25'}
                        strokeLinecap="round"
                        fill="none"
                        filter={isActive ? 'url(#chaosBeamGlow)' : undefined}
                      />
                      <circle r={isActive ? '4.5' : '3'} fill={node.color} filter="url(#chaosBeamGlow)">
                        <animateMotion
                          path={node.curvePath}
                          dur={`${2.1 + (i % 3) * 0.45}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  );
                })}
              </svg>

              {/* Row 1 */}
              <div className="flex flex-row items-center justify-between w-full">
                {renderNodeButton(nodes[0])}
                {renderNodeButton(nodes[1])}
              </div>

              {/* Row 2 with Center Emblem */}
              <div className="flex flex-row items-center justify-between w-full">
                {renderNodeButton(nodes[2])}

                <div className="z-20 relative flex flex-col items-center">
                  <div
                    className="flex items-center justify-center rounded-full size-20 md:size-24 border-4 relative bg-[#000000] transition-all duration-300 hover:scale-110"
                    style={{
                      borderColor: `${activeNode.color}66`,
                      boxShadow: `0 0 40px ${activeNode.color}44`,
                    }}
                  >
                    <div
                      className="absolute -inset-2.5 rounded-full border border-dashed border-[#FF1744]/35 pointer-events-none animate-spin"
                      style={{ animationDuration: '20s' }}
                    />
                    <UnstableEmblem className="w-11 h-11 md:w-12 md:h-12" animateMode="always" />
                  </div>
                </div>

                {renderNodeButton(nodes[3])}
              </div>

              {/* Row 3 */}
              <div className="flex flex-row items-center justify-between w-full">
                {renderNodeButton(nodes[4])}
                {renderNodeButton(nodes[5])}
              </div>
            </div>

            {/* Active Node Readout Card */}
            <div className="w-full max-w-2xl mx-auto mt-14 pt-6 border-t border-white/10 relative z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeNode.color }} />
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider" style={{ color: activeNode.color }}>
                        {activeNode.status} • {activeNode.role}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold font-unbounded text-white">
                      {activeNode.name}: {activeNode.action}
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 max-w-xl">
                      {activeNode.desc}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <span className="font-mono text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-lg border border-white/10 bg-black text-zinc-300 uppercase">
                      MODULE READY
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
