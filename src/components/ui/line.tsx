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
      className={cn(
        'relative shrink-0 h-[3px] w-full bg-crayola-blue after:absolute after:w-1/6 after:h-full after:bg-gradient-to-l after:from-oxford-blue-dark after:right-0 before:absolute before:w-1/6 before:h-full before:bg-gradient-to-r before:from-oxford-blue-dark before:left-0',
        className
      )}
      {...props}
    />
  )
);

Line.displayName = SeparatorPrimitive.Root.displayName;

export { Line };
