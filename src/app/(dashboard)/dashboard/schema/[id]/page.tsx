import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import FieldsCard from '@/components/dashboard/schema/fields-card';
import { FieldType } from '@/schemas/fields-schemas';
import { serverClient } from '@/trpc/server';

type pageProps = {
  params: {
    id: string;
  };
};

const page: FC<pageProps> = async ({ params }) => {
  const schema = await serverClient.schema.getSchemaById({
    id: params.id,
  });

  return (
    <Card className='dashboard-section-container bg-slate-50 px-5 py-4 dark:bg-oxford-blue-dark'>
      <CardHeader className='text-oxford-blue dark:text-off-white'>
        <CardTitle className='text-lg xs:text-3xl'>Review</CardTitle>
        <CardDescription>Inspect schema&apos;s insight.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-5'>
        <FieldsCard
          type='readonly'
          schemaFields={schema?.schema as FieldType[]}
        />
      </CardContent>
    </Card>
  );
};

export default page;
