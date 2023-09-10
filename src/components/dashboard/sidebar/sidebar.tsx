import { FC } from 'react';

import Image from 'next/image';

import ProfileDropdown from '@/components/dashboard/sidebar/profile-dropdown';
import SheetSideButtons from '@/components/dashboard/sidebar/sheet-side-buttons';
import SideButtons from '@/components/dashboard/sidebar/side-buttons';

import { getServerAuthSession } from '@/lib/nextauth';

type SidebarProps = {};

const Sidebar: FC<SidebarProps> = async ({}) => {
  const session = await getServerAuthSession();

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
        <SheetSideButtons />
        <SideButtons className='hidden xl:flex' />
        <ProfileDropdown
          name={session?.user.name!}
          email={session?.user.email!}
          image={session?.user.image!}
        />
      </div>
    </section>
  );
};

export default Sidebar;
