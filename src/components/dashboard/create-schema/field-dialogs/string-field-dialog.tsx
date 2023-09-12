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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import { stringFieldSchema } from '@/helpers/schemas';

type StringFieldDialogProps = {
  handleFieldDialogOpenChange: (open: boolean) => void;
};

const StringFieldDialog: FC<StringFieldDialogProps> = ({
  handleFieldDialogOpenChange,
}) => {
  const form = useForm<z.infer<typeof stringFieldSchema>>({
    resolver: zodResolver(stringFieldSchema),
    defaultValues: {
      fieldName: '',
      isRequired: false,
      isEmail: false,
      minLength: '',
      maxLength: '',
      regex: '',
    },
  });

  const onSubmit = (values: z.infer<typeof stringFieldSchema>) => {
    if (
      values.minLength &&
      values.maxLength &&
      values.minLength >= values.maxLength
    ) {
      form.setError('minLength', {
        message: 'Should be less than max length.',
      });
      form.setError('maxLength', {
        message: 'Should be bigger than min length.',
      });
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
          Design a field of type string. Click create field when you are done.
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
                  <Input
                    className='input bg-oxford-blue/90 text-base'
                    placeholder='Type field name...'
                    {...field}
                  />
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
              name='isEmail'
              render={({ field }) => (
                <FormItem className='flex items-end gap-3'>
                  <FormLabel>Email</FormLabel>
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
              name='minLength'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min length</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      className='input bg-oxford-blue/90 text-base'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='maxLength'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max length</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      className='input bg-oxford-blue/90 text-base'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='regex'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Regex</FormLabel>
                <FormControl>
                  <Textarea
                    className='input resize-none bg-oxford-blue/90 text-base'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Example: /\d+/</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default StringFieldDialog;
