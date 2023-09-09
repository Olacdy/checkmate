'use client';

import { FC } from 'react';

import { Icons } from '@/components/icons';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/lib/utils';
import { type Schema } from '@prisma/client';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useToast } from '../ui/use-toast';

type FeaturedSchemasProps = {
  featuresSchemas: Schema[];
};

const FeaturedSchemas: FC<FeaturedSchemasProps> = ({ featuresSchemas }) => {
  const { toast } = useToast();

  return (
    <div className='grid grid-cols-3 gap-3'>
      {featuresSchemas.map((featuredSchema) => {
        return (
          <Card
            key={featuredSchema.id}
            className='w-full border-oxford-blue/30 bg-transparent dark:border-slate-300/40 dark:bg-transparent'>
            <CardContent className='relative flex h-24 justify-between p-3 pt-4'>
              <div className='flex flex-col -space-y-1'>
                <span className='text-xl'>{featuredSchema.name}</span>
                <span className='text-sm text-slate-600 dark:text-slate-400/50'>
                  {formatDate(featuredSchema.createdAt)}
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className='absolute right-2 top-2' asChild>
                  <Button
                    className='dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0'
                    variant='ghost'
                    size='icon'>
                    <Icons.more />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-40'>
                  <DropdownMenuLabel>Schema actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='flex items-center justify-between'>
                    <span>Review</span>
                    <Icons.review className='h-4 w-4 stroke-slate-600 dark:stroke-off-white' />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      toast({
                        variant: 'success',
                        description: (
                          <span className='font-body text-base'>
                            Link copied to clipboard.
                          </span>
                        ),
                      });
                      navigator.clipboard.writeText(
                        `https://checkmate/api/${featuredSchema.id}`
                      );
                    }}
                    className='flex items-center justify-between'>
                    <span>Copy link</span>
                    <Icons.copy className='h-4 w-4 stroke-slate-500/70 dark:stroke-off-white' />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='group flex items-center justify-between focus:bg-error/40 dark:focus:bg-error/40'>
                    <span className='text-error'>Delete</span>
                    <Icons.delete className='h-4 w-4 stroke-error' />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
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
