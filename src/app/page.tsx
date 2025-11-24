import React from 'react';
import TokenDiscovery from '../components/organisms/TokenDiscovery';

export default function Page() {
  return (
    <main className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-6xl">
        <h1 style={{fontSize:24, marginBottom:12}}>Tokens Directory</h1>
        <TokenDiscovery />
      </div>
    </main>
  );
}
