'use client';

import { FC, HTMLAttributes, useState } from 'react';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons';

import { cn } from '@/lib/utils';

type CopyContentProps = {
  content?: string;
  fallback?: string;
} & HTMLAttributes<HTMLDivElement>;

const CopyContent: FC<CopyContentProps> = ({
  content,
  fallback,
  className,
  ...props
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopying = (data: string) => {
    setIsCopied(true);
    navigator.clipboard.writeText(data);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: '-100%' },
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className='flex w-full items-center justify-between gap-3 rounded-md border-2 border-slate-400 bg-oxford-blue p-2 pl-3 dark:border-slate-700 dark:bg-oxford-blue-dark sm:pl-5 sm:pr-3'>
        <div className='code-container'>
          <span
            className={cn({
              code: content,
              'text-off-white': !content,
            })}>
            {content || fallback || ''}
          </span>
        </div>

        {content && (
          <Button
            onClick={() => handleCopying(content)}
            variant='ghost'
            className='relative w-10 hover:bg-slate-800'
            disabled={isCopied}>
            <motion.span
              initial={false}
              className='absolute'
              animate={isCopied ? 'open' : 'closed'}
              variants={variants}>
              <Icons.check className='h-7 w-7 stroke-crayola-blue' />
            </motion.span>
            <motion.span
              initial={false}
              className='absolute'
              animate={!isCopied ? 'open' : 'closed'}
              variants={variants}>
              <Icons.copy className='h-6 w-6 fill-off-white' />
            </motion.span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CopyContent;
