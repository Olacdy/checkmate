import { FC, ReactNode } from 'react';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import Sidebar from '@/components/dashboard/sidebar/sidebar';

import { getServerAuthSession } from '@/lib/nextauth';

type DashboardLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'CheckMate',
  description: 'CheckMate dashboard',
};

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  const session = await getServerAuthSession();

  if (!!!session) {
    redirect('/sign-in');
  }

  return (
    <main className='flex flex-col font-body md:flex-row'>
      <Sidebar />
      <section className='flex max-h-screen flex-1 p-4 pl-0'>
        {children}
      </section>
    </main>
  );
};

export default DashboardLayout;
