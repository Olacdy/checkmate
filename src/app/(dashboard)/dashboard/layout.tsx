import { FC, ReactNode } from 'react';

import { getServerAuthSession } from '@/lib/nextauth';

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

  return <main>{children}</main>;
};

export default DashboardLayout;
