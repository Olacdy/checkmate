'use client';

import { FC, HTMLAttributes } from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

import { trpc } from '@/trpc/client';
import { serverClient } from '@/trpc/server';

import { cn } from '@/lib/utils';

type QuotaCounterProps = {
  initialData: Awaited<
    ReturnType<(typeof serverClient)['schema']['getSchemasCount']>
  >;
  quota: number;
} & HTMLAttributes<HTMLDivElement>;

const QuotaCounter: FC<QuotaCounterProps> = ({
  initialData,
  quota,
  className,
  ...props
}) => {
  const getSchemasCount = trpc.schema.getSchemasCount.useQuery(undefined, {
    initialData: initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <Card className={cn('w-full flex-col', className)}>
      <CardHeader>
        <CardDescription className='text-center capitalize'>{`${getSchemasCount?.data} / ${quota} schemas created`}</CardDescription>
        <Progress value={Math.floor((getSchemasCount?.data / quota) * 100)} />
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='flex w-full items-center gap-1.5 bg-gradient-to-r from-crayola-blue/30 to-crayola-blue/80 py-6 font-headings text-off-white dark:bg-gradient-to-r dark:from-crayola-blue/70 dark:to-crayola-blue/90 dark:text-off-white'>
              <Icons.increase className='fill-off-white' />
              <span>Increase quota</span>
            </Button>
          </DialogTrigger>
          <DialogContent></DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default QuotaCounter;
