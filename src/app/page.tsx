'use client';

import { FC, useEffect } from 'react';

import About from '@/components/landing/About';
import Contact from '@/components/landing/Contact';
import Hero from '@/components/landing/Hero';
import Product from '@/components/landing/Product';

type pageProps = {};

const page: FC<pageProps> = async ({}) => {
  useEffect(() => {
    const handleScrollEvent = () => {
      const htmlElement = document.documentElement;
      const percentOfScreenHeightScrolled = Math.min(
        (htmlElement.scrollTop / htmlElement.clientHeight) * 100,
        100
      );
      htmlElement.style.setProperty(
        '--scroll',
        `${percentOfScreenHeightScrolled}`
      );
    };

    window.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('resize', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('resize', handleScrollEvent);
    };
  }, []);

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-between px-10 font-body sm:max-w-2xl md:max-w-3xl md:px-0 md:pt-28 lg:max-w-5xl'>
      <Hero />
      <Product />
      <About />
      <Contact />
    </main>
  );
};

export default page;
