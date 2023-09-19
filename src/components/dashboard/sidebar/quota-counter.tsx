'use client';

import { FC, HTMLAttributes, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import QuotaDialog from '@/components/dashboard/sidebar/quota-dialog';

import { trpc } from '@/trpc/client';
import { serverClient } from '@/trpc/server';

import { cn } from '@/lib/utils';

type QuotaCounterProps = {
  initialSchemas: Awaited<
    ReturnType<(typeof serverClient)['schema']['getSchemasCount']>
  >;
  initialQuota: Awaited<ReturnType<(typeof serverClient)['user']['getQuota']>>;
} & HTMLAttributes<HTMLDivElement>;

const QuotaCounter: FC<QuotaCounterProps> = ({
  initialSchemas,
  initialQuota,
  className,
  ...props
}) => {
  const getSchemasCount = trpc.schema.getSchemasCount.useQuery(undefined, {
    initialData: initialSchemas,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const getQuota = trpc.user.getQuota.useQuery(undefined, {
    initialData: initialQuota,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Card className={cn('w-full flex-col', className)}>
      <CardHeader>
        <CardDescription className='text-center capitalize'>{`${getSchemasCount?.data} / ${getQuota?.data} schemas created`}</CardDescription>
        <Progress
          value={Math.floor((getSchemasCount?.data / getQuota?.data!) * 100)}
        />
      </CardHeader>
      <CardContent>
        <QuotaDialog open={open} onOpenChange={setOpen} />
      </CardContent>
    </Card>
  );
};

export default QuotaCounter;
