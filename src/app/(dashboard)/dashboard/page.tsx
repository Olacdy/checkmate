import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import FeaturedSchemas from '@/components/dashboard/featured-schemas';
import ValidationTabs from '@/components/dashboard/validation-tabs';

import { serverClient } from '@/trpc/server';

type PageProps = {};

const Page: FC<PageProps> = async ({}) => {
  const schemas = await serverClient.schema.getSchemas();

  return (
    <Card className='dashboard-section-container bg-slate-50 px-5 py-4 text-oxford-blue dark:bg-oxford-blue-dark dark:text-off-white'>
      <CardHeader>
        <CardTitle className='text-lg xs:text-3xl'>Overview</CardTitle>
        <CardDescription>Your schemas stats.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-5'>
        <ValidationTabs type='multiple' className='flex-1' schemas={schemas} />
        <FeaturedSchemas initialData={schemas} />
      </CardContent>
    </Card>
  );
};

export default Page;
