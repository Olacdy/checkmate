import { FC } from 'react';

import { redirect } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import FieldsCard from '@/components/dashboard/schema/fields-card';
import ReviewSchemaButtons from '@/components/dashboard/schema/review-schema-buttons';
import ValidationTabs from '@/components/dashboard/validation-tabs';

import { serverClient } from '@/trpc/server';

import { FieldType } from '@/schemas/fields-schemas';

type PageProps = {
  params: {
    id: string;
  };
};

const Page: FC<PageProps> = async ({ params }) => {
  const schema = await serverClient.schema.getSchemaById({
    id: params.id,
  });

  if (!schema) return <div>No schema found!</div>;

  const handleDelete = async () => {
    'use server';

    await serverClient.schema.deleteSchema({ id: params.id });

    redirect('/dashboard/schemas');
  };

  return (
    <Card className='dashboard-section-container bg-slate-50 px-5 py-4 dark:bg-oxford-blue-dark'>
      <CardHeader className='flex-row items-center justify-between space-y-0 text-oxford-blue dark:text-off-white'>
        <div className='flex flex-col gap-1.5'>
          <CardTitle className='text-lg xs:text-3xl'>Review</CardTitle>
          <CardDescription>Inspect schema&apos;s insight.</CardDescription>
        </div>
        <ReviewSchemaButtons schemaId={schema.id} handleDelete={handleDelete} />
      </CardHeader>
      <CardContent className='grid flex-1 grid-cols-12 flex-col gap-5'>
        <FieldsCard
          className='col-span-5 gap-3'
          type='readonly'
          name={schema?.name!}
          schemaFields={schema?.fields as FieldType[]}
        />
        <ValidationTabs className='col-span-7' type='single' schema={schema} />
      </CardContent>
    </Card>
  );
};

export default Page;
