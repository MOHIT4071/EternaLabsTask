'use client';
import React from 'react';
import { Token } from '../../types/token';
import { usePriceTransitions } from '../../hooks/usePriceTransitions';
import Tooltip from '../Tooltip';

export default function TokenRow({ token, onOpen }: { token: Token; onOpen: (id: string) => void }) {
  const { transitionClass } = usePriceTransitions(token.id, token.price);
  return (
    <div className={`row ${transitionClass ?? ''}`} role="row">
      <div className="token-symbol">
        <div className="avatar">{token.symbol[0]}</div>
        <div>
          <div style={{ fontWeight: 600 }}>{token.symbol}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{token.name}</div>
        </div>
      </div>

      <div>
        <Tooltip tip={`Pair: ${token.pair}\nMarketCap: ${token.marketCap ?? '—'}`}>
          <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>{token.pair}</span>
        </Tooltip>
      </div>

      <div>${token.price.toFixed(6)}</div>
      <div>{token.change24h}%</div>

      <div style={{ textAlign: 'right' }}>
        <button className="btn" onClick={() => onOpen(token.id)}>Details</button>
      </div>
    </div>
  );
}
