'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Line = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'relative shrink-0 bg-crayola-blue before:absolute after:absolute',
        orientation === 'horizontal'
          ? 'h-[3px] w-full before:-top-px before:left-0 before:h-[200%] before:w-1/6 before:bg-gradient-to-r before:from-slate-200 after:-top-px after:right-0 after:h-[200%] after:w-1/6 after:bg-gradient-to-l after:from-slate-200 dark:before:from-oxford-blue dark:after:from-oxford-blue'
          : 'h-full w-[3px] before:top-0 before:h-1/6 before:w-full before:bg-gradient-to-b before:from-slate-200 after:bottom-0 after:h-1/6 after:w-full after:bg-gradient-to-t after:from-slate-200 dark:before:from-oxford-blue dark:after:from-oxford-blue',
        className
      )}
      {...props}
    />
  )
);

Line.displayName = SeparatorPrimitive.Root.displayName;

export { Line };
