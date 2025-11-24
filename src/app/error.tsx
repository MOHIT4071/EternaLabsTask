'use client';
import React from 'react';

export default function Error({ error }: { error: Error }) {
  return (
    <div style={{padding:24}}>
      <h2 style={{fontSize:20, fontWeight:600}}>Something went wrong</h2>
      <pre style={{marginTop:12, fontSize:13}}>{String(error?.message)}</pre>
    </div>
  );
}
