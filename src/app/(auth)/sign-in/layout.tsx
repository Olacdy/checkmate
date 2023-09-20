import { FC, ReactNode } from 'react';

import { getServerAuthSession } from '@/lib/nextauth';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';

type AuthLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'CheckMate',
  description: 'Sign In to start using CheckMate',
};

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  const session = await getServerAuthSession();

  if (!!session) {
    redirect('/dashboard');
  }

  return <>{children}</>;
};

export default AuthLayout;
