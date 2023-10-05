'use client';

import { FC, useState } from 'react';

import { Reorder } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import FieldDialog from '@/components/dashboard/schema/field-dialogs';

import { Icons } from '@/components/icons';

import { FieldType } from '@/schemas/fields-schemas';

import { fields } from '@/helpers/data';
import { FieldActionResultType } from '@/helpers/field-creation-errors';

type BaseFieldProps = {
  value: FieldType;
};

type ReadonlyFieldProps = {
  type: 'readonly';
};

type DraggableFieldProps = {
  type: 'draggable';
  editSchemaField: (schemaField: FieldType) => FieldActionResultType;
  removeSchemaFeild: () => FieldActionResultType;
  updateSchemaFields: () => void;
};

type FieldProps = BaseFieldProps & (ReadonlyFieldProps | DraggableFieldProps);

const Field: FC<FieldProps> = (props) => {
  const { value } = props;

  if (props.type === 'readonly') return <ReadonlyField value={value} />;

  if (props.type === 'draggable')
    return (
      <DraggableField
        value={value}
        updateSchemaFields={props.updateSchemaFields}
        editSchemaField={props.editSchemaField}
        removeSchemaFeild={props.removeSchemaFeild}
      />
    );
};

export default Field;

const ReadonlyField: FC<BaseFieldProps & Omit<ReadonlyFieldProps, 'type'>> = ({
  value,
}) => {
  const Icon = Icons[fields.find((field) => field.type === value.type)?.icon!];

  return (
    <div className='flex w-full items-center justify-between rounded-md border border-oxford-blue/20 bg-slate-50 px-4 py-3 text-oxford-blue-dark shadow-md dark:bg-off-white'>
      <div className='flex items-center gap-3'>
        <Icon className='h-5 w-5' />
        <span className='font-headings font-medium text-oxford-blue'>
          {value.name}
        </span>
      </div>
    </div>
  );
};

const DraggableField: FC<
  BaseFieldProps & Omit<DraggableFieldProps, 'type'>
> = ({ value, updateSchemaFields, editSchemaField, removeSchemaFeild }) => {
  const openedDialog = fields.find((field) => field.type === value.type);

  const Icon = Icons[openedDialog?.icon!];

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Reorder.Item
      className='flex w-full items-center justify-between rounded-md border border-oxford-blue/20 bg-slate-50 px-4 py-2 text-oxford-blue-dark shadow-md dark:bg-off-white'
      value={value}
      onDragEnd={updateSchemaFields}>
      <div className='flex items-center gap-3'>
        <Icon className='h-5 w-5' />
        <span className='font-headings font-medium text-oxford-blue'>
          {value.name}
        </span>
      </div>
      <div className='flex gap-4'>
        <Button
          onClick={removeSchemaFeild}
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
          {openedDialog && (
            // @ts-ignore
            <FieldDialog
              fieldType={openedDialog.type}
              defaultValues={value}
              updateSchemaFields={editSchemaField}
              closeDialog={() => setOpen(false)}
            />
          )}
        </Dialog>
      </div>
    </Reorder.Item>
  );
};
