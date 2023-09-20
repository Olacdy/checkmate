'use client';

import { FC, HTMLAttributes } from 'react';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';

import { sideBarButtons } from '@/helpers/data';

type SideButtonsProps = {} & HTMLAttributes<HTMLUListElement>;

const SideButtons: FC<SideButtonsProps> = ({ className, ...props }) => {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        'flex w-full flex-1 flex-col items-center gap-3',
        className
      )}
      {...props}>
      {sideBarButtons.map((button) => {
        const Icon = Icons[button.icon];

        return (
          <li className='w-full' key={button.name}>
            <Link
              className={cn('w-full', {
                'pointer-events-none': pathname === button.path,
              })}
              href={button.path}>
              <Button
                disabled={pathname === button.path}
                variant={pathname === button.path ? 'default' : 'ghost'}
                className={cn(
                  'flex w-full items-center justify-start gap-4 py-7 disabled:opacity-100',
                  {
                    'bg-oxford-blue/90 dark:bg-off-white':
                      pathname === button.path,
                    'hover:bg-slate-50 dark:hover:bg-slate-200/30':
                      pathname !== button.path,
                  }
                )}>
                <Icon
                  className={cn(
                    'h-7 w-7 fill-transparent stroke-oxford-blue/70 dark:stroke-off-white',
                    {
                      'stroke-off-white dark:stroke-oxford-blue/70':
                        pathname === button.path,
                    }
                  )}
                />
                <span
                  className={cn(
                    'text-lg font-semibold text-oxford-blue/70 dark:font-normal dark:text-off-white',
                    {
                      'font-normal text-off-white dark:font-semibold dark:text-oxford-blue/90':
                        pathname === button.path,
                    }
                  )}>
                  {button.text}
                </span>
              </Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SideButtons;
