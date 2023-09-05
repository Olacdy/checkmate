import type { Metadata } from 'next';
import { Courier_Prime, Inter, Questrial } from 'next/font/google';

import Providers from '@/components/providers';
import { cn } from '@/lib/utils';

import Footer from '@/components/footer';
import Header from '@/components/header';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--headings-font' });

const quantico = Questrial({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--body-font',
});

const courier = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--code-font',
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
          'bg-slate-200 antialiased dark:bg-oxford-blue',
          inter.variable,
          quantico.variable,
          courier.variable
        )}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
