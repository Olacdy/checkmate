'use client';

import { FC } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { getQueryKey } from '@trpc/react-query';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import MoreSchemasActions from '@/components/dashboard/more-schemas-actions';

import { Icons } from '@/components/icons';

import { trpc } from '@/trpc/client';

import { SchemaType } from '@/schemas/schema-route-schemas';

import { cn, formatDate, getBaseUrl, getOneSchemaStat } from '@/lib/utils';

type FeaturedSchemasProps = {
  initialData: SchemaType[];
};

const FeaturedSchemas: FC<FeaturedSchemasProps> = ({ initialData }) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const getSchemas = trpc.schema.getSchemas.useQuery(undefined, {
    initialData: initialData,
  });

  const deleteSchema = trpc.schema.deleteSchema.useMutation({
    onSettled: () => {
      getSchemas.refetch();
      queryClient.invalidateQueries(getQueryKey(trpc.schema.getSchemasCount));
    },
  });

  const handleReview = (schemaId: string) => {
    router.push(`/dashboard/schema/${schemaId}`);
  };

  const handleCopy = (schemaId: string) => {
    toast('Link copied to clipboard.');

    const baseUrl = getBaseUrl();

    console.log(baseUrl);

    navigator.clipboard.writeText(`${baseUrl}/api/v1/${schemaId}`);
  };

  const handleDelete = (schemaId: string) => {
    deleteSchema.mutate({ id: schemaId });

    toast.success('Schema successfully deleted.');
  };

  return (
    <div className='flex'>
      {getSchemas?.data?.length !== 0 ? (
        <div className='flex w-full flex-1 flex-col justify-end gap-5'>
          <span className='text-2xl'>Featured schemas</span>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3-featured-schemas'>
            {getSchemas?.data?.slice(0, 3).map((featuredSchema, index) => {
              const { id, name, createdAt } = featuredSchema;
              const { validations, successes, errors } =
                getOneSchemaStat(featuredSchema);

              return (
                <Card
                  key={id}
                  className={cn(
                    'w-full max-w-sm border-oxford-blue/10 bg-transparent transition hover:bg-slate-200/40 hover:shadow-lg dark:border-slate-600/30 dark:bg-transparent dark:hover:bg-slate-950/30',
                    {
                      'hidden sm:block': index === 1,
                      'hidden lg:block': index === 2,
                    }
                  )}>
                  <CardHeader className='relative space-y-0 p-4'>
                    <CardTitle className='font-heading text-xl'>
                      {name}
                    </CardTitle>
                    <CardDescription>{formatDate(createdAt)}</CardDescription>
                    <MoreSchemasActions
                      className='absolute right-2 top-2'
                      handleReview={() => handleReview(id)}
                      handleCopy={() => handleCopy(id)}
                      handleDelete={() => handleDelete(id)}
                    />
                  </CardHeader>
                  <Separator className='bg-oxford-blue/10 dark:bg-slate-600/30' />
                  <CardFooter className='flex h-16 w-full justify-around p-2'>
                    <span className='flex flex-1 items-center justify-center gap-2'>
                      <Icons.validation className='h-6 w-6' />
                      <span className='text-lg'>{validations}</span>
                    </span>
                    <Separator
                      className='bg-oxford-blue/10 dark:bg-slate-600/30'
                      orientation='vertical'
                    />
                    <span className='flex flex-1 items-center justify-center gap-2'>
                      <Icons.success className='h-6 w-6 stroke-green-600 dark:stroke-success' />
                      <span className='text-lg text-green-600 dark:text-success'>
                        {successes}
                      </span>
                    </span>
                    <Separator
                      className='bg-oxford-blue/10 dark:bg-slate-600/30'
                      orientation='vertical'
                    />
                    <span className='flex flex-1 items-center justify-center gap-2'>
                      <Icons.error className='h-6 w-6 stroke-error' />
                      <span className='text-lg text-error'>{errors}</span>
                    </span>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div className='flex w-full flex-1 flex-col items-center justify-center gap-4'>
          <span className='text-xl text-oxford-blue-dark dark:text-slate-300/70'>
            No schemas yet
          </span>
          <Link href='/dashboard/create-schema'>
            <Button className='px-7 py-6 text-lg'>Create schema</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FeaturedSchemas;
