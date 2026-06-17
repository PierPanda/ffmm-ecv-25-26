import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ShaderBackground from '@/components/ShaderBackground';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FFMM',
  description: '',
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}>
        <ShaderBackground />
        <div className="relative z-0 flex flex-col flex-1 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_textarea]:pointer-events-auto [&_select]:pointer-events-auto">
        </div>
      </body>
    </html>
  );
}
