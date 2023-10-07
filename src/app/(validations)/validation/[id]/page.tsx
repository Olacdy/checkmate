import { FC } from 'react';

import { serverClient } from '@/trpc/server';

type PageProps = {
  params: {
    id: string;
  };
};

const Page: FC<PageProps> = async ({ params }) => {
  const validation = await serverClient.validation.getValidationById({
    id: params.id,
  });

  if (!validation) return <p>No validation found</p>;

  return (
    <main className='flex h-screen max-h-screen items-center justify-center overflow-hidden'>
      <div className='flex max-h-[70%] w-full max-w-sm px-5 text-xs lg:max-w-xl lg:text-sm xl:max-w-2xl xl:text-base'>
        <pre className='w-full flex-1 overflow-auto rounded-md border-2 border-slate-400 bg-slate-300 p-8 text-oxford-blue-dark dark:border-slate-700 dark:bg-oxford-blue-dark'>
          {JSON.stringify(validation.input, null, 2)}
        </pre>
      </div>
    </main>
  );
};

export default Page;
