'use client';

import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { FieldType, schemaFieldSchema } from '@/schemas/fields-schemas';
import { SchemaType } from '@/schemas/schemas-schema';

type SchemaFieldDialogProps = {
  schemas?: SchemaType[];
  defaultValues?: z.infer<typeof schemaFieldSchema>;
  updateSchemaFields: (schemaField: FieldType) => boolean;
  closeDialog: () => void;
};

const SchemaFieldDialog: FC<SchemaFieldDialogProps> = ({
  schemas,
  defaultValues,
  updateSchemaFields,
  closeDialog,
}) => {
  const form = useForm<z.infer<typeof schemaFieldSchema>>({
    resolver: zodResolver(schemaFieldSchema),
    defaultValues: defaultValues || {
      name: '',
      schema: '',
    },
  });

  const onSubmit = (values: z.infer<typeof schemaFieldSchema>) => {
    console.log(values);

    closeDialog();
  };

  return (
    <DialogContent className='dark:bg-oxford-blue-dark sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle className='text-xl text-oxford-blue dark:text-off-white'>
          Create field
        </DialogTitle>
        <DialogDescription>
          Design a field of type schema. Click create field when you are done.
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
                  <Input
                    className='bg-oxford-blue/90 text-base'
                    placeholder='Type field name...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='schema'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schema</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a verified email to display' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {schemas?.map((schema) => (
                      <SelectItem key={schema.id} value={schema.id}>
                        {schema.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select one of your schemas.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default SchemaFieldDialog;
