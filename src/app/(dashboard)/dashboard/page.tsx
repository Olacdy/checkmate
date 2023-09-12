import { FC } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import FeaturedSchemas from '@/components/dashboard/featured-schemas';
import { Icons } from '@/components/icons';

import { featuredSchemas } from '@/helpers/data';

type pageProps = {};

const page: FC<pageProps> = ({}) => {
  return (
    <Card className='dashboard-section-container bg-slate-50 px-5 py-4 text-oxford-blue dark:bg-oxford-blue-dark dark:text-off-white'>
      <CardHeader>
        <CardTitle className='text-lg xs:text-3xl'>Overview</CardTitle>
        <CardDescription>Your schemas stats.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-5'>
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
      </CardContent>
    </Card>
  );
};

export default page;
