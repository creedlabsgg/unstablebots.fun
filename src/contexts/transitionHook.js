import { createContext, useContext } from 'react';

export const TransitionContext = createContext(null);

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within a TransitionProvider');
  }
  return context;
}
