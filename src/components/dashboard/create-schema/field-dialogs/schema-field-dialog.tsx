import { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SchemaFieldDialogProps = {};

const SchemaFieldDialog: FC<SchemaFieldDialogProps> = ({}) => {
  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle className='text-oxford-blue dark:text-off-white'>
          Create field
        </DialogTitle>
        <DialogDescription>Design a field of schema</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Name
          </Label>
          <Input id='name' value='Pedro Duarte' className='col-span-3' />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='username' className='text-right'>
            Username
          </Label>
          <Input id='username' value='@peduarte' className='col-span-3' />
        </div>
      </div>
      <DialogFooter>
        <Button type='submit'>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default SchemaFieldDialog;