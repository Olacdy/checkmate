'use client';

import { FC, createElement, useState } from 'react';

import { Reorder } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { Icons } from '@/components/icons';

import { fields } from '@/helpers/data';
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

  const fieldType = fields.find((field) => field.type === value.type)!;
  const dialogToOpen = fieldType.dialog;

  const Icon = Icons[fieldType.icon];

  const handleDeleteClick = () => {
    removeSchemaFeild(value);
  };

  return (
    <Reorder.Item
      className='flex w-full items-center justify-between rounded-md border border-oxford-blue/20 bg-slate-50 px-4 py-2 text-oxford-blue-dark shadow-md dark:bg-off-white'
      value={value}
      onDragEnd={() => {
        updateSchemaFields();
      }}>
      <div className='flex items-center gap-3'>
        <Icon className='h-5 w-5' />
        <span className='font-headings font-medium text-oxford-blue'>
          {value.name}
        </span>
      </div>
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
          {dialogToOpen &&
            createElement(dialogToOpen, {
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
