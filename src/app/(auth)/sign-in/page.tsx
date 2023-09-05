import AuthCard from '@/components/auth/auth-card';
import { FC } from 'react';

type pageProps = {};

const page: FC<pageProps> = ({}) => {
  return (
    <main className='mx-auto flex min-h-screen max-w-sm items-center font-body'>
      <AuthCard className='mx-5 w-full' />
    </main>
  );
};

export default page;
