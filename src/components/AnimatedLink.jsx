import React from 'react';
import { usePageTransition } from '../contexts/transitionHook';

export default function AnimatedLink({
  to,
  children,
  className = '',
  direction,
  onClick,
  ...props
}) {
  const { isTransitioning, executeTransition } = usePageTransition();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (isTransitioning) return;

    if (
      to &&
      !to.startsWith('#') &&
      !to.startsWith('http://') &&
      !to.startsWith('https://') &&
      !to.startsWith('mailto:')
    ) {
      e.preventDefault();
      executeTransition(to, direction);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
