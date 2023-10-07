'use client';

import { FC, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import AuthCard from '@/components/auth/auth-card';

import { errorsCodesAndMessages } from '@/helpers/auth-errors';

type PageProps = {};

const Page: FC<PageProps> = ({}) => {
  const searchParams = useSearchParams();

  const authError = searchParams.get('error');

  useEffect(() => {
    if (authError) {
      let errorMessage = 'Something went wrong.';

      try {
        errorMessage =
          errorsCodesAndMessages[
            authError as keyof typeof errorsCodesAndMessages
          ].message;
      } catch (error: any) {
        console.log(error);
      }

      setTimeout(() => {
        toast.error(errorMessage);
      }, 0);
    }
  }, [authError]);

  return (
    <main className='mx-auto flex min-h-screen max-w-sm items-center font-body'>
      <AuthCard className='mx-5 w-full' />
    </main>
  );
};

export default Page;
