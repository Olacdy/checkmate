'use client';

import { FC, useEffect, useState } from 'react';

import Link from 'next/link';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Line } from '@/components/ui/line';

import { useSectionInView } from '@/hooks/useSectionInView';

import { calculateDocumentScale } from '@/lib/utils';

type HeroProps = {};

const Hero: FC<HeroProps> = ({}) => {
  const { ref } = useSectionInView('Hero');
  const [icon, setIcon] = useState<keyof typeof Icons>('question');

  useEffect(() => {
    const handleScrollEvent = () => {
      const htmlElement = document.documentElement;
      const percentOfScreenHeightScrolled = Math.min(
        (htmlElement.scrollTop / htmlElement.clientHeight) * 100,
        100
      );
      const documentScale = calculateDocumentScale(
        percentOfScreenHeightScrolled
      );

      if (percentOfScreenHeightScrolled > 25 && icon !== 'check') {
        setIcon('check');
      }

      htmlElement.style.setProperty('--document-scale', `${documentScale}`);
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });
    window.addEventListener('resize', handleScrollEvent, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('resize', handleScrollEvent);
    };
  }, [icon]);

  return (
    <section
      ref={ref}
      id='hero'
      className='hero-section flex w-full flex-col items-center justify-start gap-32 pt-24'>
      <div className='flex flex-col items-center justify-start gap-10'>
        <div className='flex flex-col items-center justify-start gap-6'>
          <h1 className='main-header max-w-xl'>
            New way of data <span className='wavy-underline'>validation</span>
          </h1>
          <p className='body-text max-w-sm text-center'>
            Introducing Checkly SchemaFlow: Simplify data schema design with an
            intuitive UI, and ensure data accuracy through dynamically generated
            validation links. Effortlessly collaborate, validate, and secure
            your data management process.
          </p>
        </div>

        <Link href='/sign-in'>
          <Button
            variant='ghost'
            className='border-[1px] border-alabaster px-8 text-lg text-alabaster hover:bg-alabaster hover:text-oxford-blue-dark dark:hover:bg-alabaster dark:hover:text-oxford-blue-dark'>
            Start for free
          </Button>
        </Link>
      </div>

      <div className='relative h-[28rem] md:hidden'>
        <Line orientation='vertical' />

        <span className='absolute -inset-x-14 inset-y-0'>
          <Icons.document className='absolute -inset-y-[3.5rem] inset-x-5 h-20 w-20 fill-off-white' />
          {icon === 'question' ? (
            <Icons.question className='absolute -inset-y-[5rem] inset-x-[5rem] h-10 w-10 fill-yellow-200' />
          ) : (
            <Icons.check className='absolute -inset-y-[5rem] inset-x-[5rem] h-10 w-10 stroke-success' />
          )}
        </span>

        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Icons.gear className='first-gear absolute -inset-16 h-20 w-20 fill-off-white' />
          <Icons.gear className='second-gear absolute -inset-5 h-20 w-20 fill-off-white' />
        </div>
      </div>

      <div className='relative hidden w-full md:block'>
        <Line />
        <span className='document-container'>
          <Icons.document className='absolute -inset-x-[0.75rem] -inset-y-[3.5rem] fill-off-white' />
          {icon === 'question' ? (
            <Icons.question className='absolute -inset-y-[5.3rem] inset-x-[3.5rem] h-12 w-12 fill-yellow-200' />
          ) : (
            <Icons.check className='absolute -inset-y-[5.3rem] inset-x-[3.5rem] h-12 w-12 stroke-success' />
          )}
        </span>

        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Icons.gear className='first-gear absolute -inset-16 h-20 w-20 fill-off-white' />
          <Icons.gear className='second-gear absolute -inset-5 h-20 w-20 fill-off-white' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
