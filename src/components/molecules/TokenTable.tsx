'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchTokens } from '../../lib/api';
import TokenRow from './TokenRow';
import Skeleton from '../atoms/Skeleton';
import { useMockWebSocket } from '../../hooks/useMockWebSocket';
import type { Token } from '../../types/token';

export type SortKey = 'none' | 'symbol' | 'price' | 'change24h';
export type SortDir = 'asc' | 'desc';


type Props = {
  columnFilter?: 'all' | 'new' | 'final' | 'migrated';
  searchQuery?: string;
  tagFilter?: string | null;
  onOpen: (id: string) => void;
  sortKey?: SortKey;
  sortDir?: SortDir;
  onToggleSort?: (k: SortKey) => void;
};

export default function TokenTable({
  columnFilter = 'all',
  searchQuery = '',
  tagFilter = null,
  onOpen,
  sortKey = 'price',
  sortDir = 'desc',
  onToggleSort,
}: Props) {
  const [data, setData] = useState<Token[] | null>(null);
  const [loading, setLoading] = useState(true);

  // debounce search locally
  const [debouncedQ, setDebouncedQ] = useState(searchQuery);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(searchQuery), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchTokens()
      .then((tokens) => { if (!mounted) return; setData(tokens); setLoading(false); })
      .catch(() => { if (!mounted) return; setData([]); setLoading(false); });
    return () => { mounted = false; };
  }, []);

  useMockWebSocket((patch) => {
    setData((prev) => prev ? prev.map((t) => (t.id === patch.id ? { ...t, price: patch.price } : t)) : prev);
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((t) => {
      if (columnFilter !== 'all' && t.column !== columnFilter) return false;
      if (tagFilter && !t.tags?.includes(tagFilter)) return false;
      if (debouncedQ) {
        const q = debouncedQ.toLowerCase();
        return t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q);
      }
      return true;
    });
  }, [data, columnFilter, debouncedQ, tagFilter]);

 const sorted = useMemo(() => {
  const s = [...filtered];

  if (sortKey === 'none') {
    // natural JSON order — do NOT sort
    return s;
  }

  s.sort((a, b) => {
    let v = 0;

    if (sortKey === 'symbol') {
      v = a.symbol.localeCompare(b.symbol);
    } else if (sortKey === 'price') {
      v = (a.price || 0) - (b.price || 0);
    } else if (sortKey === 'change24h') {
      v = (a.change24h || 0) - (b.change24h || 0);
    }

    return sortDir === 'asc' ? v : -v;
  });

  return s;
}, [filtered, sortKey, sortDir]);


  const handleOpen = useCallback((id: string) => onOpen(id), [onOpen]);

  if (loading) {
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ height: 56 }}><Skeleton style={{ height: '100%' }} /></div>
        ))}
      </div>
    );
  }

  return (
    <div className="card">
      <div className="header" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 0.9fr 0.9fr' }}>
        <div style={{ fontWeight: 600 }}>Name</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }} onClick={() => onToggleSort?.('symbol')}>Pair {sortKey === 'symbol' ? (sortDir === 'desc' ? '↓' : '↑') : ''}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }} onClick={() => sortKey !== 'none' && onToggleSort?.('price')}>Price {sortKey === 'price' ? (sortDir === 'desc' ? '↓' : '↑') : ''}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }} onClick={() => onToggleSort?.('change24h')}>24h {sortKey === 'change24h' ? (sortDir === 'desc' ? '↓' : '↑') : ''}</div>
        <div style={{ textAlign: 'right' }}>Actions</div>
      </div>

      {sorted.map((token) => (
        <TokenRow key={token.id} token={token} onOpen={handleOpen} />
      ))}

      {sorted.length === 0 && <div style={{ padding: 16 }}>No tokens match your filters.</div>}
    </div>
  );
}
