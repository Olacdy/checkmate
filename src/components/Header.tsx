'use client';

import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { ThemeSwitch } from '@/components/ui/theme-switch';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Icons } from '@/components/icons';

import { useActiveSectionContext } from '@/context/active-section-context';
import { sections } from '@/helpers/data';
import { cn } from '@/lib/utils';

type HeaderProps = {};

const Header: FC<HeaderProps> = ({}) => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header className='relative z-50'>
      <nav className='fixed inset-x-0 mx-auto mt-4 w-[90%] max-w-sm rounded-full bg-off-white px-4 py-2 font-body shadow-lg dark:shadow-none sm:max-w-sm sm:py-2 md:max-w-lg md:py-0 lg:max-w-3xl lg:px-6 2xl:max-w-5xl'>
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
            <ul className='flex items-center justify-center gap-4 2xl:gap-10 2xl:pt-1'>
              {sections.slice(1).map((section) => {
                return (
                  <li className='relative' key={section.id}>
                    <Link
                      className={cn(
                        'flex w-full items-center justify-center px-3 py-2 text-sm font-semibold text-oxford-blue-dark transition 2xl:px-5 2xl:text-base',
                        {
                          'font-normal text-off-white':
                            activeSection === section.title,
                          'hover:underline hover:decoration-oxford-blue-dark hover:underline-offset-2':
                            activeSection !== section.title,
                        }
                      )}
                      href={`#${section.id}`}
                      onClick={() => {
                        setActiveSection(section.title);
                        setTimeOfLastClick(Date.now());
                      }}>
                      {section.title}

                      {section.title === activeSection && (
                        <motion.span
                          className='absolute inset-0 -z-10 rounded-full bg-crayola-blue'
                          layoutId='activeSection'
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
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

type HeaderSheetProps = {};

const HeaderSheet: FC<HeaderSheetProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Icons.menu className='h-8 w-8 fill-crayola-blue' />
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
              {sections.slice(1).map((section) => {
                return (
                  <li key={`${section.id}-mobile`}>
                    <SheetClose asChild>
                      <Link href={`#${section.id}`}>
                        <Button
                          variant='link'
                          className='nav-link text-lg dark:text-oxford-blue-dark'>
                          {section.title}
                        </Button>
                      </Link>
                    </SheetClose>
                  </li>
                );
              })}
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

export default Header;
