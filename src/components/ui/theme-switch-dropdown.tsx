'use client';

import * as React from 'react';

import * as SwitchPrimitives from '@radix-ui/react-switch';

import { Icons } from '@/components/icons';

import { useTheme } from '@/context/theme-context';

import { cn } from '@/lib/utils';

const ThemeSwitchDropdown = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <SwitchPrimitives.Root
      checked={theme === 'dark'}
      onCheckedChange={toggleTheme}
      className={cn(
        'peer inline-flex h-[30px] w-[54px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-oxford-blue-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-oxford-blue-dark dark:bg-off-white',
        className
      )}
      {...props}
      ref={ref}>
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none flex h-6 w-6 items-center justify-center rounded-full bg-off-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.45rem] data-[state=unchecked]:translate-x-[0.15rem] dark:bg-slate-950'
        )}>
        {theme === 'dark' ? (
          <Icons.moon className='h-4 w-4 stroke-off-white' />
        ) : (
          <Icons.sun className='h-4 w-4 stroke-oxford-blue-dark' />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});

ThemeSwitchDropdown.displayName = 'ThemeSwitchDropdown';

export { ThemeSwitchDropdown };
