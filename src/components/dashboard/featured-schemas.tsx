'use client';

import { FC } from 'react';

import { type Schema } from '@prisma/client';

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

import { formatDate } from '@/lib/utils';

type FeaturedSchemasProps = {
  featuresSchemas: Schema[];
};

const FeaturedSchemas: FC<FeaturedSchemasProps> = ({ featuresSchemas }) => {
  return (
    <div className='lg:grid-cols-3-featured-schemas grid grid-cols-1 gap-5 sm:grid-cols-2'>
      {featuresSchemas.map((featuredSchema) => {
        return (
          <Card
            key={featuredSchema.id}
            className='w-full max-w-sm border-oxford-blue/30 bg-transparent dark:border-slate-300/40 dark:bg-transparent'>
            <CardHeader className='relative space-y-0 p-4'>
              <CardTitle className='font-heading text-xl'>
                {featuredSchema.name}
              </CardTitle>
              <CardDescription>
                {formatDate(featuredSchema.createdAt)}
              </CardDescription>
              <MoreSchemasActions
                className='absolute right-2 top-2'
                schemaId={featuredSchema.id}
              />
            </CardHeader>
            <Separator className='bg-oxford-blue/30 dark:bg-slate-300/40' />
            <CardFooter className='flex h-16 w-full justify-around p-2'>
              <span className='flex flex-1 items-center justify-center gap-2'>
                <Icons.validation className='h-6 w-6' />
                <span className='text-lg'>
                  {featuredSchema.successes + featuredSchema.errors}
                </span>
              </span>
              <Separator
                className='bg-oxford-blue/30 dark:bg-slate-300/40'
                orientation='vertical'
              />
              <span className='flex flex-1 items-center justify-center gap-2'>
                <Icons.success className='h-6 w-6 stroke-green-600 dark:stroke-success' />
                <span className='text-lg text-green-600 dark:text-success'>
                  {featuredSchema.successes}
                </span>
              </span>
              <Separator
                className='bg-oxford-blue/30 dark:bg-slate-300/40'
                orientation='vertical'
              />
              <span className='flex flex-1 items-center justify-center gap-2'>
                <Icons.error className='h-6 w-6 stroke-error' />
                <span className='text-lg text-error'>
                  {featuredSchema.errors}
                </span>
              </span>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default FeaturedSchemas;
