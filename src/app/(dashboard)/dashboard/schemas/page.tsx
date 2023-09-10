import { FC } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { SchemasDataTable } from '@/components/dashboard/schemas-datatable';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type pageProps = {};

const page: FC<pageProps> = ({}) => {
  return (
    <Card className='dashboard-section-container bg-slate-50 px-5 py-4 text-oxford-blue dark:bg-oxford-blue-dark dark:text-off-white'>
      <CardHeader className='flex w-full flex-row items-center justify-between space-y-0'>
        <span className='dashboard-section-header'>Schemas</span>
        <Link href='/dashboard/create-schema'>
          <Button className='px-7 py-6 text-lg'>Create schema</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <SchemasDataTable />
      </CardContent>
    </Card>
  );
};

export default page;
