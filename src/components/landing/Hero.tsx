import Link from 'next/link';
import { FC } from 'react';
import { Icons } from '../Icons';
import { Button } from '../ui/button';
import { Line } from '../ui/line';

type HeroProps = {};

const Hero: FC<HeroProps> = ({}) => {
  return (
    <section className='w-full flex flex-col items-center justify-start pt-24 gap-32'>
      <div className='flex flex-col items-center justify-start gap-10'>
        <div className='flex flex-col items-center justify-start gap-6'>
          <h1 className='main-header max-w-xl'>New way of data validation</h1>
          <p className='body-text max-w-sm'>
            Introducing Checkly SchemaFlow: Simplify data schema design with an
            intuitive UI, and ensure data accuracy through dynamically generated
            validation links. Effortlessly collaborate, validate, and secure
            your data management process.
          </p>
        </div>

        <Link href='/sign-in'>
          <Button
            variant='ghost'
            className='border-[1px] border-alabaster text-lg px-8 text-alabaster hover:text-oxford-blue-dark hover:bg-alabaster dark:hover:text-oxford-blue-dark dark:hover:bg-alabaster'>
            Start for free
          </Button>
        </Link>
      </div>

      <div className='relative w-full'>
        <Line />
        <span className='absolute'>
          <Icons.document className='absolute inset-x-5 -inset-y-[3.5rem] fill-off-white' />
          <Icons.question className='absolute w-12 h-12 inset-x-[5.5rem] -inset-y-[5.3rem] fill-yellow-200' />
        </span>

        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Icons.gear className='absolute -inset-16 rotate-[20deg] w-20 h-20 fill-off-white' />
          <Icons.gear className='absolute -inset-5 w-20 h-20 fill-off-white' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
