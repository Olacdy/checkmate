import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import FieldsCard from '@/components/dashboard/schema/fields-card';
import ReviewSchemaTabs from '@/components/dashboard/validation-tabs';

import { serverClient } from '@/trpc/server';

import { FieldType } from '@/schemas/fields-schemas';

type pageProps = {
  params: {
    id: string;
  };
};

const page: FC<pageProps> = async ({ params }) => {
  const schema = await serverClient.schema.getSchemaById({
    id: params.id,
  });

  if (!schema) return <div>No schema found!</div>;

  return (
    <Card className='dashboard-section-container bg-slate-50 px-5 py-4 dark:bg-oxford-blue-dark'>
      <CardHeader className='text-oxford-blue dark:text-off-white'>
        <CardTitle className='text-lg xs:text-3xl'>Review</CardTitle>
        <CardDescription>Inspect schema&apos;s insight.</CardDescription>
      </CardHeader>
      <CardContent className='grid flex-1 grid-cols-12 flex-col gap-5'>
        <FieldsCard
          className='col-span-5 gap-3'
          type='readonly'
          name={schema?.name!}
          schemaFields={schema?.fields as FieldType[]}
        />
        <ReviewSchemaTabs className='col-span-7' schemas={[schema]} />
      </CardContent>
    </Card>
  );
};

export default page;
