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

const formSchema = z.object({
  fieldName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  isRequired: z.boolean().optional(),
  isEmail: z.boolean().optional(),
  minLength: z.union([z.number().int().nonnegative(), z.nan()]).optional(),
  maxLength: z.union([z.number().int().nonnegative(), z.nan()]).optional(),
  regex: z.string().optional(),
});

type StringFieldDialogProps = {};

const StringFieldDialog: FC<StringFieldDialogProps> = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fieldName: '',
      isRequired: false,
      isEmail: false,
      minLength: undefined,
      maxLength: undefined,
      regex: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                <FormLabel className='text-oxford-blue dark:text-off-white'>
                  Field name
                </FormLabel>
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
                  <FormLabel className='text-oxford-blue dark:text-off-white'>
                    Required
                  </FormLabel>
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
                  <FormLabel className='text-oxford-blue dark:text-off-white'>
                    Email
                  </FormLabel>
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
                  <FormLabel className='text-oxford-blue dark:text-off-white'>
                    Min length
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min='0'
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
                  <FormLabel className='text-oxford-blue dark:text-off-white'>
                    Max length
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min='0'
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
                <FormLabel className='text-oxford-blue dark:text-off-white'>
                  Regex
                </FormLabel>
                <FormControl>
                  <Input
                    className='input bg-oxford-blue/90 text-base'
                    {...field}
                  />
                </FormControl>
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
