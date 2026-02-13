import { useRef, useCallback } from 'react';

export function useDoubleTap(onDoubleTap: () => void, delay: number = 300) {
  const lastTap = useRef<number>(0);

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < delay) {
      onDoubleTap();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  }, [onDoubleTap, delay]);

  return handleTap;
}
