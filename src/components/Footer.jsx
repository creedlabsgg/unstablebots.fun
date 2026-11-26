import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  MessageCircle,
  Sparkles,
  Flame,
  CloudRain,
  Dumbbell,
  Briefcase,
  Swords,
  Book,
  Code,
  Shield,
  Scale,
  ClipboardList,
  Globe,
  Users,
  LifeBuoy,
  Mail,
  ChevronDown,
  Zap,
  CheckCircle,
  ArrowUpRight,
  Mic,
  Heart,
  FileText,
  Radio,
} from 'lucide-react';
import AnimatedLink from './AnimatedLink';
import UnstableEmblem from './UnstableEmblem';
import { DiscordIcon, YoutubeIcon, TwitterIcon, GithubSvgIcon } from './BrandIcons';
import { playPop, playGrab, playBounce } from '../utils/audio';

/**
 * Footer — Directly inspired by CreeD Labs Engine (C:\Users\Admin\Documents\CreeD Labs Engine\src\components\Footer.jsx)
 * Features:
 * - Unbounded / Outfit / Montserrat 900 / Press Start 2P typography
 * - Hover-triggered wave bounce on social icons
 * - Hover-triggered sliding icon reveals per category column
 * - Interactive draggable magnetic UNSTABLE letters with spring snap-back + Web Audio synth
 * - Inline newsletter subscribe + language toast feedback
 * - Retro pixel-text glitch signature badge
 */
export default function Footer() {
  const [hoverTarget, setHoverTarget] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [email, setEmail] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3800);
  };

  const socialLinks = [
    {
      name: 'YouTube',
      Icon: YoutubeIcon,
      coloredBg: 'bg-[#FF0000] shadow-[0_10px_20px_-10px_rgba(255,0,0,0.8)] border-transparent',
      coloredIcon: 'text-white',
      to: '/community',
    },
    {
      name: 'GitHub',
      Icon: GithubSvgIcon,
      coloredBg: 'bg-white shadow-[0_10px_20px_-10px_rgba(255,255,255,0.5)] border-transparent',
      coloredIcon: 'text-black',
      to: '/commands',
    },
    {
      name: 'Discord',
      Icon: DiscordIcon,
      coloredBg: 'bg-[#5865F2] shadow-[0_10px_20px_-10px_rgba(88,101,242,0.8)] border-transparent scale-110',
      coloredIcon: 'text-white',
      to: '/arena',
    },
    {
      name: 'Twitter',
      Icon: TwitterIcon,
      coloredBg: 'bg-[#1DA1F2] shadow-[0_10px_20px_-10px_rgba(29,161,242,0.8)] border-transparent',
      coloredIcon: 'text-white',
      to: '/community',
    },
  ];

  // Exact CreeD Labs Engine dynamic icon slide-out helper
  const getIconClass = (isPermanent = false, category = null) => {
    const colorClass = isPermanent ? 'text-[#FF1744]' : 'text-zinc-600 group-hover:text-[#FF1744]';
    const base = `h-3.5 transition-all duration-200 ease-out ${colorClass}`;
    if (isPermanent) return `${base} opacity-100 w-3.5 ml-0 shrink-0`;
    const titleHovered = category && (hoverTarget === category || hoverTarget === 'all');
    if (titleHovered) return `${base} opacity-100 w-3.5 ml-0 shrink-0`;
    return `${base} opacity-0 w-0 -ml-2 overflow-hidden group-hover:w-3.5 group-hover:opacity-100 group-hover:ml-0 shrink-0`;
  };

  const getLinkClass = () => 'group flex items-center gap-1.5 transition-all text-zinc-500 hover:text-white';
  const getTextClass = () => 'transition-all duration-200 ease-out group-hover:text-[#FF1744] whitespace-nowrap';

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    playPop(1.2);
    showToast(`Subscribed ${email} to weekly chaos notes. Sanity reduced by 2%.`);
    setEmail('');
  };

  return (
    <section
      className="bg-[#000000] pt-12 pb-0 border-t border-white/[0.08] font-outfit relative z-10 overflow-hidden"
      style={{ minHeight: 'calc(75vh - 80px)' }}
    >
      {/* CreeD Labs Engine Ambient Bottom Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FF1744]/15 via-[#7C4DFF]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[280px] bg-[#FF1744]/15 blur-[130px] rounded-full pointer-events-none md:hidden" />

      <footer className="max-w-[97.22rem] mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-4">
          {/* LEFT BRAND + SOCIALS + LANGUAGE + DRAGGABLE MAGNETIC WORDMARK */}
          <div className="lg:col-span-4 flex flex-col gap-6 h-full">
            <AnimatedLink to="/" className="flex items-center gap-3 md:gap-4 w-fit group">
              <div
                className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0"
                onMouseEnter={() => setHoverTarget('unstable')}
                onMouseLeave={() => setHoverTarget(null)}
              >
                <UnstableEmblem className="w-full h-full" animateMode="hover" />
              </div>

              <div
                className="flex flex-col hidden sm:flex cursor-default w-fit"
                onMouseEnter={() => setHoverTarget('all')}
                onMouseLeave={() => setHoverTarget(null)}
              >
                <span className="font-unbounded font-black text-white text-3xl md:text-4xl tracking-[0.06em] leading-none">
                  Unstable
                </span>
                <div className="flex w-full justify-between font-unbounded font-black text-unstable-gradient text-[11px] md:text-[12px] uppercase mt-1.5 pl-1">
                  {'BOT SQUAD'.split('').map((char, i) => (
                    <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </div>
              </div>
            </AnimatedLink>

            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed">
              Discord bots with emotional baggage. AI with issues. Invite at your own risk. Sanity: 14%. Personality: 100%.
            </p>

            <div className="flex flex-col -mt-1 mb-2">
              {/* Hover-Bouncing Social Badges */}
              <div className="flex items-center gap-3.5 mb-4">
                {socialLinks.map((social, idx) => {
                  const isActive = hoverTarget === 'unstable';
                  return (
                    <AnimatedLink
                      key={idx}
                      to={social.to}
                      title={social.name}
                      onMouseEnter={() => playPop(1 + idx * 0.1)}
                      className={`relative w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 group transition-transform ${
                        isActive ? 'animate-icon-bounce' : ''
                      }`}
                      style={isActive ? { animationDelay: `${idx * 220}ms` } : undefined}
                    >
                      <div className="absolute inset-0 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-all duration-300">
                        <social.Icon className="w-4 h-4" />
                      </div>
                      <div
                        className={`absolute inset-0 rounded-full flex items-center justify-center opacity-0 transition-opacity duration-300 ${social.coloredBg} group-hover:opacity-100 ${
                          isActive ? 'animate-color-pulse' : ''
                        }`}
                        style={isActive ? { animationDelay: `${idx * 220}ms` } : undefined}
                      >
                        <social.Icon className={`w-4 h-4 ${social.coloredIcon}`} />
                      </div>
                    </AnimatedLink>
                  );
                })}
              </div>

              {/* Language Dropdown */}
              <div className="relative w-44">
                <select
                  className="w-full appearance-none bg-[#0a0a0c] border border-white/10 text-zinc-300 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#FF1744] transition-all cursor-pointer font-medium hover:text-white"
                  onChange={(e) => {
                    const lang = e.target.value;
                    if (lang !== 'en') {
                      showToast(`Translating emotional baggage to ${lang}... even Public Enemy complains in ${lang}.`);
                    }
                  }}
                >
                  <option value="en">English, Global</option>
                  <option value="rage">Rage-Bait Dialect</option>
                  <option value="es">Español</option>
                  <option value="ja">日本語</option>
                  <option value="de">Deutsch</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Powered By + CreeD Labs Magnetic Draggable Typography */}
            <div className="flex flex-col mt-auto ml-0 sm:ml-4 overflow-visible pointer-events-none pt-4">
              <span className="relative z-50 pointer-events-auto cursor-default font-outfit font-black text-xl md:text-3xl text-zinc-500 uppercase tracking-[0.4em] mb-1 ml-2">
                Powered By
              </span>

              <div className="relative w-full flex flex-col justify-center items-start mt-0 overflow-visible ml-4 sm:ml-8">
                <div className="flex justify-start items-baseline gap-4 z-20 [perspective:1000px]">
                  <div className="flex" style={{ fontFamily: "'Montserrat', 'Arial Black', sans-serif", fontWeight: 900 }}>
                    {['C', 'r', 'e', 'e', 'D'].map((letter, i) => {
                      const rotateRange = [-6, 5, -7, 6, -5];
                      return (
                        <motion.span
                          key={i}
                          drag
                          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                          dragElastic={0.7}
                          dragSnapToOrigin={true}
                          dragTransition={{ bounceStiffness: 400, bounceDamping: 10 }}
                          initial={{ opacity: 0, y: 60 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 20,
                            opacity: { delay: i * 0.08 },
                            y: { delay: i * 0.08 },
                          }}
                          onHoverStart={() => playPop(1 + i * 0.15)}
                          onDragStart={() => playGrab()}
                          onDragEnd={() => playBounce()}
                          whileHover={{
                            scale: 1.1,
                            rotate: rotateRange[i],
                            zIndex: 50,
                          }}
                          whileTap={{
                            cursor: 'grabbing',
                            scale: 0.9,
                            rotate: rotateRange[i] * 1.5,
                          }}
                          className="text-[clamp(2.77rem,10vw,7.5rem)] leading-[0.9] pb-4 text-white cursor-grab transition-colors duration-300 drop-shadow-xl relative select-none mr-1 sm:mr-2 pointer-events-auto"
                          style={{
                            WebkitTextStroke: '2px rgba(255,255,255,0.06)',
                            zIndex: 20,
                            display: 'inline-block',
                            transformOrigin: 'center center',
                          }}
                        >
                          {letter}
                        </motion.span>
                      );
                    })}
                  </div>

                  <span className="font-outfit font-black text-[clamp(1.1rem,3.5vw,3.5rem)] text-zinc-600 tracking-[0.2em] uppercase select-none pointer-events-none">
                    Labs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT NAVIGATION COLUMNS (6 Clean Columns + Nested Subscribe from CreeD Labs Engine) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 xl:gap-8">
            {/* Col 1: Bots */}
            <div>
              <h4
                className="font-unbounded font-bold text-white mb-5 w-fit cursor-default text-sm"
                onMouseEnter={() => setHoverTarget('bots')}
                onMouseLeave={() => setHoverTarget(null)}
              >
                The Bots
              </h4>
              <ul className="flex flex-col gap-3.5 text-sm font-outfit font-medium">
                <li>
                  <AnimatedLink to="/bots#public-enemy" className={getLinkClass()}>
                    <Flame className={getIconClass(true)} />
                    <span className={getTextClass()}>Public Enemy</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/bots#lost-cause" className={getLinkClass()}>
                    <CloudRain className={getIconClass(false, 'bots')} />
                    <span className={getTextClass()}>Lost Cause</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/bots#hard-truth" className={getLinkClass()}>
                    <Dumbbell className={getIconClass(false, 'bots')} />
                    <span className={getTextClass()}>Hard Truth</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/bots#standard-issue" className={getLinkClass()}>
                    <Briefcase className={getIconClass(false, 'bots')} />
                    <span className={getTextClass()}>Standard Issue</span>
                  </AnimatedLink>
                </li>
              </ul>
            </div>

            {/* Col 2: Features */}
            <div>
              <h4
                className="font-unbounded font-bold text-white mb-5 w-fit cursor-default text-sm"
                onMouseEnter={() => setHoverTarget('features')}
                onMouseLeave={() => setHoverTarget(null)}
              >
                Features
              </h4>
              <ul className="flex flex-col gap-3.5 text-sm font-outfit font-medium">
                <li>
                  <AnimatedLink to="/pricing" className={getLinkClass()}>
                    <Zap className={getIconClass(true)} />
                    <span className={getTextClass()}>Pricing Plans</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/arena" className={getLinkClass()}>
                    <Swords className={getIconClass(false, 'features')} />
                    <span className={getTextClass()}>4-Bot Brawl</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/bots" className={getLinkClass()}>
                    <Mic className={getIconClass(false, 'features')} />
                    <span className={getTextClass()}>VC Heckling</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/commands" className={getLinkClass()}>
                    <Terminal className={getIconClass(false, 'features')} />
                    <span className={getTextClass()}>/target Lock</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/arena" className={getLinkClass()}>
                    <Radio className={getIconClass(false, 'features')} />
                    <span className={getTextClass()}>Live Arena</span>
                  </AnimatedLink>
                </li>
              </ul>
            </div>

            {/* Col 3: Learn */}
            <div>
              <h4
                className="font-unbounded font-bold text-white mb-5 w-fit cursor-default text-sm"
                onMouseEnter={() => setHoverTarget('learn')}
                onMouseLeave={() => setHoverTarget(null)}
              >
                Learn
              </h4>
              <ul className="flex flex-col gap-3.5 text-sm font-outfit font-medium">
                <li>
                  <AnimatedLink to="/commands" className={getLinkClass()}>
                    <Book className={getIconClass(true)} />
                    <span className={getTextClass()}>Command Codex</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/bots" className={getLinkClass()}>
                    <Code className={getIconClass(false, 'learn')} />
                    <span className={getTextClass()}>System Prompts</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/about" className={getLinkClass()}>
                    <FileText className={getIconClass(false, 'learn')} />
                    <span className={getTextClass()}>Architecture</span>
                  </AnimatedLink>
                </li>
              </ul>
            </div>

            {/* Col 4: Community */}
            <div>
              <h4
                className="font-unbounded font-bold text-white mb-5 w-fit cursor-default text-sm"
                onMouseEnter={() => setHoverTarget('community')}
                onMouseLeave={() => setHoverTarget(null)}
              >
                Community
              </h4>
              <ul className="flex flex-col gap-3.5 text-sm font-outfit font-medium">
                <li>
                  <AnimatedLink to="/community" className={getLinkClass()}>
                    <Users className={getIconClass(true)} />
                    <span className={getTextClass()}>Chaos Hub</span>
                    <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/community" className={getLinkClass()}>
                    <Heart className={getIconClass(false, 'community')} />
                    <span className={getTextClass()}>Meltdown Feed</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/about" className={getLinkClass()}>
                    <LifeBuoy className={getIconClass(false, 'community')} />
                    <span className={getTextClass()}>Bot Therapy</span>
                  </AnimatedLink>
                </li>
              </ul>
            </div>

            {/* Col 5: Legal */}
            <div>
              <h4
                className="font-unbounded font-bold text-white mb-5 w-fit cursor-default text-sm"
                onMouseEnter={() => setHoverTarget('legal')}
                onMouseLeave={() => setHoverTarget(null)}
              >
                Legal
              </h4>
              <ul className="flex flex-col gap-3.5 text-sm font-outfit font-medium">
                <li>
                  <AnimatedLink to="/legal" className={getLinkClass()}>
                    <Scale className={getIconClass(false, 'legal')} />
                    <span className={getTextClass()}>Terms of Chaos</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/legal" className={getLinkClass()}>
                    <Shield className={getIconClass(false, 'legal')} />
                    <span className={getTextClass()}>Privacy Policy</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/legal" className={getLinkClass()}>
                    <ClipboardList className={getIconClass(false, 'legal')} />
                    <span className={getTextClass()}>Liability Waiver</span>
                  </AnimatedLink>
                </li>
              </ul>
            </div>

            {/* Col 6: Company */}
            <div>
              <h4
                className="font-unbounded font-bold text-white mb-5 w-fit cursor-default text-sm"
                onMouseEnter={() => setHoverTarget('company')}
                onMouseLeave={() => setHoverTarget(null)}
              >
                Lab
              </h4>
              <ul className="flex flex-col gap-3.5 text-sm font-outfit font-medium">
                <li>
                  <AnimatedLink to="/about" className={getLinkClass()}>
                    <Globe className={getIconClass(true)} />
                    <span className={getTextClass()}>About Us</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/about" className={getLinkClass()}>
                    <Sparkles className={getIconClass(false, 'company')} />
                    <span className={getTextClass()}>Origin Story</span>
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/community" className={getLinkClass()}>
                    <MessageCircle className={getIconClass(false, 'company')} />
                    <span className={getTextClass()}>Join Asylum</span>
                  </AnimatedLink>
                </li>
              </ul>
            </div>

            {/* Nested Subscribe Card (Exact CreeD Labs Engine Footer placement) */}
            <div className="col-span-2 sm:col-span-3 lg:col-start-4 lg:col-span-3 mt-4 lg:-mt-2 pt-0 relative z-10">
              <h4 className="font-unbounded font-bold text-white mb-2 text-sm">Subscribe to Chaos</h4>
              <p className="text-xs text-zinc-500 font-outfit mb-3">
                Get patch notes, new bots, and weekly server meltdowns straight to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#0a0a0c] border border-white/10 text-white text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#FF1744] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold px-5 py-2.5 rounded-xl transition-all text-sm cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Copyright + Retro Pixel Signature */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 pb-6 mt-2 border-t border-white/[0.06] text-sm text-zinc-500 font-outfit">
          <p>© 2026 UnstableBots (unstablebots.fun). All mental breakdowns reserved.</p>

          <div className="flex items-center gap-2 mt-4 md:mt-0 text-sm font-medium tracking-wide">
            <span className="text-zinc-500 italic">Built with React</span>
            <Zap className="w-4 h-4 text-[#FF1744] fill-[#FF1744] mx-1 drop-shadow-[0_0_8px_rgba(255,23,68,0.6)]" />
            <span className="text-zinc-500 italic flex items-center gap-2">
              crafted by{' '}
              <span className="pixel-text glitch-effect" data-text="Yuvraj.GG">
                Yuvraj.<span className="-ml-[0.45em]">GG</span>
              </span>
            </span>
          </div>
        </div>

        {/* Floating Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.92 }}
              className="fixed bottom-6 right-6 z-50 bg-[#050507] border border-[#FF1744]/40 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm backdrop-blur-md"
            >
              <CheckCircle className="w-4 h-4 text-[#FF1744] shrink-0" />
              <p className="text-xs font-mono">{toastMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </section>
  );
}
