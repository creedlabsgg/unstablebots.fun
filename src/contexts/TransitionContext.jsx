import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UnstableEmblem from '../components/UnstableEmblem';
import { TransitionContext } from './transitionHook';

const PAGE_ORDER = {
  '/': 0,
  '/bots': 1,
  '/arena': 2,
  '/community': 3,
  '/commands': 4,
  '/about': 5,
  '/legal': 6,
};

export function TransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('right-to-left');
  const [inviteBotId, setInviteBotId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const openInviteModal = (botId = 'all') => setInviteBotId(botId);
  const closeInviteModal = () => setInviteBotId(null);

  const executeTransition = (newTarget, dir) => {
    if (!newTarget) return;
    const [targetPath, targetHash] = newTarget.split('#');
    const cleanTarget = targetPath || '/';

    if (isTransitioning) return;

    if (location.pathname === cleanTarget) {
      if (targetHash) {
        const el = document.getElementById(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    let resolvedDir = 'right-to-left';
    if (dir === 'right-to-left' || dir === 'left-to-right') {
      resolvedDir = dir;
    } else {
      const currentIndex = PAGE_ORDER[location.pathname] ?? 0;
      const targetIndex = PAGE_ORDER[cleanTarget] ?? 0;
      resolvedDir = targetIndex >= currentIndex ? 'right-to-left' : 'left-to-right';
    }

    setDirection(resolvedDir);
    setIsTransitioning(true);

    setTimeout(() => {
      navigate(cleanTarget);
      window.scrollTo(0, 0);

      if (targetHash) {
        setTimeout(() => {
          const el = document.getElementById(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, 90);
    }, 500);
  };

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        executeTransition,
        inviteBotId,
        openInviteModal,
        closeInviteModal,
      }}
    >
      {children}

      {isTransitioning && (
        <div
          className="fixed inset-0 z-[99998] flex items-center justify-center transition-opacity duration-300 select-none opacity-100 pointer-events-auto"
          aria-hidden={!isTransitioning}
        >
          <div
            className={`absolute inset-0 bg-[#000000] border-x border-white/10 transition-transform duration-600 ease-[cubic-bezier(0.85,0,0.15,1)] ${
              direction === 'right-to-left'
                ? 'scale-x-100 origin-right'
                : 'scale-x-100 origin-left'
            }`}
          />
          <div
            className="z-10 flex flex-col items-center gap-3 transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-100 opacity-100 delay-200"
          >
            <UnstableEmblem className="w-20 h-20" animateMode="always" />
            <span className="font-mono text-[10px] tracking-[0.35em] text-zinc-500 uppercase">
              LOADING CHAOS...
            </span>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  );
}
