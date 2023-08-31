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
        'relative h-[3px] w-full shrink-0 bg-crayola-blue before:absolute before:left-0 before:h-full before:w-1/6 before:bg-gradient-to-r before:from-oxford-blue-dark after:absolute after:right-0 after:h-full after:w-1/6 after:bg-gradient-to-l after:from-oxford-blue-dark',
        className
      )}
      {...props}
    />
  )
);

Line.displayName = SeparatorPrimitive.Root.displayName;

export { Line };
