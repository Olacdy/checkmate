'use client';

import { FC, useState } from 'react';

import Link from 'next/link';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { Icons } from '@/components/icons';

import DeleteSchemaDialog from '@/components/dashboard/delete-schema-dialog';

import { getBaseUrl } from '@/lib/utils';

type ReviewSchemaButtonsProps = {
  schemaId: string;
  handleDelete: () => void;
};

const ReviewSchemaButtons: FC<ReviewSchemaButtonsProps> = ({
  schemaId,
  handleDelete,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleCopy = (schemaId: string) => {
    toast('Link copied to a clipboard.');

    const baseUrl = getBaseUrl();

    navigator.clipboard.writeText(`${baseUrl}/api/v1/${schemaId}`);
  };

  return (
    <div className='flex items-center gap-5'>
      <Button
        variant='link'
        className='items-center gap-2'
        onClick={() => handleCopy(schemaId)}>
        <span>Copy link</span>
        <Icons.copy className='h-4 w-4 stroke-slate-500/70 dark:stroke-off-white' />
      </Button>
      <div className='flex items-center gap-3'>
        <Link href={`/dashboard/schema/${schemaId}/edit`}>
          <Button className='flex items-center gap-1.5'>
            <Icons.edit className='h-4 w-4' />
            <span>Edit</span>
          </Button>
        </Link>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='destructive' className='flex items-center gap-1.5'>
              <Icons.delete className='h-4 w-4' />
              <span>Delete</span>
            </Button>
          </DialogTrigger>
          <DeleteSchemaDialog
            handleDelete={handleDelete}
            closeDialog={() => setOpen(false)}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default ReviewSchemaButtons;
