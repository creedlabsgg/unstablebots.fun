import React from 'react';

/**
 * Pure Zed-Black Background with Far-Flank Atmospheric Glows
 * Modeled directly after QuarkAmbientBackground in creedcybersec.in
 */
export default function QuarkAmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Pure Zed Black Base Canvas */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* 2. Top-Left Flank Glow: Rage Crimson (#FF1744) */}
      <div
        className="absolute -top-[10%] -left-[22%] sm:-left-[16%] lg:-left-[12%] w-[750px] sm:w-[950px] lg:w-[1150px] h-[750px] sm:h-[950px] lg:h-[1150px] rounded-full pointer-events-none blur-[140px] sm:blur-[170px]"
        style={{
          transform: 'translate3d(0, 0, 0)',
          background:
            'radial-gradient(circle at center, rgba(255, 23, 68, 0.11) 0%, rgba(255, 23, 68, 0.05) 35%, rgba(255, 23, 68, 0.015) 65%, transparent 85%)',
        }}
      />

      {/* 3. Top-Right Flank Glow: Nihilist Violet (#7C4DFF) */}
      <div
        className="absolute top-[5%] -right-[22%] sm:-right-[16%] lg:-right-[12%] w-[750px] sm:w-[950px] lg:w-[1150px] h-[750px] sm:h-[950px] lg:h-[1150px] rounded-full pointer-events-none blur-[140px] sm:blur-[170px]"
        style={{
          transform: 'translate3d(0, 0, 0)',
          background:
            'radial-gradient(circle at center, rgba(124, 77, 255, 0.11) 0%, rgba(124, 77, 255, 0.05) 35%, rgba(124, 77, 255, 0.015) 65%, transparent 85%)',
        }}
      />

      {/* 4. Mid-Page Left Atmosphere: Aggressive Amber (#FF9100) */}
      <div
        className="absolute top-[45%] -left-[24%] sm:-left-[18%] w-[750px] sm:w-[950px] h-[750px] sm:h-[950px] rounded-full pointer-events-none blur-[160px]"
        style={{
          transform: 'translate3d(0, 0, 0)',
          background:
            'radial-gradient(circle at center, rgba(255, 145, 0, 0.065) 0%, rgba(255, 23, 68, 0.025) 45%, transparent 75%)',
        }}
      />

      {/* 5. Lower-Page Right Atmosphere: Corporate Cyan (#00E5FF) */}
      <div
        className="absolute top-[68%] -right-[24%] sm:-right-[18%] w-[750px] sm:w-[950px] h-[750px] sm:h-[950px] rounded-full pointer-events-none blur-[160px]"
        style={{
          transform: 'translate3d(0, 0, 0)',
          background:
            'radial-gradient(circle at center, rgba(0, 229, 255, 0.065) 0%, rgba(124, 77, 255, 0.025) 45%, transparent 75%)',
        }}
      />
    </div>
  );
}
