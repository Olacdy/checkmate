import { FC } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import FeaturedSchemas from '@/components/dashboard/featured-schemas';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { type Schema } from '@prisma/client';
import Link from 'next/link';

type pageProps = {};

const featuredSchemas = [
  {
    id: '978a594f-592b-4403-95ce-95a630dc8ee1',
    name: 'Schema 1',
    createdAt: new Date(2023, 8, 20),
    successes: 100,
    errors: 10,
  },
  {
    id: '0562cd58-53dd-4190-82df-dba2bf8d8bb9',
    name: 'Schema 2',
    createdAt: new Date(2023, 8, 23),
    successes: 30,
    errors: 3,
  },
  {
    id: '8d10b7b9-5300-4a0e-8133-0fa024d20bb4',
    name: 'Schema 3',
    createdAt: new Date(2023, 8, 27),
    successes: 20,
    errors: 1,
  },
] as Schema[];

const page: FC<pageProps> = ({}) => {
  return (
    <div className='flex flex-1 flex-col justify-between px-5 py-4 text-oxford-blue dark:text-off-white'>
      <div className='flex flex-col gap-5'>
        <span className='text-3xl'>Overview</span>
        <div className='flex w-full flex-col gap-3'>
          <Card className='w-full border-oxford-blue/30 bg-transparent dark:border-slate-300/40 dark:bg-transparent'>
            <CardContent className='flex items-center justify-between p-3'>
              <span>Total validations:</span>
              <span className='flex items-center gap-2'>
                <span>350</span>
                <Icons.validation />
              </span>
            </CardContent>
          </Card>
          <Card className='w-full border-oxford-blue/30 bg-transparent dark:border-slate-300/40 dark:bg-transparent'>
            <CardContent className='flex items-center justify-between p-3'>
              <span>Total successes:</span>
              <span className='flex items-center gap-3'>
                <span className='text-green-600 dark:text-success'>200</span>
                <Icons.success className='h-5 w-5 stroke-green-600 dark:stroke-success' />
              </span>
            </CardContent>
          </Card>
          <Card className='w-full border-oxford-blue/30 bg-transparent dark:border-slate-300/40 dark:bg-transparent'>
            <CardContent className='flex items-center justify-between p-3'>
              <span>Total errors:</span>
              <span className='flex items-center gap-3'>
                <span className='text-red-600 dark:text-error'>100</span>
                <Icons.error className='h-5 w-5 stroke-error' />
              </span>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='flex flex-1'>
        {featuredSchemas.length !== 0 ? (
          <div className='flex w-full flex-1 flex-col justify-end gap-5'>
            <span className='text-2xl'>Featured schemas</span>
            <FeaturedSchemas featuresSchemas={featuredSchemas} />
          </div>
        ) : (
          <div className='flex w-full flex-1 flex-col items-center justify-center gap-4'>
            <span className='text-xl text-slate-300/70'>No schemas yet</span>
            <Link href='/dashboard/create-schema'>
              <Button className='px-7 py-6 text-lg'>Create schema</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
