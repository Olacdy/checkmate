import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import FeaturedSchemas from '@/components/dashboard/featured-schemas';
import ValidationsSocketWrapper from '@/components/dashboard/validations-socket-wrapper';

import { getServerAuthSession } from '@/lib/nextauth';

import { serverClient } from '@/trpc/server';

type PageProps = {};

const Page: FC<PageProps> = async ({}) => {
  const session = await getServerAuthSession();
  const schemas = await serverClient.schema.getSchemas();
  const initialValidations = await serverClient.validation.getValidations();

  return (
    <Card className='dashboard-section-container overflow-hidden bg-slate-50 px-5 py-4 text-oxford-blue dark:bg-oxford-blue-dark dark:text-off-white'>
      <CardHeader>
        <CardTitle className='text-lg xs:text-3xl'>Overview</CardTitle>
        <CardDescription>Your schemas stats.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-5'>
        <ValidationsSocketWrapper
          type='multiple'
          userId={session?.user.id!}
          initialValidations={initialValidations}
          className='h-0 flex-grow'
        />
        <FeaturedSchemas initialData={schemas} />
      </CardContent>
    </Card>
  );
};

export default Page;
