'use client';

import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { numberFieldSchema } from '@/helpers/schemas';

type NumberFieldDialogProps = {
  handleFieldDialogOpenChange: (open: boolean) => void;
};

const NumberFieldDialog: FC<NumberFieldDialogProps> = ({
  handleFieldDialogOpenChange,
}) => {
  const form = useForm<z.infer<typeof numberFieldSchema>>({
    resolver: zodResolver(numberFieldSchema),
    defaultValues: {
      fieldName: '',
      isRequired: false,
      isInt: false,
      min: '',
      max: '',
    },
  });

  const onSubmit = (values: z.infer<typeof numberFieldSchema>) => {
    if (values.min && values.max && values.min >= values.max) {
      form.setError('min', {
        message: 'Should be less than max.',
      });
      form.setError('max', {
        message: 'Should be bigger than min.',
      });

      return;
    }

    console.log(values);

    handleFieldDialogOpenChange(false);
  };

  return (
    <DialogContent className='dark:bg-oxford-blue-dark sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle className='text-xl text-oxford-blue dark:text-off-white'>
          Create field
        </DialogTitle>
        <DialogDescription>
          Design a field of type number. Click create field when you are done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (_, e) => {
            e?.stopPropagation();
          })}
          className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='fieldName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field name</FormLabel>
                <FormControl>
                  <Input placeholder='Type field name...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex w-full gap-10'>
            <FormField
              control={form.control}
              name='isRequired'
              render={({ field }) => (
                <FormItem className='flex items-end gap-3'>
                  <FormLabel>Required</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isInt'
              render={({ field }) => (
                <FormItem className='flex items-end gap-3'>
                  <FormLabel>Int</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-full items-center justify-between gap-5'>
            <FormField
              control={form.control}
              name='min'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min value</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='max'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max value</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type='submit'
            className='mt-3 self-end bg-crayola-blue px-5 text-lg text-off-white hover:bg-crayola-blue/80 dark:bg-crayola-blue dark:text-off-white dark:hover:bg-crayola-blue/80'>
            Create field
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default NumberFieldDialog;
