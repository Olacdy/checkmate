'use client';

import { FC, HTMLProps, useState } from 'react';

import { motion } from 'framer-motion';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

type CopyLinkProps = {
  link: string;
} & HTMLProps<HTMLDivElement>;

const CopyLink: FC<CopyLinkProps> = ({ link, className, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopying = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(link);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: '-100%' },
  };

  return (
    <div className={cn('w-full max-w-md', className)} {...props}>
      <div className='flex w-full items-center justify-between rounded-md border-2 border-slate-600/20 bg-oxford-blue-dark p-2 pl-5 pr-3'>
        <span className='code'>{link}</span>
        <Button
          onClick={handleCopying}
          variant='ghost'
          className='relative w-10'
          disabled={isCopied}>
          <motion.span
            className='absolute'
            animate={isCopied ? 'open' : 'closed'}
            variants={variants}>
            <Icons.check className='h-6 w-6 stroke-off-white' />
          </motion.span>
          <motion.span
            className='absolute'
            animate={!isCopied ? 'open' : 'closed'}
            variants={variants}>
            <Icons.copy className='h-6 w-6 fill-off-white' />
          </motion.span>
        </Button>
      </div>
    </div>
  );
};

export default CopyLink;
