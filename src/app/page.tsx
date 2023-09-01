import { FC } from 'react';

import About from '@/components/landing/About';
import Contact from '@/components/landing/Contact';
import Hero from '@/components/landing/Hero';
import Product from '@/components/landing/Product';

type pageProps = {};

const page: FC<pageProps> = async ({}) => {
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-between pt-28 font-body'>
      <Hero />
      <Product />
      <About />
      <Contact />
    </main>
  );
};

export default page;
