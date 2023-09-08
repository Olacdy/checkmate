import { FC } from 'react';

import Image from 'next/image';

import ProfileDropdown from '@/components/dashboard/profile-dropdown';
import SideButtons from '@/components/dashboard/side-buttons';

import { getServerAuthSession } from '@/lib/nextauth';

type SidebarProps = {};

const Sidebar: FC<SidebarProps> = async ({}) => {
  const session = await getServerAuthSession();

  return (
    <section className='flex min-h-screen w-full max-w-xs flex-col items-center pb-6'>
      <div className='flex w-full items-center justify-center'>
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
      <div className='flex w-full flex-1 flex-col items-center justify-between px-5 pt-10'>
        <SideButtons />
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
