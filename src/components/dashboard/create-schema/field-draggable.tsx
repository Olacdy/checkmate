'use client';

import { FC, createElement, useState } from 'react';

import { Reorder, useDragControls, useMotionValue } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { useRaisedShadow } from '@/hooks/useRaisedShadow';

import { Icons } from '@/components/icons';

import { FieldDialogs } from '@/components/dashboard/create-schema/field-dialogs';

import { getPrimitiveNameFromZodType } from '@/lib/utils';

import { fieldTypes } from '@/helpers/data';

import { fieldType } from '@/schemas/fields-schemas';

type FieldDraggableProps = {
  schemaFields: fieldType[];
  setSchemaFields: (schemaFields: fieldType[]) => void;
  value: fieldType;
};

const FieldDraggable: FC<FieldDraggableProps> = ({
  schemaFields,
  setSchemaFields,
  value,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      className='flex w-full items-center justify-between rounded-sm border border-oxford-blue/20 bg-slate-50 px-4 py-2 text-oxford-blue-dark dark:bg-off-white'
      value={value.fieldName}
      id={value.fieldName}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}>
      <div className='flex items-center gap-4'>
        <Icons.drag
          className='cursor-grab'
          onPointerDown={(event) => dragControls.start(event)}
        />
        <span>{value.fieldName}</span>
      </div>
      <div className='flex gap-4'>
        <Button
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
          {createElement(
            FieldDialogs[
              getPrimitiveNameFromZodType(
                value.field
              ) as (typeof fieldTypes)[number]['type']
            ],
            {
              defaultValues: value,
              schemaFields: schemaFields,
              setSchemaFields: setSchemaFields,
              closeDialog: () => setOpen(false),
            }
          )}
        </Dialog>
      </div>
    </Reorder.Item>
  );
};

export default FieldDraggable;
