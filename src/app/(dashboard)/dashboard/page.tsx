'use client';

import { FC } from 'react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

type pageProps = {};

const featuredSchemas = [
  {
    id: '978a594f-592b-4403-95ce-95a630dc8ee1',
    name: 'Schema 1',
    date: '20 Aug. 23',
    validations: {
      successes: 100,
      errors: 10,
    },
    link: 'https://checkmate/api/978a594f-592b-4403-95ce-95a630dc8ee1',
  },
  {
    id: '0562cd58-53dd-4190-82df-dba2bf8d8bb9',
    name: 'Schema 2',
    date: '23 Aug. 23',
    validations: {
      successes: 30,
      errors: 3,
    },
    link: 'https://checkmate/api/0562cd58-53dd-4190-82df-dba2bf8d8bb9',
  },
  {
    id: '8d10b7b9-5300-4a0e-8133-0fa024d20bb4',
    name: 'Schema 3',
    date: '27 Aug. 23',
    validations: {
      successes: 20,
      errors: 1,
    },
    link: 'https://checkmate/api/8d10b7b9-5300-4a0e-8133-0fa024d20bb4',
  },
];

const page: FC<pageProps> = ({}) => {
  return (
    <div className='flex flex-1 flex-col justify-between px-5 py-4 text-off-white'>
      <div className='flex flex-col gap-5'>
        <span className='text-3xl'>Overview</span>
        <div className='flex w-full flex-col gap-3'>
          <Card className='w-full bg-transparent dark:border-slate-300/40 dark:bg-transparent'>
            <CardContent className='flex items-center justify-between p-3'>
              <span>Total validations:</span>
              <span className='flex items-center gap-2'>
                <span>350</span>
                <Icons.validation />
              </span>
            </CardContent>
          </Card>
          <Card className='w-full bg-transparent dark:border-slate-300/40 dark:bg-transparent'>
            <CardContent className='flex items-center justify-between p-3'>
              <span>Total successes:</span>
              <span className='flex items-center gap-3'>
                <span className='text-success'>200</span>
                <Icons.success className='h-5 w-5 stroke-success' />
              </span>
            </CardContent>
          </Card>
          <Card className='w-full bg-transparent dark:border-slate-300/40 dark:bg-transparent'>
            <CardContent className='flex items-center justify-between p-3'>
              <span>Total errors:</span>
              <span className='flex items-center gap-3'>
                <span className='text-error'>100</span>
                <Icons.error className='h-5 w-5 stroke-error' />
              </span>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='flex w-full flex-col gap-5'>
        <span className='text-2xl'>Featured schemas</span>
        <div className='grid grid-cols-3 gap-3'>
          {featuredSchemas.map((featuredSchema) => {
            const { successes, errors } = featuredSchema.validations;

            return (
              <Card
                key={featuredSchema.id}
                className='w-full bg-transparent dark:border-slate-300/40 dark:bg-transparent'>
                <CardContent className='relative flex h-24 justify-between p-3 pt-4'>
                  <div className='flex flex-col -space-y-1'>
                    <span className='text-xl'>{featuredSchema.name}</span>
                    <span className='text-sm text-slate-400/50'>
                      {featuredSchema.date}
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className='absolute right-2 top-2'
                      asChild>
                      <Button
                        className='dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0'
                        variant='ghost'
                        size='icon'>
                        <Icons.more />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-40'>
                      <DropdownMenuLabel>Schema actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='flex items-center justify-between'>
                        <span>Review</span>
                        <Icons.review className='h-4 w-4 dark:stroke-off-white' />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(featuredSchema.link);
                        }}
                        className='flex items-center justify-between'>
                        <span>Copy link</span>
                        <Icons.copy className='h-4 w-4 dark:stroke-off-white' />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='group flex items-center justify-between focus:bg-error/40 dark:focus:bg-error/40'>
                        <span className='text-error group-focus:text-off-white/80'>
                          Delete
                        </span>
                        <Icons.delete className='h-4 w-4 stroke-error group-focus:stroke-off-white/80' />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
                <Separator />
                <CardFooter className='flex h-16 w-full justify-around p-2'>
                  <span className='flex flex-1 items-center justify-center gap-2'>
                    <Icons.validation className='h-6 w-6' />
                    <span className='text-lg'>{successes + errors}</span>
                  </span>
                  <Separator orientation='vertical' />
                  <span className='flex flex-1 items-center justify-center gap-2'>
                    <Icons.success className='h-6 w-6 stroke-success' />
                    <span className='text-lg text-success'>{successes}</span>
                  </span>
                  <Separator orientation='vertical' />
                  <span className='flex flex-1 items-center justify-center gap-2'>
                    <Icons.error className='h-6 w-6 stroke-error' />
                    <span className='text-lg text-error'>{errors}</span>
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
