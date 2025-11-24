'use client';
import React, { useCallback, useState } from 'react';
import TokenTable, { SortKey, SortDir } from '../molecules/TokenTable';

export default function TokenDiscovery() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [columnView, setColumnView] = useState<'all' | 'new' | 'final' | 'migrated'>('all');

  // new UI state
  const [q, setQ] = useState('');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('price');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const open = useCallback((id: string) => { setOpenId(id); }, []);
  const close = useCallback(() => { setOpenId(null); }, []);

  const toggleSort = useCallback((key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    else { setSortKey(key); setSortDir('desc'); }
  }, [sortKey]);

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className={`btn ${columnView === 'all' ? 'active' : ''}`} onClick={() => setColumnView('all')}>All</button>
          <button className={`btn ${columnView === 'new' ? 'active' : ''}`} onClick={() => setColumnView('new')}>New</button>
          <button className={`btn ${columnView === 'final' ? 'active' : ''}`} onClick={() => setColumnView('final')}>Final</button>
          <button className={`btn ${columnView === 'migrated' ? 'active' : ''}`} onClick={() => setColumnView('migrated')}>Migrated</button>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            aria-label="Search tokens"
            placeholder="Search symbol or name..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: '1px solid #e6e9ef', minWidth: 220 }}
          />

          <select value={tagFilter ?? ''} onChange={(e) => setTagFilter(e.target.value || null)} style={{ padding: 8, borderRadius: 6 }}>
            <option value="">All tags</option>
            <option value="New">New</option>
            <option value="Final Stretch">Final Stretch</option>
            <option value="Migrated">Migrated</option>
          </select>
        </div>
      </div>
      <select
  value={sortKey}
  onChange={(e) => {
    const val = e.target.value as SortKey;
    setSortKey(val);
    if (val === 'none') {
      setSortDir('asc'); // direction irrelevant
    } else {
      setSortDir('asc');
    }
  }}
  style={{ padding: "8px", borderRadius: "6px" }}
>
  <option value="none">Sort Tokens...</option>
  <option value="symbol">Sort by Name</option>
  <option value="price">Sort by Price</option>
  <option value="change24h">Sort by 24h Change</option>
</select>

      <TokenTable
        columnFilter={columnView}
        searchQuery={q}
        tagFilter={tagFilter}
        onOpen={open}
        sortKey={sortKey}
        sortDir={sortDir}
        onToggleSort={toggleSort}
      />

      {openId && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Token details">
          <div className="modal">
            <h3 style={{ margin: 0 }}>Token details — {openId}</h3>
            <p style={{ marginTop: 12, color: 'var(--muted)' }}>More details could be loaded lazily from server.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button className="btn" onClick={close}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
