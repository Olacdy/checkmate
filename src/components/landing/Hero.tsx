import Link from 'next/link';
import { FC } from 'react';
import { Icons } from '../Icons';
import { Button } from '../ui/button';
import { Line } from '../ui/line';

type HeroProps = {};

const Hero: FC<HeroProps> = ({}) => {
  return (
    <section className='flex w-full flex-col items-center justify-start gap-32 pt-24'>
      <div className='flex flex-col items-center justify-start gap-10'>
        <div className='flex flex-col items-center justify-start gap-6'>
          <h1 className='main-header max-w-xl'>New way of data validation</h1>
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

      <div className='relative w-full'>
        <Line />
        <span className='absolute'>
          <Icons.document className='absolute -inset-y-[3.5rem] inset-x-5 fill-off-white' />
          <Icons.question className='absolute -inset-y-[5.3rem] inset-x-[5.5rem] h-12 w-12 fill-yellow-200' />
        </span>

        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Icons.gear className='absolute -inset-16 h-20 w-20 rotate-[20deg] fill-off-white' />
          <Icons.gear className='absolute -inset-5 h-20 w-20 fill-off-white' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
