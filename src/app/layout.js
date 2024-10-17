"use client";
// Example in _app.js or layout.js
import '@/i18n'; // Ensure this is loaded first before any component is rendered

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { ThemeLanguageProvider } from '@/app/context/ThemeLanguageContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
      <SessionProvider>
        <ThemeLanguageProvider>
          {children}
        </ThemeLanguageProvider>
      </SessionProvider>
    </body>
  </html>
  );
}
