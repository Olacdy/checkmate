'use client';

import AuthCard from '@/components/auth/auth-card';
import { toast } from '@/components/ui/use-toast';
import { errorsCodesAndMessages } from '@/helpers/auth-errors';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

type PageProps = {};

const Page: FC<PageProps> = ({}) => {
  const searchParams = useSearchParams();

  const error = searchParams.get('error');

  if (error) {
    toast({
      title: 'Error!',
      description:
        errorsCodesAndMessages[error as keyof typeof errorsCodesAndMessages]
          .message,
      variant: 'destructive',
    });
  }

  return (
    <main className='mx-auto flex min-h-screen max-w-sm items-center font-body'>
      <AuthCard className='mx-5 w-full' />
    </main>
  );
};

export default Page;
