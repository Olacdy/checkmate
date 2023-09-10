'use client';

import { FC } from 'react';

import Image from 'next/image';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

import SideButtons from '@/components/dashboard/sidebar/side-buttons';

import { Icons } from '@/components/icons';

type SheetSideButtonsProps = {};

const SheetSideButtons: FC<SheetSideButtonsProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger className='flex items-center rounded-md p-2 hover:bg-slate-500/30 dark:hover:bg-slate-100/20 xl:hidden'>
        <Icons.menu className='h-5 w-5 fill-slate-500 dark:fill-off-white' />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='flex flex-col gap-6 bg-slate-200 dark:border-oxford-blue-dark dark:bg-oxford-blue'>
        <SheetHeader>
          <div className='flex w-full'>
            <Image
              className='mr-3 dark:hidden'
              src='/logo.webp'
              alt='CheckMate Logo'
              width={280}
              height={150}
            />
            <Image
              className='mr-3  hidden dark:block'
              src='/logo-dark.webp'
              alt='Dark CheckMate Logo'
              width={280}
              height={150}
            />
          </div>
        </SheetHeader>
        <SideButtons />
      </SheetContent>
    </Sheet>
  );
};

export default SheetSideButtons;
