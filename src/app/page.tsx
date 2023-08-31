import { FC } from 'react';

import About from '@/components/landing/About';
import Hero from '@/components/landing/Hero';

type pageProps = {};

const page: FC<pageProps> = async ({}) => {
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-between pt-28 font-body'>
      <Hero />
      <About />
    </main>
  );
};

export default page;
