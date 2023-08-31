import type { Metadata } from 'next';
import { Inter, Questrial } from 'next/font/google';

import Providers from '@/components/Providers';
import { cn } from '@/lib/utils';

import Header from '@/components/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--headings-font' });
const quantico = Questrial({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--body-font',
});

export const metadata: Metadata = {
  title: 'CheckMate',
  description: 'Define schemas to validate your data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'bg-oxford-blue-dark antialiased dark:bg-oxford-blue-dark',
          inter.variable,
          quantico.variable
        )}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
