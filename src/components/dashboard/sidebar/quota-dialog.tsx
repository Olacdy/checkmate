'use client';

import { ChangeEvent, FC, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getQueryKey } from '@trpc/react-query';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { DialogProps } from '@radix-ui/react-dialog';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { trpc } from '@/trpc/client';

import { quotaIncreaseSchema } from '@/schemas/forms-schemas';

import { quotaPrice } from '@/helpers/data';

type QuotaDialogProps = DialogProps;

const QuotaDialog: FC<QuotaDialogProps> = ({ ...props }) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const increaseQuota = trpc.user.increaseQuota.useMutation({
    onSettled: () => {
      queryClient.invalidateQueries(getQueryKey(trpc.user.getQuota));
    },
  });

  const [increaseBy, setIncreaseBy] = useState<number | ''>(10);

  const onOpenChange = (open: boolean) => {
    props.onOpenChange!(open);
    form.reset();
    setIncreaseBy(10);
  };

  // Initializing form
  const form = useForm<z.infer<typeof quotaIncreaseSchema>>({
    resolver: zodResolver(quotaIncreaseSchema),
    defaultValues: {
      increaseBy: increaseBy,
    },
  });

  const handleIncreaseByChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsedIncreaseBy = parseInt(e.target.value);
    const newIncreaseBy =
      isNaN(parsedIncreaseBy) || parsedIncreaseBy < 0 ? '' : parsedIncreaseBy;

    setIncreaseBy(newIncreaseBy);
    form.setValue('increaseBy', newIncreaseBy);
  };

  // Handle submittion
  const onSubmit = async (values: z.infer<typeof quotaIncreaseSchema>) => {
    onOpenChange(false);

    increaseQuota.mutate({ increaseBy: values.increaseBy as number });

    toast({
      title: `Your quota increased by ${values.increaseBy}`,
      variant: 'success',
    });
  };

  return (
    <Dialog {...props} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='flex w-full items-center gap-1.5 bg-gradient-to-r from-crayola-blue/30 to-crayola-blue/80 py-6 font-headings text-off-white dark:bg-gradient-to-r dark:from-crayola-blue/70 dark:to-crayola-blue/90 dark:text-off-white'>
          <Icons.increase className='fill-off-white' />
          <span>Increase quota</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm gap-6 xs:max-w-md'>
        <div className='flex flex-col items-center gap-12'>
          <DialogHeader>
            <DialogTitle className='text-center text-3xl capitalize text-oxford-blue dark:text-off-white'>
              Increase quota
            </DialogTitle>
          </DialogHeader>
          <div className='flex items-center justify-center gap-2 text-center font-headings text-xl text-oxford-blue dark:text-off-white'>
            <span className='underline underline-offset-2'>Current price:</span>
            <span className='text-3xl font-semibold text-crayola-blue drop-shadow-md dark:drop-shadow-md-dark'>
              {increaseBy === '' ? 0 : increaseBy * quotaPrice}&#36;
            </span>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col space-y-16'>
            <div className='flex w-full justify-center'>
              <FormField
                control={form.control}
                name='increaseBy'
                render={({ field }) => (
                  <FormItem className='relative w-full max-w-xs'>
                    <FormControl>
                      <Input
                        min={0}
                        type='number'
                        className='text-lg text-oxford-blue-dark dark:text-oxford-blue-dark'
                        placeholder='Increase by...'
                        {...field}
                        value={increaseBy}
                        onChange={handleIncreaseByChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Specify the desired quota increase amount.
                    </FormDescription>
                    <FormMessage className='absolute -bottom-7 left-0' />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type='submit'
              className='flex w-full items-center gap-1.5 bg-gradient-to-r from-crayola-blue/30 to-crayola-blue/80 py-6 font-headings text-off-white dark:bg-gradient-to-r dark:from-crayola-blue/70 dark:to-crayola-blue/90 dark:text-off-white'>
              <Icons.increase className='fill-off-white' />
              <span>Purchase quota</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default QuotaDialog;
