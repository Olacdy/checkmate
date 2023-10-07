import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ApiKeyForm from '@/components/dashboard/api-key/api-key-form';

import { serverClient } from '@/trpc/server';

type PageProps = {};

const Page: FC<PageProps> = async ({}) => {
  const activeApiKey = await serverClient.apiKey.getCurrentApiKey();

  return (
    <Card className='dashboard-section-container overflow-hidden bg-slate-50 px-5 py-4 text-oxford-blue dark:bg-oxford-blue-dark dark:text-off-white'>
      <CardHeader>
        <CardTitle className='text-lg xs:text-3xl'>API key</CardTitle>
        <CardDescription>Manage your API keys.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 items-center justify-center'>
        <ApiKeyForm initialData={activeApiKey} />
      </CardContent>
    </Card>
  );
};

export default Page;
