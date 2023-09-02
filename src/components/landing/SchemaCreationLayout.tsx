import { FC, HTMLProps } from 'react';

import { Separator } from '@/components/ui/separator';

import { Icons } from '@/components/Icons';

import { cn } from '@/lib/utils';

type SchemaCreationLayoutProps = {} & HTMLProps<HTMLDivElement>;

const SchemaCreationLayout: FC<SchemaCreationLayoutProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center rounded-b-md text-xs sm:text-sm',
        className
      )}
      {...props}>
      <div className='flex w-full items-center justify-between p-4'>
        <span className='w-24 rounded-md bg-off-white p-1 text-oxford-blue-dark sm:w-36'>
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
      <div className='flex h-16 w-full items-center p-1 sm:p-2'>
        <div className='flex flex-1 flex-col items-start justify-between text-off-white'>
          <span>Total validations</span>
          <span className='text-base sm:text-lg'>231</span>
        </div>
        <Separator
          orientation='vertical'
          className='bg-slate-600/20 dark:bg-slate-600/20'
        />
        <div className='flex flex-1 flex-col items-start justify-between pl-2 text-off-white'>
          <span>Total successes</span>
          <span className='text-base text-success sm:text-lg'>230</span>
        </div>
        <Separator
          orientation='vertical'
          className='bg-slate-600/20 dark:bg-slate-600/20'
        />
        <div className='flex flex-1 flex-col items-start justify-between pl-2 text-off-white'>
          <span>Total fails</span>
          <span className='text-base text-error sm:text-lg'>1</span>
        </div>
      </div>
      <Separator
        orientation='horizontal'
        className='bg-slate-600/20 dark:bg-slate-600/20'
      />

      <div className='flex w-full flex-col items-start pt-5'>
        <h3 className='pl-5 text-off-white'>Fields</h3>
        <div className='w-full px-2 pb-2'>
          <div className='flex h-40 w-full flex-col items-center justify-between rounded-md border-[1px] border-slate-600/20 p-2 sm:h-44'>
            <div className='flex w-full flex-col gap-1'>
              {['Field 1', 'Field 2', 'Field 3'].map((fieldName) => (
                <FieldSchemaLayout
                  key={fieldName.toLowerCase().replace(' ', '-')}
                  name={fieldName}
                />
              ))}
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-success underline'>Add a new field</span>{' '}
              <Icons.add className='h-4 w-4 -scale-x-100 stroke-success' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaCreationLayout;

type FieldSchemaLayoutProps = {
  name: string;
};

const FieldSchemaLayout: FC<FieldSchemaLayoutProps> = ({ name }) => {
  return (
    <div className='w-full rounded-md border-[1px] border-slate-600/20'>
      <div className='flex items-center justify-between p-2 px-2 sm:px-3'>
        <div className='flex items-center gap-1'>
          <Icons.drag className='h-4 w-4 stroke-off-white' />
          <span className='text-xs text-off-white'>{name}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Icons.delete className='h-4 w-4 stroke-error' />
          <Icons.settings className='h-4 w-4 stroke-off-white' />
        </div>
      </div>
    </div>
  );
};
