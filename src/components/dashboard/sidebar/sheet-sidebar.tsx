'use client';

import { FC } from 'react';

import Image from 'next/image';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Icons } from '@/components/icons';

import QuotaCounter from '@/components/dashboard/sidebar/quota-counter';
import SideButtons from '@/components/dashboard/sidebar/side-buttons';

import { serverClient } from '@/trpc/server';

type SheetSidebarProps = {
  initialSchemas: Awaited<
    ReturnType<(typeof serverClient)['schema']['getSchemasCount']>
  >;
  initialQuota: Awaited<ReturnType<(typeof serverClient)['user']['getQuota']>>;
};

const SheetSidebar: FC<SheetSidebarProps> = ({
  initialSchemas,
  initialQuota,
}) => {
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
        <div className='flex flex-1 flex-col items-center justify-between'>
          <SideButtons />
          <QuotaCounter
            initialSchemas={initialSchemas}
            initialQuota={initialQuota}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetSidebar;
