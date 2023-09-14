'use client';

import { FC, createElement, useState } from 'react';

import { Reorder } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { FieldDialogs } from '@/components/dashboard/create-schema/field-dialogs';

import { Icons } from '@/components/icons';

import { FieldType } from '@/schemas/fields-schemas';

type FieldDraggableProps = {
  value: FieldType;
  editSchemaField: (schemaField: FieldType) => boolean;
  removeSchemaFeild: (schemaField: FieldType) => boolean;
  updateSchemaFields: () => void;
};

const FieldDraggable: FC<FieldDraggableProps> = ({
  value,
  editSchemaField,
  removeSchemaFeild,
  updateSchemaFields,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDeleteClick = () => {
    removeSchemaFeild(value);
  };

  return (
    <Reorder.Item
      className='flex w-full items-center justify-between rounded-sm border border-oxford-blue/20 bg-slate-50 px-4 py-2 text-oxford-blue-dark dark:bg-off-white'
      value={value}
      onDragEnd={() => {
        updateSchemaFields();
      }}>
      <span>{value.name}</span>
      <div className='flex gap-4'>
        <Button
          onClick={handleDeleteClick}
          className='text-error hover:bg-slate-300/40 hover:text-error dark:hover:bg-slate-200 dark:hover:text-error'
          variant='ghost'
          size='icon'>
          <Icons.delete />
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className='hover:bg-slate-300/40 dark:hover:bg-slate-200 dark:hover:text-oxford-blue-dark'
              variant='ghost'
              size='icon'>
              <Icons.settings />
            </Button>
          </DialogTrigger>
          {createElement(FieldDialogs[value.type], {
            defaultValues: value,
            updateSchemaFields: editSchemaField,
            closeDialog: () => setOpen(false),
          })}
        </Dialog>
      </div>
    </Reorder.Item>
  );
};

export default FieldDraggable;
