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

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <main className='flex h-screen max-h-screen flex-col font-body xl:flex-row'>
      <Sidebar />
      <section className='flex flex-1 pt-2 xl:p-4 xl:pl-0 xl:pt-4'>
        {children}
      </section>
    </main>
  );
};

export default DashboardLayout;
