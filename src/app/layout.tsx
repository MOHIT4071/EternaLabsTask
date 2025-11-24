// src/app/layout.tsx  (server component)
import '../styles/globals.css';
import React from 'react';
import ClientProviders from '../components/ClientProviders';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
