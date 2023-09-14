'use client';

import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Icons } from '@/components/icons';

import { cn, formatDate } from '@/lib/utils';

import { FieldType, dateFieldSchema } from '@/schemas/fields-schemas';

type DateFieldDialogProps = {
  defaultValues?: z.infer<typeof dateFieldSchema>;
  updateSchemaFields: (schemaField: FieldType) => boolean;
  closeDialog: () => void;
};

const DateFieldDialog: FC<DateFieldDialogProps> = ({
  defaultValues,
  updateSchemaFields,
  closeDialog,
}) => {
  const form = useForm<z.infer<typeof dateFieldSchema>>({
    resolver: zodResolver(dateFieldSchema),
    defaultValues: defaultValues || {
      name: '',
      isRequired: false,
      from: undefined,
      to: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof dateFieldSchema>) => {
    if (values.from && values.to && values.from >= values.to) {
      form.setError('from', {
        message: 'Should be before "To".',
      });
      form.setError('to', {
        message: 'Should be after "From".',
      });

      return;
    }

    const result = updateSchemaFields({
      ...values,
      id: defaultValues ? defaultValues.id : uuidv4(),
      type: 'date',
    });

    if (result) {
      closeDialog();

      return;
    }

    form.setError('name', {
      message: 'Field name should be unique.',
    });
  };

  return (
    <DialogContent className='dark:bg-oxford-blue-dark sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle className='text-xl text-oxford-blue dark:text-off-white'>
          Create field
        </DialogTitle>
        <DialogDescription>
          Design a field of type date. Click create field when you are done.
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
                  <Popover>
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
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
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
                  <Popover>
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
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
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
    </DialogContent>
  );
};

export default DateFieldDialog;
