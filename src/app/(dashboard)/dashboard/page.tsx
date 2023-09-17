import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Icons } from '@/components/icons';

import FeaturedSchemas from '@/components/dashboard/featured-schemas';

import { serverClient } from '@/trpc/server';

import { getManySchemaStat } from '@/lib/utils';

type pageProps = {};

const page: FC<pageProps> = async ({}) => {
  const schemas = await serverClient.schema.getSchemas();

  const { validations, successes, errors } = getManySchemaStat(schemas);

  return (
    <Card className='dashboard-section-container bg-slate-50 px-5 py-4 text-oxford-blue dark:bg-oxford-blue-dark dark:text-off-white'>
      <CardHeader>
        <CardTitle className='text-lg xs:text-3xl'>Overview</CardTitle>
        <CardDescription>Your schemas stats.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-5'>
        <div className='flex w-full flex-col gap-3'>
          <Card className='w-full border-oxford-blue/10 bg-transparent dark:border-slate-600/30 dark:bg-transparent'>
            <CardContent className='flex items-center justify-between p-3'>
              <span>Total validations:</span>
              <span className='flex items-center gap-2'>
                <span>{validations}</span>
                <Icons.validation />
              </span>
            </CardContent>
          </Card>
          <Card className='w-full border-oxford-blue/10 bg-transparent dark:border-slate-600/30 dark:bg-transparent'>
            <CardContent className='flex items-center justify-between p-3'>
              <span>Total successes:</span>
              <span className='flex items-center gap-3'>
                <span className='text-green-600 dark:text-success'>
                  {successes}
                </span>
                <Icons.success className='h-5 w-5 stroke-green-600 dark:stroke-success' />
              </span>
            </CardContent>
          </Card>
          <Card className='w-full border-oxford-blue/10 bg-transparent dark:border-slate-600/30 dark:bg-transparent'>
            <CardContent className='flex items-center justify-between p-3'>
              <span>Total errors:</span>
              <span className='flex items-center gap-3'>
                <span className='text-red-600 dark:text-error'>{errors}</span>
                <Icons.error className='h-5 w-5 stroke-error' />
              </span>
            </CardContent>
          </Card>
        </div>

        <FeaturedSchemas initialSchemas={schemas} />
      </CardContent>
    </Card>
  );
};

export default page;
