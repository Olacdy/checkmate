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
import { useToast } from '@/components/ui/use-toast';

import { Icons } from '@/components/icons';

type MoreSchemasActionsProps = {
  schemaId: string;
} & DropdownMenuTriggerProps;

const MoreSchemasActions: FC<MoreSchemasActionsProps> = ({
  schemaId,
  ...props
}) => {
  const { toast } = useToast();
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
        <DropdownMenuItem className='flex items-center justify-between'>
          <span>Review</span>
          <Icons.review className='h-4 w-4 stroke-slate-600 dark:stroke-off-white' />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            toast({
              variant: 'success',
              description: (
                <span className='font-body text-base'>
                  Link copied to clipboard.
                </span>
              ),
            });
            navigator.clipboard.writeText(`https://checkmate/api/${schemaId}`);
          }}
          className='flex items-center justify-between'>
          <span>Copy link</span>
          <Icons.copy className='h-4 w-4 stroke-slate-500/70 dark:stroke-off-white' />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='group flex items-center justify-between focus:bg-error/40 dark:focus:bg-error/40'>
          <span className='text-error'>Delete</span>
          <Icons.delete className='h-4 w-4 stroke-error' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreSchemasActions;
