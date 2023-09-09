import { FC, ReactNode } from 'react';

import { getServerAuthSession } from '@/lib/nextauth';

import Sidebar from '@/components/dashboard/sidebar';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

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
    <main className='flex font-body'>
      <Sidebar />
      <section className='flex flex-1 p-4 pl-0'>
        <div className='flex flex-1 rounded-lg bg-slate-300 dark:bg-oxford-blue-dark'>
          {children}
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
