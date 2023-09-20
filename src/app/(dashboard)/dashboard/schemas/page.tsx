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

import { serverClient } from '@/trpc/server';

import SchemasDataTable from '@/components/dashboard/schemas-datatable';

type pageProps = {};

const page: FC<pageProps> = async ({}) => {
  const schemas = await serverClient.schema.getSchemas();

  return (
    <Card className='dashboard-section-container bg-slate-50 px-5 py-4 text-oxford-blue dark:bg-oxford-blue-dark dark:text-off-white'>
      <CardHeader className='flex w-full flex-row items-center justify-between space-y-0'>
        <div className='flex flex-col gap-1'>
          <CardTitle className='text-3xl'>Schemas</CardTitle>
          <CardDescription>Manage your schemas.</CardDescription>
        </div>
        <Link href='/dashboard/create-schema'>
          <Button className='bg-oxford-blue/90 px-7 py-6 text-lg text-off-white'>
            Create schema
          </Button>
        </Link>
      </CardHeader>
      <CardContent className='flex flex-1'>
        <SchemasDataTable initialSchemas={schemas} />
      </CardContent>
    </Card>
  );
};

export default page;
