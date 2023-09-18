'use client';

import { FC, useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { Icons } from '@/components/icons';

import DeleteSchemaDialog from '@/components/dashboard/delete-schema-dialog';

type ReviewSchemaButtonsProps = {
  schemaId: string;
  handleDelete: () => void;
};

const ReviewSchemaButtons: FC<ReviewSchemaButtonsProps> = ({
  schemaId,
  handleDelete,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
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
  );
};

export default ReviewSchemaButtons;
