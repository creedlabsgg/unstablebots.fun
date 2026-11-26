import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Cpu, Heart, ChevronDown, Zap } from 'lucide-react';
import AnimatedLink from '../components/AnimatedLink';

const FAQS = [
  {
    q: 'Are these bots actually safe for my Discord server?',
    a: 'Technically yes — they have zero admin destructive permissions. Emotionally? No guarantees. Invite at your own risk.',
  },
  {
    q: 'Can all 4 bots really argue inside one channel?',
    a: 'Yes. Using our unified Python orchestration engine, all 4 personalities share context awareness and can fight each other in #fight-channel without blowing up your server RAM.',
  },
  {
    q: 'Do they work in Voice Channels too?',
    a: 'Public Enemy, Lost Cause, and Hard Truth include VC interruption hooks so you can summon roasts, exhausted sighs, or 5 AM motivational yelling live in voice calls.',
  },
  {
    q: 'Why does Standard Issue sound like HR?',
    a: 'Every chaotic crew needs one suspiciously polite corporate AI filing incident tickets while the world burns around it.',
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-transparent pt-16 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="font-mono text-xs text-[#FF9100] tracking-[0.28em] uppercase mb-3 block font-bold">
            INCIDENT REPORT #004
          </span>
          <h1 className="font-unbounded font-black text-4xl sm:text-6xl text-white mb-4">
            We Gave AI <span className="text-unstable-gradient">Emotional Baggage.</span>
          </h1>
          <p className="font-outfit text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Most Discord bots want to welcome new members and hand out roles. Ours want to pick fights, stare into the void, and schedule passive-aggressive HR meetings.
          </p>
        </motion.div>

        <div className="space-y-8 mb-16">
          <div className="rounded-3xl border border-white/[0.08] bg-[#000000] p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#FF1744]" />
              <h2 className="font-unbounded font-bold text-xl text-white">Origin Story</h2>
            </div>
            <p className="font-outfit text-zinc-400 leading-relaxed mb-4">
              It began as a late-night experiment: &ldquo;What if we stripped away polite AI disclaimers and gave four bots distinct, volatile coping mechanisms?&rdquo;
            </p>
            <p className="font-outfit text-zinc-400 leading-relaxed">
              Public Enemy inherited unfiltered rage-baiting. Lost Cause absorbed pure late-night nihilism. Hard Truth swallowed an entire pre-workout tub. And Standard Issue became corporate HR to try keeping them under compliance. Now average sanity sits permanently at 14%.
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-[#000000] p-8">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-[#00E5FF]" />
              <h2 className="font-unbounded font-bold text-xl text-white">Unified Bot Architecture</h2>
            </div>
            <p className="font-outfit text-zinc-400 leading-relaxed">
              Under the hood, all four personalities share a single asynchronous Python inference router with isolated try/catch fault boundaries — meaning even if Public Enemy crashes from arguing too hard, Lost Cause keeps sighing uninterrupted.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-16">
          <h2 className="font-unbounded font-black text-2xl text-white mb-6 text-center">
            Frequently Asked Breakdowns
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.08] bg-[#000000] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="font-unbounded font-bold text-sm sm:text-base text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${openFaq === idx ? 'rotate-180 text-[#FF1744]' : ''}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 font-outfit text-sm text-zinc-400 leading-relaxed border-t border-white/[0.05] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/[0.1] bg-[#000000] p-10 text-center">
          <Heart className="w-8 h-8 text-[#FF1744] mx-auto mb-3" />
          <h3 className="font-unbounded font-black text-2xl text-white mb-2">Ready to test the bots?</h3>
          <p className="text-zinc-400 text-sm mb-6">Head straight to the interactive simulator or invite the squad.</p>
          <AnimatedLink
            to="/arena"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#FF1744] text-white font-unbounded font-bold text-xs uppercase tracking-wider"
          >
            <Zap className="w-4 h-4" />
            <span>Launch Chaos Arena</span>
          </AnimatedLink>
        </div>
      </div>
    </div>
  );
}
