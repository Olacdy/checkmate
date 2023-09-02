'use client';

import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Icons } from '@/components/Icons';
import { ThemeSwitch } from '@/components/ThemeSwitch';

type HeaderSheetProps = {};

const HeaderSheet: FC<HeaderSheetProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Icons.menu className='h-8 w-8 fill-crayola-blue md:h-10 md:w-10' />
      </SheetTrigger>
      <SheetContent side='top' className='bg-off-white'>
        <div className='mx-auto flex max-w-md flex-col gap-5'>
          <div className='flex items-center justify-between'>
            <Image
              src='/logo-mobile.webp'
              alt='Mobile CheckMate Logo'
              width={80}
              height={30}
            />
            <SheetClose>
              <Icons.close className='h-10 w-10 stroke-crayola-blue' />
            </SheetClose>
          </div>
          <nav className='w-full'>
            <ul className='flex flex-col'>
              <li>
                <Link href='#product'>
                  <Button
                    variant='link'
                    className='nav-link text-lg dark:text-oxford-blue-dark'>
                    Product
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='#about'>
                  <Button
                    variant='link'
                    className='nav-link text-lg dark:text-oxford-blue-dark'>
                    About
                  </Button>
                </Link>
              </li>
              <li>
                <Link href='#contact'>
                  <Button
                    variant='link'
                    className='nav-link text-lg dark:text-oxford-blue-dark'>
                    Contact
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeSwitch />
          <div className='flex w-full flex-col gap-3'>
            <Link href='/sign-in'>
              <Button
                variant='ghost'
                className='w-full border-[1px] border-oxford-blue-dark py-6 text-lg text-oxford-blue-dark hover:bg-oxford-blue-dark hover:text-off-white dark:hover:bg-oxford-blue-dark dark:hover:text-off-white'>
                Start for free
              </Button>
            </Link>
            <Link href='/sign-in'>
              <Button className='w-full border-[1px] bg-oxford-blue-dark py-6 text-lg font-thin text-off-white hover:bg-oxford-blue-dark/80 dark:bg-oxford-blue-dark dark:text-off-white dark:hover:bg-oxford-blue-dark/80 dark:hover:text-off-white'>
                Login
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderSheet;
