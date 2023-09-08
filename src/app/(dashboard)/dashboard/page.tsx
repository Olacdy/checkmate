'use client';

import { FC } from 'react';

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';

type pageProps = {};

const page: FC<pageProps> = ({}) => {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/sign-in');
  }

  return (
    <div>
      <Button
        onClick={async () => {
          await signOut({ callbackUrl: '/' });
        }}>
        Sign Out
      </Button>
    </div>
  );
};

export default page;
