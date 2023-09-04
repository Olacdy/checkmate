import { FC, HTMLProps } from 'react';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/Icons';
import { Line } from '@/components/ui/line';

type JSONSnippetProps = {} & HTMLProps<HTMLDivElement>;

const JSONSnippet: FC<JSONSnippetProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('relative flex w-full flex-col items-center', className)}
      {...props}>
      <div className='w-full'>
        <div className='flex w-full flex-col items-start rounded-md border-2 border-slate-600/20 bg-oxford-blue p-8 dark:bg-oxford-blue-dark'>
          <span className='code'>{'{'}</span>
          <div className='flex flex-col pl-10'>
            <span className='code'>"firstName": "John"</span>
            <span className='code'>"lastName": "Doe"</span>
            <span className='code'>"age": 10</span>
            <span className='code'>"birthDate": "10-10-1990"</span>
          </div>
          <span className='code'>{'}'}</span>
        </div>
      </div>
      <Line
        orientation='vertical'
        className='absolute bottom-0 h-24 translate-y-full'>
        <span className='absolute bottom-0 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-success'>
          <Icons.check className='' />
        </span>
      </Line>
    </div>
  );
};

export default JSONSnippet;
