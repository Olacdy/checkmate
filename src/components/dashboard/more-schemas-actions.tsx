'use client';

import { FC } from 'react';

import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Icons } from '@/components/icons';

type MoreSchemasActionsProps = {
  handleCopy: () => void;
  handleReview: () => void;
  handleDelete: () => void;
} & DropdownMenuTriggerProps;

const MoreSchemasActions: FC<MoreSchemasActionsProps> = ({
  handleReview,
  handleCopy,
  handleDelete,
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...props} asChild>
        <Button
          className='dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0'
          variant='ghost'
          size='icon'>
          <span className='sr-only'>More schemas actions</span>
          <Icons.more />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40'>
        <DropdownMenuLabel>Schema actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleReview}
          className='flex items-center justify-between'>
          <span>Review</span>
          <Icons.review className='h-4 w-4 stroke-slate-600 dark:stroke-off-white' />
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleCopy}
          className='flex items-center justify-between'>
          <span>Copy link</span>
          <Icons.copy className='h-4 w-4 stroke-slate-500/70 dark:stroke-off-white' />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleDelete}
          className='group flex items-center justify-between text-error focus:bg-error/40 focus:text-error dark:focus:bg-error/40 dark:focus:text-error'>
          <span>Delete</span>
          <Icons.delete className='h-4 w-4' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreSchemasActions;
