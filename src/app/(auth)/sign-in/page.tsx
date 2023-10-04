'use client';

import { FC } from 'react';

import { useSearchParams } from 'next/navigation';

import { toast } from '@/components/ui/use-toast';

import AuthCard from '@/components/auth/auth-card';

import { errorsCodesAndMessages } from '@/helpers/auth-errors';

type PageProps = {};

const Page: FC<PageProps> = ({}) => {
  const searchParams = useSearchParams();

  const authError = searchParams.get('error');

  if (authError) {
    let errorMessage = 'Something went wrong.';

    try {
      errorMessage =
        errorsCodesAndMessages[authError as keyof typeof errorsCodesAndMessages]
          .message;
    } catch (error: any) {
      console.log(error);
    }

    toast({
      title: 'Error!',
      description: errorMessage,
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
