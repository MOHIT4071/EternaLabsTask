export type Token = {
  id: string;
  name: string;
  symbol: string;
  logo?: string;
  pair: string;
  price: number;
  change24h: number;
  marketCap?: number;
  tags: string[];
  column: 'new' | 'final' | 'migrated';
};

export type TokenPricePatch = { id: string; price: number };
