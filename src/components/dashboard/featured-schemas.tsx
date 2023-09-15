'use client';

import { FC } from 'react';

import Link from 'next/link';

import { type Schema } from '@prisma/client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

import MoreSchemasActions from '@/components/dashboard/more-schemas-actions';

import { Icons } from '@/components/icons';

import { api } from '@/trpc/client';

import { formatDate } from '@/lib/utils';

type FeaturedSchemasProps = {
  initialSchemas: Schema[];
};

const FeaturedSchemas: FC<FeaturedSchemasProps> = async ({
  initialSchemas,
}) => {
  const { toast } = useToast();

  const schemas = await api.schema.getSchemas.query();

  const deleteSchema = api.schema.deleteSchema;

  const handleCopy = (schemaId: string) => {
    toast({
      variant: 'success',
      description: (
        <span className='font-body text-base'>Link copied to clipboard.</span>
      ),
    });
    navigator.clipboard.writeText(`https://checkmate/api/${schemaId}`);
  };

  const handleDelete = (schemaId: string) => {
    deleteSchema.mutate({ id: schemaId });
  };

  return (
    <div className='flex flex-1'>
      {schemas.length !== 0 ? (
        <div className='flex w-full flex-1 flex-col justify-end gap-5'>
          <span className='text-2xl'>Featured schemas</span>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3-featured-schemas'>
            {schemas.slice(0, 3).map((featuredSchema) => {
              const { id, name, createdAt, successes, errors } = featuredSchema;

              return (
                <Card
                  key={id}
                  className='w-full max-w-sm border-oxford-blue/30 bg-transparent dark:border-slate-300/40 dark:bg-transparent'>
                  <CardHeader className='relative space-y-0 p-4'>
                    <CardTitle className='font-heading text-xl'>
                      {name}
                    </CardTitle>
                    <CardDescription>{formatDate(createdAt)}</CardDescription>
                    <MoreSchemasActions
                      className='absolute right-2 top-2'
                      handleCopy={() => handleCopy(id)}
                      handleDelete={() => handleDelete(id)}
                    />
                  </CardHeader>
                  <Separator className='bg-oxford-blue/30 dark:bg-slate-300/40' />
                  <CardFooter className='flex h-16 w-full justify-around p-2'>
                    <span className='flex flex-1 items-center justify-center gap-2'>
                      <Icons.validation className='h-6 w-6' />
                      <span className='text-lg'>{successes + errors}</span>
                    </span>
                    <Separator
                      className='bg-oxford-blue/30 dark:bg-slate-300/40'
                      orientation='vertical'
                    />
                    <span className='flex flex-1 items-center justify-center gap-2'>
                      <Icons.success className='h-6 w-6 stroke-green-600 dark:stroke-success' />
                      <span className='text-lg text-green-600 dark:text-success'>
                        {successes}
                      </span>
                    </span>
                    <Separator
                      className='bg-oxford-blue/30 dark:bg-slate-300/40'
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
