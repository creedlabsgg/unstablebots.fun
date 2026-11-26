import React, { useState } from 'react';
import { ExternalLink, Users } from 'lucide-react';
import { COMMUNITY_TESTIMONIALS } from '../data/bots';
import AnimatedLink from './AnimatedLink';

function ProofCard({ item }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse((prev) => ({ ...prev, active: false }))}
      className="group/card relative rounded-2xl border border-white/10 bg-[#000000]/95 hover:border-white/25 p-6 overflow-hidden transition-all duration-300 select-none flex flex-col justify-between"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 z-10"
        style={{
          background: `radial-gradient(320px circle at ${mouse.x}px ${mouse.y}px, ${item.botColor}22, transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 bg-zinc-950 text-white transition-transform duration-300 group-hover/card:scale-105"
              style={{
                color: mouse.active ? item.botColor : undefined,
                borderColor: mouse.active ? `${item.botColor}65` : undefined,
              }}
            >
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold leading-tight font-unbounded text-sm sm:text-base text-white">
                {item.community}
              </h3>
              <p className="text-xs text-zinc-500 font-mono">{item.members}</p>
            </div>
          </div>

          <AnimatedLink
            to="/community"
            className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
            aria-label={`Open ${item.community}`}
          >
            <ExternalLink className="w-4 h-4" />
          </AnimatedLink>
        </div>

        <div className="flex-grow mb-5">
          <p className="text-zinc-300 text-sm leading-relaxed">
            &ldquo;{item.quoteLeading}{' '}
            <span className="font-bold" style={{ color: item.botColor }}>
              {item.highlight}
            </span>{' '}
            {item.quoteTrailing}&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] mt-auto">
          <div
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-white shrink-0"
            style={{ backgroundColor: `${item.botColor}22` }}
          >
            {item.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">{item.authorName}</span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
              {item.authorRole}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * CommunityProofGrid — Exact Quark.bot "Loved by chaotic communities worldwide."
 * 3-Column Vertical Continuous Marquee with Gradient Masks & Hover Pause
 */
export default function CommunityProofGrid() {
  const [colOne, colTwo, colThree] = COMMUNITY_TESTIMONIALS;

  return (
    <section className="py-24 sm:py-28 overflow-hidden bg-[#000000] relative">
      <div className="max-w-7xl mx-auto px-6 mb-14 text-center relative z-10">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#7C4DFF] font-bold mb-3 block">
          COMMUNITY CHAOS WALL
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-5 font-unbounded text-white">
          Trusted by <span className="text-zinc-500">unhinged</span> servers.
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-outfit">
          From late-night gaming VCs to 200k-member meme empires, see what happens when Discord servers stop inviting polite bots.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 h-[680px] overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 isolate">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 z-20 bg-gradient-to-b from-[#000000] via-[#000000]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-20 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent" />

        {/* Col 1 */}
        <div
          className="flex flex-col gap-6 pb-6 testimonial-marquee hover:[animation-play-state:paused]"
          style={{ '--dur': '34s' }}
        >
          {colOne.concat(colOne).map((item, i) => (
            <ProofCard key={`${item.id}-${i}`} item={item} />
          ))}
        </div>

        {/* Col 2 */}
        <div
          className="hidden md:flex flex-col gap-6 pb-6 testimonial-marquee hover:[animation-play-state:paused]"
          style={{ '--dur': '44s' }}
        >
          {colTwo.concat(colTwo).map((item, i) => (
            <ProofCard key={`${item.id}-${i}`} item={item} />
          ))}
        </div>

        {/* Col 3 */}
        <div
          className="hidden lg:flex flex-col gap-6 pb-6 testimonial-marquee hover:[animation-play-state:paused]"
          style={{ '--dur': '38s' }}
        >
          {colThree.concat(colThree).map((item, i) => (
            <ProofCard key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
