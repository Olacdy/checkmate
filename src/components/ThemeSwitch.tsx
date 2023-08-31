'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

import { useTheme } from '@/context/theme-context';
import { cn } from '@/lib/utils';
import { Icons } from './Icons';

const ThemeSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <SwitchPrimitives.Root
      checked={theme === 'dark'}
      onCheckedChange={toggleTheme}
      className={cn(
        'peer inline-flex h-[40px] w-[72px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 bg-oxford-blue-dark dark:bg-transparent dark:border-oxford-blue-dark',
        className
      )}
      {...props}
      ref={ref}>
      <SwitchPrimitives.Thumb
        className={cn(
          'flex items-center justify-center pointer-events-none h-8 w-8 rounded-full bg-off-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-1 dark:bg-slate-950'
        )}>
        {theme === 'dark' ? (
          <Icons.moon className='stroke-off-white' />
        ) : (
          <Icons.sun className='stroke-oxford-blue-dark' />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});

ThemeSwitch.displayName = 'ThemeSwitch';

export { ThemeSwitch };
