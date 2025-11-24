'use client';
import React from 'react';
import clsx from 'clsx';

export default function Tooltip({ children, tip }: { children: React.ReactNode; tip: React.ReactNode | string }) {
  return (
    <span className="tooltip-wrap" style={{ position: 'relative', display: 'inline-block' }}>
      <span className="tooltip-target">{children}</span>
      <span className="tooltip-bubble" role="tooltip" aria-hidden>{tip}</span>
    </span>
  );
}
