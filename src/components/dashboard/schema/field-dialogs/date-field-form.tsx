'use client';

import { FC, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Icons } from '@/components/icons';

import { cn, formatDate } from '@/lib/utils';

import { dateFieldSchema } from '@/schemas/fields-schemas';

import { fieldErrors } from '@/helpers/field-creation-errors';

import { AnyFieldDialogProps } from '.';

type DateFieldFormProps = {
  defaultValues?: z.infer<typeof dateFieldSchema>;
} & AnyFieldDialogProps;

const DateFieldForm: FC<DateFieldFormProps> = ({
  defaultValues,
  updateSchemaFields,
  closeDialog,
}) => {
  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof dateFieldSchema>>({
    resolver: zodResolver(dateFieldSchema),
    defaultValues: (defaultValues && {
      ...defaultValues,
      from: defaultValues.from && new Date(defaultValues.from),
      to: defaultValues.to && new Date(defaultValues.to),
    }) || {
      name: '',
      isRequired: false,
      from: undefined,
      to: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof dateFieldSchema>) => {
    const result = updateSchemaFields({
      ...values,
      id: defaultValues ? defaultValues.id : uuidv4(),
    });

    if (result === 'SUCCESS') {
      closeDialog();

      return;
    }

    form.setError('name', {
      message: fieldErrors.find((error) => error.code === result)?.message,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (_, e) => {
          e?.stopPropagation();
        })}
        className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='name'
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
        <div className='flex w-full items-center justify-between gap-5'>
          <FormField
            control={form.control}
            name='from'
            render={({ field }) => (
              <FormItem className='flex flex-1 flex-col'>
                <FormLabel>From</FormLabel>
                <Popover open={fromOpen} onOpenChange={setFromOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        className={cn(
                          'w-full max-w-sm pl-3 text-left font-normal text-oxford-blue-dark dark:bg-slate-100 dark:hover:bg-slate-200 dark:hover:text-oxford-blue-dark',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value ? (
                          formatDate(field.value)
                        ) : (
                          <span>Pick a lower range</span>
                        )}
                        <Icons.calendar className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setFromOpen(false);
                      }}
                      disabled={(date) => date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='to'
            render={({ field }) => (
              <FormItem className='flex flex-1 flex-col'>
                <FormLabel>To</FormLabel>
                <Popover open={toOpen} onOpenChange={setToOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        className={cn(
                          'w-full max-w-sm pl-3 text-left font-normal text-oxford-blue-dark dark:bg-slate-100 dark:hover:bg-slate-200 dark:hover:text-oxford-blue-dark',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value ? (
                          formatDate(field.value)
                        ) : (
                          <span>Pick a higher range</span>
                        )}
                        <Icons.calendar className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setToOpen(false);
                      }}
                      disabled={(date) => date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          className='mt-3 self-end bg-crayola-blue px-5 text-lg text-off-white hover:bg-crayola-blue/80 dark:bg-crayola-blue dark:text-off-white dark:hover:bg-crayola-blue/80'>
          {defaultValues ? 'Edit field' : 'Create field'}
        </Button>
      </form>
    </Form>
  );
};

export default DateFieldForm;
