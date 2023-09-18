import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import SchemaForm from '@/components/dashboard/schema/schema-form';

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

  if (!schema) return <div>No schema found!</div>;

  return (
    <Card className='dashboard-section-container bg-slate-50 px-5 py-4 dark:bg-oxford-blue-dark'>
      <CardHeader className='text-oxford-blue dark:text-off-white'>
        <CardTitle className='text-lg xs:text-3xl'>
          Edit {schema.name}
        </CardTitle>
        <CardDescription>Make changes to schema.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-5'>
        <SchemaForm type='edit' schema={schema} />
      </CardContent>
    </Card>
  );
};

export default page;
