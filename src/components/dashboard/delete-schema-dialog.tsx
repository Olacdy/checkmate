'use client';

import { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type DeleteSchemaDialogProps = {
  type?: 'single' | 'multiple';
  handleDelete: () => void;
  closeDialog: () => void;
};

const DeleteSchemaDialog: FC<DeleteSchemaDialogProps> = ({
  type = 'single',
  handleDelete,
  closeDialog,
}) => {
  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle className='text-xl text-oxford-blue dark:text-off-white'>
          {`Delete schema${type === 'multiple' ? 's' : ''}`}
        </DialogTitle>
        <DialogDescription>
          {`Are you sure you want to delete ${
            type === 'multiple' ? 'these' : 'this'
          } schema${type === 'multiple' ? 's' : ''}?`}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          onClick={() => {
            handleDelete();
            closeDialog();
          }}
          variant='destructive'>
          Delete
        </Button>
        <Button onClick={closeDialog}>Cancel</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteSchemaDialog;
