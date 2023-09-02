'use client';

import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import HeaderSheet from '@/components/HeaderSheet';
import { ThemeSwitch } from '@/components/ThemeSwitch';

import { Button } from '@/components/ui/button';

type HeaderProps = {};

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className='fixed inset-x-0 z-50'>
      <nav className='mx-auto mt-4 w-full max-w-sm rounded-full bg-off-white px-4 py-2 font-body sm:max-w-sm sm:py-2 md:max-w-lg md:py-0 lg:max-w-3xl lg:px-6 2xl:max-w-5xl'>
        <ul className='flex items-center justify-between'>
          <li className='flex-1'>
            <Link href='/'>
              <Image
                className='hidden md:block'
                src='/logo.webp'
                alt='CheckMate Logo'
                width={280}
                height={100}
              />
              <Image
                className='md:hidden'
                src='/logo-mobile.webp'
                alt='Mobile CheckMate Logo'
                width={80}
                height={30}
              />
            </Link>
          </li>
          <li className='hidden flex-1 lg:block'>
            <ul className='flex items-center justify-center gap-5 pt-1 2xl:gap-10'>
              <li>
                <Link href='#product'>
                  <Button
                    variant='link'
                    className='nav-link dark:text-oxford-blue-dark 2xl:text-lg'>
                    Product
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='#about'>
                  <Button
                    variant='link'
                    className='nav-link dark:text-oxford-blue-dark 2xl:text-lg'>
                    About
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='#contact'>
                  <Button
                    variant='link'
                    className='nav-link dark:text-oxford-blue-dark 2xl:text-lg'>
                    Contact
                  </Button>
                </Link>
              </li>
            </ul>
          </li>
          <li className='hidden flex-1 items-center justify-end gap-7 lg:flex'>
            <Link href='/sign-in'>
              <Button className='bg-crayola-blue text-sm text-off-white hover:bg-crayola-blue/70 dark:bg-crayola-blue dark:text-off-white dark:hover:bg-crayola-blue/70 2xl:text-lg'>
                Start for free
              </Button>
            </Link>
            <ThemeSwitch />
          </li>
          <li className='mt-1 pr-2 sm:pr-4 md:pr-6 lg:hidden'>
            <HeaderSheet />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
