import type { Metadata } from 'next';
import { Inter, Quantico } from 'next/font/google';

import Providers from '@/components/Providers';
import { cn } from '@/lib/utils';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const quantico = Quantico({ subsets: ['latin'], weight: ['400', '700'] });

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
      <body className={cn(inter.className, quantico.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
