import { useEffect, useRef, useState } from 'react';

export function usePriceTransitions(id: string, price: number) {
  const prevRef = useRef<number | null>(null);
  const [cls, setCls] = useState<string | undefined>(undefined);

  useEffect(() => {
    const prev = prevRef.current;
    if (prev == null) { prevRef.current = price; return }
    if (price > prev) setCls('price-up');
    else if (price < prev) setCls('price-down');
    prevRef.current = price;
    if (cls) {
      const t = setTimeout(() => setCls(undefined), 700);
      return () => clearTimeout(t);
    }
  }, [price]);

  return { transitionClass: cls };
}
