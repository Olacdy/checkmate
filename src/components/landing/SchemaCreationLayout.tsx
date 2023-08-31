import { FC } from 'react';

import { Separator } from '@/components/ui/separator';

type SchemaCreationLayoutProps = {};

const SchemaCreationLayout: FC<SchemaCreationLayoutProps> = ({}) => {
  return (
    <div className='flex w-full flex-col items-center text-sm'>
      <div className='flex w-full items-center justify-between p-4'>
        <span className='w-36 rounded-md bg-off-white p-1 text-oxford-blue-dark'>
          Schema 1
        </span>
        <div className='flex items-center gap-2'>
          <span className='rounded-md bg-off-white p-1 px-2 text-oxford-blue-dark'>
            Cancel
          </span>
          <span className='rounded-md bg-crayola-blue p-1 px-2 text-off-white'>
            Save
          </span>
        </div>
      </div>

      <Separator
        orientation='horizontal'
        className='bg-slate-600/20 dark:bg-slate-600/20'
      />
      <div className='flex h-16 w-full items-center p-2'>
        <div className='flex flex-1 flex-col items-start justify-between text-off-white'>
          <span className='text-sm'>Total validations</span>
          <span className='text-lg'>231</span>
        </div>
        <Separator
          orientation='vertical'
          className='bg-slate-600/20 dark:bg-slate-600/20'
        />
        <div className='flex flex-1 flex-col items-start justify-between pl-2 text-off-white'>
          <span className='text-sm'>Total successes</span>
          <span className='text-lg text-success'>230</span>
        </div>
        <Separator
          orientation='vertical'
          className='bg-slate-600/20 dark:bg-slate-600/20'
        />
        <div className='flex flex-1 flex-col items-start justify-between pl-2 text-off-white'>
          <span className='text-sm'>Total fails</span>
          <span className='text-lg text-error'>1</span>
        </div>
      </div>
      <Separator
        orientation='horizontal'
        className='bg-slate-600/20 dark:bg-slate-600/20'
      />

      <div className='flex w-full flex-col items-start'></div>
    </div>
  );
};

export default SchemaCreationLayout;
