import { FC } from 'react';

import Image from 'next/image';

import ProfileDropdown from '@/components/dashboard/sidebar/profile-dropdown';
import QuotaCounter from '@/components/dashboard/sidebar/quota-counter';
import SheetSidebar from '@/components/dashboard/sidebar/sheet-sidebar';
import SideButtons from '@/components/dashboard/sidebar/side-buttons';

import { serverClient } from '@/trpc/server';

import { getServerAuthSession } from '@/lib/nextauth';

type SidebarProps = {};

const Sidebar: FC<SidebarProps> = async ({}) => {
  const session = await getServerAuthSession();

  const schemasCount = await serverClient.schema.getSchemasCount();
  const quota = await serverClient.user.getQuota();

  return (
    <section className='flex w-full items-center xl:min-h-screen xl:max-w-xs xl:flex-col xl:pb-6'>
      <div className='hidden w-full items-center px-2 xl:flex'>
        <Image
          className='mr-3 dark:hidden'
          src='/logo.webp'
          alt='CheckMate Logo'
          width={280}
          height={150}
        />
        <Image
          className='mr-3 hidden dark:block'
          src='/logo-dark.webp'
          alt='Dark CheckMate Logo'
          width={280}
          height={150}
        />
      </div>
      <div className='flex w-full flex-1 items-center justify-between px-4 pt-3 xl:flex-col xl:px-5 xl:pt-10'>
        <SheetSidebar initialSchemas={schemasCount} initialQuota={quota} />
        <SideButtons className='hidden xl:flex' />
        <div className='flex flex-col gap-4 xl:w-full'>
          <QuotaCounter
            className='hidden xl:flex'
            initialSchemas={schemasCount}
            initialQuota={quota}
          />
          <ProfileDropdown
            name={session?.user.name!}
            email={session?.user.email!}
            image={session?.user.image!}
          />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
