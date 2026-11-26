import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Volume2, VolumeX } from 'lucide-react';
import AnimatedLink from './AnimatedLink';
import UnstableEmblem from './UnstableEmblem';
import { DiscordIcon } from './BrandIcons';
import { usePageTransition } from '../contexts/transitionHook';
import { playPop, toggleSound, isSoundEnabled } from '../utils/audio';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'The Bots', to: '/bots' },
  { label: 'Chaos Arena', to: '/arena' },
  { label: 'Commands', to: '/commands' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Community', to: '/community' },
  { label: 'About', to: '/about' },
];

const BRAND_LETTERS = ['U', 'N', 'S', 'T', 'A', 'B', 'L', 'E'];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());
  const location = useLocation();
  const { openInviteModal } = usePageTransition();

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-3 pb-2 font-outfit pointer-events-none"
    >
      {/* Floating Cyber Dynamic Island Container */}
      <div className="max-w-[97.22rem] mx-auto pointer-events-auto">
        <div className="relative rounded-2xl bg-[#000000]/88 backdrop-blur-2xl border border-white/[0.12] shadow-[0_12px_45px_rgba(0,0,0,0.92)] px-4 sm:px-6 h-16 flex items-center justify-between transition-all duration-300 hover:border-white/20">
          
          {/* Top subtle neon seam glow */}
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#FFB703]/50 to-transparent" />

          {/* Left: Interactive Brand Logo with Magnetic Letters */}
          <div className="flex items-center gap-3 shrink-0">
            <AnimatedLink
              to="/"
              className="flex items-center gap-2.5 group"
              onMouseEnter={() => playPop(1.0)}
            >
              <UnstableEmblem className="w-8 h-8 transition-transform group-hover:scale-110 drop-shadow-[0_0_12px_rgba(255,183,3,0.35)]" />
              <div className="flex items-center gap-1 font-unbounded font-black text-base sm:text-lg tracking-tight">
                <div className="flex items-center">
                  {BRAND_LETTERS.map((char, index) => (
                    <motion.span
                      key={index}
                      className="inline-block text-white"
                      whileHover={{ y: -3, scale: 1.18, color: '#FFB703' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        playPop(1.0 + index * 0.08);
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <span className="text-gold-gradient font-black">.FUN</span>
              </div>
            </AnimatedLink>

            {/* Live Bot Status Dot (Neko style) */}
            <div className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="font-bold text-zinc-300">4 ONLINE</span>
              <span className="text-zinc-600">|</span>
              <span className="text-[#FFB703] font-bold">14% SANITY</span>
            </div>
          </div>

          {/* Center Nav Links with active indicator */}
          <nav className="hidden lg:inline-flex items-center gap-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {NAV_LINKS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <AnimatedLink
                  key={item.to}
                  to={item.to}
                  className={`h-9 px-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center transition-all relative ${
                    isActive
                      ? 'text-[#FFB703] font-bold bg-[#FFB703]/10 border border-[#FFB703]/30 shadow-[0_0_15px_rgba(255,183,3,0.15)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {item.label}
                  {item.label === 'Pricing' && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[#FF1744] text-[9px] font-bold text-white font-mono">
                      NEW
                    </span>
                  )}
                </AnimatedLink>
              );
            })}
          </nav>

          {/* Right Actions: Sound Toggle + Discord HQ + Invite CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Synth Equalizer Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                soundOn
                  ? 'bg-[#FFB703]/10 border-[#FFB703]/30 text-[#FFB703]'
                  : 'bg-white/5 border-white/10 text-zinc-500'
              }`}
              title={soundOn ? 'Mute Web Audio Synth' : 'Enable Web Audio Synth'}
              aria-label="Toggle Sound"
            >
              {soundOn ? (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden md:inline font-mono text-[10px] font-bold tracking-wider">
                    SFX ON
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden md:inline font-mono text-[10px] font-bold tracking-wider">
                    MUTED
                  </span>
                </>
              )}
            </button>

            {/* Discord Asylum Button */}
            <AnimatedLink
              to="/community"
              className="hidden sm:flex items-center text-xs font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] h-9 rounded-full transition-all duration-300 border border-[#5865F2]/40 group overflow-hidden shadow-[0_0_20px_rgba(88,101,242,0.25)]"
            >
              <div className="w-9 h-9 flex items-center justify-center shrink-0">
                <DiscordIcon className="w-4 h-4" />
              </div>
              <span className="max-w-0 opacity-0 group-hover:max-w-[110px] group-hover:opacity-100 group-hover:pr-3.5 transition-all duration-300 whitespace-nowrap overflow-hidden font-mono">
                ASYLUM HQ
              </span>
            </AnimatedLink>

            {/* Glowing Invite Button */}
            <button
              onClick={() => {
                playPop(1.1);
                openInviteModal('all');
              }}
              className="inline-flex items-center gap-1.5 px-4 h-9 rounded-xl bg-gradient-to-r from-[#FFB703] via-[#FB8500] to-[#FF1744] hover:brightness-110 text-black font-unbounded font-black text-xs tracking-wide transition-all hover:scale-[1.04] active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(255,183,3,0.3)]"
            >
              <Zap className="w-3.5 h-3.5 text-black fill-black" />
              <span className="hidden xs:inline">INVITE</span>
              <span>BOTS</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full Screen Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-20 bottom-0 z-40 bg-[#000000]/98 backdrop-blur-3xl p-6 lg:hidden flex flex-col gap-4 overflow-y-auto pointer-events-auto border-t border-white/10"
          >
            {NAV_LINKS.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <AnimatedLink
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2.5 font-unbounded font-black text-2xl flex items-center justify-between ${
                    location.pathname === item.to
                      ? 'text-[#FFB703]'
                      : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.label === 'Pricing' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#FF1744] text-[10px] text-white font-mono">
                      NEW
                    </span>
                  )}
                </AnimatedLink>
              </motion.div>
            ))}

            <button
              onClick={() => {
                setMobileOpen(false);
                openInviteModal('all');
              }}
              className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-[#FFB703] via-[#FB8500] to-[#FF1744] text-black font-unbounded font-black text-sm tracking-wider uppercase cursor-pointer shadow-[0_0_30px_rgba(255,183,3,0.4)]"
            >
              Invite All 4 Bots
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
