import React from 'react';

export default function UnstableEmblem({ className = 'w-10 h-10', animateMode = 'hover' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} overflow-visible`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="unstableBoltGrad" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF1744" />
          <stop offset="50%" stopColor="#FF9100" />
          <stop offset="100%" stopColor="#7C4DFF" />
        </linearGradient>
      </defs>

      {/* Outer broken diamond frame */}
      <path
        d="M50 6 L92 42 L84 50 L92 58 L50 94 L8 58 L16 50 L8 42 Z"
        fill="#000000"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Split lightning/emotion core */}
      <path
        d="M54 14 L26 52 H48 L42 86 L74 44 H52 Z"
        fill="url(#unstableBoltGrad)"
        className={animateMode === 'always' ? 'animate-pulse' : 'group-hover:brightness-125 transition-all'}
      />

      {/* Glitch fracture highlight */}
      <path
        d="M54 14 L26 52 H48"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}
