import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import AnimatedLink from './AnimatedLink';
import UnstableEmblem from './UnstableEmblem';
import { DiscordIcon } from './BrandIcons';
import { usePageTransition } from '../contexts/transitionHook';
import { playPop } from '../utils/audio';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'The Bots', to: '/bots' },
  { label: 'Chaos Arena', to: '/arena' },
  { label: 'Community', to: '/community' },
  { label: 'Commands', to: '/commands' },
  { label: 'About', to: '/about' },
];

const BRAND_LETTERS = ['U', 'N', 'S', 'T', 'A', 'B', 'L', 'E'];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { openInviteModal } = usePageTransition();

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full font-outfit"
    >
      {/* Main Sticky Header */}
      <header className="w-full bg-[#000000]/92 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.95)]">
        <div className="max-w-[97.22rem] mx-auto px-6 h-16 relative flex items-center justify-between">
          {/* Interactive Brand Logo with Magnetic Hover Letters */}
          <AnimatedLink
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
            onMouseEnter={() => playPop(1.0)}
          >
            <UnstableEmblem className="w-8 h-8 transition-transform group-hover:scale-105" />
            <div className="flex items-center gap-1 font-unbounded font-black text-base sm:text-lg tracking-tight">
              <div className="flex items-center">
                {BRAND_LETTERS.map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block text-white"
                    whileHover={{ y: -3, scale: 1.15, color: '#FF1744' }}
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
              <span className="text-unstable-gradient">.FUN</span>
            </div>
          </AnimatedLink>

          {/* Center Nav Links */}
          <nav className="hidden lg:inline-flex items-center gap-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {NAV_LINKS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <AnimatedLink
                  key={item.to}
                  to={item.to}
                  className={`h-9 px-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center transition-all ${
                    isActive
                      ? 'text-white font-bold bg-white/[0.08] border border-white/15'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </AnimatedLink>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            <AnimatedLink
              to="/community"
              className="hidden sm:flex items-center text-xs font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] h-9 rounded-full transition-all duration-300 border border-[#5865F2]/30 group overflow-hidden"
            >
              <div className="w-9 h-9 flex items-center justify-center shrink-0">
                <DiscordIcon className="w-4 h-4" />
              </div>
              <span className="max-w-0 opacity-0 group-hover:max-w-[110px] group-hover:opacity-100 group-hover:pr-3.5 transition-all duration-300 whitespace-nowrap overflow-hidden font-mono">
                ASYLUM HQ
              </span>
            </AnimatedLink>

            <button
              onClick={() => {
                playPop(1.1);
                openInviteModal('all');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 h-9 rounded-xl bg-white hover:bg-zinc-200 text-black font-unbounded font-black text-xs tracking-wide transition-all hover:scale-[1.03] active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            >
              <Zap className="w-3.5 h-3.5 text-[#FF1744] fill-[#FF1744]" />
              <span>INVITE BOTS</span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full Screen Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-[#000000]/95 backdrop-blur-3xl p-6 lg:hidden flex flex-col gap-4 overflow-y-auto"
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
                  className={`block py-2 font-unbounded font-black text-2xl ${
                    location.pathname === item.to ? 'text-[#FF1744]' : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  {item.label}
                </AnimatedLink>
              </motion.div>
            ))}

            <button
              onClick={() => {
                setMobileOpen(false);
                openInviteModal('all');
              }}
              className="mt-4 w-full py-4 rounded-2xl bg-[#FF1744] text-white font-unbounded font-black text-sm tracking-wider uppercase cursor-pointer"
            >
              Invite All 4 Bots
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
