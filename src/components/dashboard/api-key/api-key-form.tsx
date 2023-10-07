'use client';

import { FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import CopyContent from '@/components/ui/copy-link';

import { trpc } from '@/trpc/client';

import { cn } from '@/lib/utils';
import { serverClient } from '@/trpc/server';

type ApiKeyFormProps = {
  initialData: Awaited<ReturnType<typeof serverClient.apiKey.getCurrentApiKey>>;
};

const ApiKeyForm: FC<ApiKeyFormProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCurrentApiKey = trpc.apiKey.getCurrentApiKey.useQuery(undefined, {
    initialData: initialData,
  });

  const createApiKey = trpc.apiKey.createApiKey.useMutation({
    onSettled: () => {
      getCurrentApiKey.refetch();
    },
  });

  const revokeApiKey = trpc.apiKey.revokeCurrentApiKey.useMutation();

  const handleGenerateApiKey = async () => {
    setIsLoading(true);

    if (getCurrentApiKey.data) {
      await revokeApiKey.mutateAsync();
    }

    await createApiKey.mutateAsync();

    setIsLoading(false);
  };

  return (
    <div className='flex flex-col items-center gap-3 md:flex-row'>
      <CopyContent
        className='w-fit truncate'
        content={getCurrentApiKey?.data?.key}
        fallback='Currently you have no API key. Try to generate one first.'
      />
      <Button
        disabled={isLoading}
        className={cn('bg-crayola-blue px-7 py-6 text-base', {
          'pl-2 pr-9': isLoading,
        })}
        onClick={handleGenerateApiKey}>
        <div className='relative'>
          {getCurrentApiKey.data ? 'Regenerate API key' : 'Generate API key'}
          {isLoading && (
            <span
              className='absolute -right-7 top-px h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
              role='status'
            />
          )}
        </div>
      </Button>
    </div>
  );
};

export default ApiKeyForm;
