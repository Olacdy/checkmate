import type { Metadata } from 'next';
import { Courier_Prime, Inter, Questrial } from 'next/font/google';

import Providers from '@/components/Providers';
import { cn } from '@/lib/utils';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
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
          'bg-oxford-blue antialiased dark:bg-oxford-blue',
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
