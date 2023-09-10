'use client';

import { FC } from 'react';

import { signOut } from 'next-auth/react';

import { Icons } from '@/components/icons';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeSwitchDropdown } from '@/components/ui/theme-switch-dropdown';

import { useTheme } from '@/context/theme-context';

type ProfileDropdownProps = {
  name: string;
  email: string;
  image: string;
};

const ProfileDropdown: FC<ProfileDropdownProps> = ({ name, email, image }) => {
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center justify-between rounded-full p-px hover:bg-slate-500/30 focus-visible:ring-0 focus-visible:ring-offset-0 dark:hover:bg-slate-100/20 xl:w-full xl:rounded-md xl:p-2 xl:pl-3'>
        <div className='flex items-center gap-4'>
          <Avatar>
            <AvatarImage src={image} alt={`${name} profile picture`} />
            <AvatarFallback className='border-[1px] border-oxford-blue bg-off-white shadow-md dark:bg-off-white'>
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className='hidden text-lg font-semibold text-slate-800 dark:font-normal dark:text-off-white xl:block'>
            {name}
          </span>
        </div>
        <Icons.chevronUp className='hidden stroke-slate-800 dark:stroke-off-white xl:block' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64'>
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            toggleTheme();
          }}
          className='flex h-10 items-center justify-between hover:bg-slate-200'>
          <span className='font-semibold capitalize'>{`${theme} theme`}</span>
          <ThemeSwitchDropdown />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className='flex h-10 items-center justify-between hover:bg-slate-200'>
          <span className='font-semibold'>Logout</span>
          <Icons.logout className='h-5 w-5 stroke-oxford-blue/90 dark:stroke-off-white' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
