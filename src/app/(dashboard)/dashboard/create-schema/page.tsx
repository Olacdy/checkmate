import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import SchemaCreationForm from '@/components/dashboard/schema/schema-creation-form';

type pageProps = {};

const page: FC<pageProps> = ({}) => {
  return (
    <Card className='dashboard-section-container bg-slate-50 px-5 py-4 dark:bg-oxford-blue-dark'>
      <CardHeader className='text-oxford-blue dark:text-off-white'>
        <CardTitle className='text-lg xs:text-3xl'>Create schema</CardTitle>
        <CardDescription>Define your schema.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-5'>
        <SchemaCreationForm />
      </CardContent>
    </Card>
  );
};

export default page;
