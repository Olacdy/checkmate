'use client';

import { FC } from 'react';

import { Reorder, useDragControls, useMotionValue } from 'framer-motion';

import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons';

import { useRaisedShadow } from '@/hooks/useRaisedShadow';
import { createdField } from '@/schemas/created-fields';

type FieldDraggableProps = {
  value: createdField;
};

const FieldDraggable: FC<FieldDraggableProps> = ({ value }) => {
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
        <Button
          className='hover:bg-slate-300/40 dark:hover:bg-slate-200 dark:hover:text-oxford-blue-dark'
          variant='ghost'
          size='icon'>
          <Icons.settings />
        </Button>
      </div>
    </Reorder.Item>
  );
};

export default FieldDraggable;
