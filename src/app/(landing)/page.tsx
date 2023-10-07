import { FC } from 'react';

import About from '@/components/landing/about';
import Contact from '@/components/landing/contact';
import Hero from '@/components/landing/hero';
import Product from '@/components/landing/product';

type PageProps = {};

const Page: FC<PageProps> = async ({}) => {
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-between px-10 font-body sm:max-w-2xl md:max-w-3xl md:px-0 md:pt-28 lg:max-w-5xl'>
      <Hero />
      <Product />
      <About />
      <Contact />
    </main>
  );
};

export default Page;
