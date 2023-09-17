import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { serverClient } from '@/trpc/server';

type pageProps = {
  params: {
    id: string;
  };
};

const page: FC<pageProps> = async ({ params }) => {
  const serverSchema = await serverClient.schema.getSchemaById({
    id: params.id,
  });

  return (
    <Card className='dashboard-section-container bg-slate-50 px-5 py-4 dark:bg-oxford-blue-dark'>
      <CardHeader className='text-oxford-blue dark:text-off-white'>
        <CardTitle className='text-lg xs:text-3xl'>
          {serverSchema?.name}
        </CardTitle>
        <CardDescription>Review schema insight.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-5'></CardContent>
    </Card>
  );
};

export default page;
