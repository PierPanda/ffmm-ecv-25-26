import type { Metadata } from 'next';
import { Atkinson_Hyperlegible } from 'next/font/google';
import localFont from 'next/font/local';
import ShaderBackground from '@/components/ShaderBackground';
import './globals.css';

const atkinson = Atkinson_Hyperlegible({
  variable: '--font-atkinson',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const tanker = localFont({
  src: '../../../public/Tanker-Regular.woff2',
  variable: '--font-tanker',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FFMM',
  description: '',
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${atkinson.variable} ${tanker.variable} min-h-full flex flex-col antialiased`}>
        <ShaderBackground />
        <div className="relative z-0 flex flex-col flex-1 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_textarea]:pointer-events-auto [&_select]:pointer-events-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
