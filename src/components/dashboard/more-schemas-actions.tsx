'use client';

import { FC, useState } from 'react';

import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Icons } from '@/components/icons';

import DeleteSchemaDialog from '@/components/dashboard/delete-schema-dialog';

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
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogTrigger asChild>
            <DropdownMenuItem className='group flex items-center justify-between text-error focus:bg-error/40 focus:text-error dark:focus:bg-error/40 dark:focus:text-error'>
              <span>Delete</span>
              <Icons.delete className='h-4 w-4' />
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteSchemaDialog
        handleDelete={handleDelete}
        closeDialog={() => setOpen(false)}
      />
    </Dialog>
  );
};

export default MoreSchemasActions;
