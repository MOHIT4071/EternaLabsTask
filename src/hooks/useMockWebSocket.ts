import { useEffect } from 'react';
import { TokenPricePatch } from '../types/token';

export function useMockWebSocket(onPatch: (p: TokenPricePatch) => void) {
  useEffect(() => {
    const interval = setInterval(() => {
      const id = String(Math.floor(Math.random() * 3) + 1);
      const price = +(Math.random() * 20).toFixed(6);
      onPatch({ id, price });
    }, 900);
    return () => clearInterval(interval);
  }, [onPatch]);
}
