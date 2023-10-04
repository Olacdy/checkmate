'use client';

import { FC, useState } from 'react';

import { useParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

import { trpc } from '@/trpc/client';

import { schemaFieldSchema } from '@/schemas/fields-schemas';

import { fieldErrors } from '@/helpers/field-creation-errors';

import { AnyFieldDialogProps } from '.';

type SchemaFieldFormProps = {
  defaultValues?: z.infer<typeof schemaFieldSchema>;
} & AnyFieldDialogProps;

const SchemaFieldForm: FC<SchemaFieldFormProps> = ({
  defaultValues,
  updateSchemaFields,
  closeDialog,
}) => {
  const params = useParams();

  const schemas = trpc.schema.getSchemas.useQuery().data;

  const form = useForm<z.infer<typeof schemaFieldSchema>>({
    resolver: zodResolver(schemaFieldSchema),
    defaultValues: defaultValues || {
      name: '',
      isRequired: false,
    },
  });

  const [isRequiredEnabled, setIsRequiredEnabled] = useState<boolean>(
    (defaultValues && defaultValues.schema !== 'self') ?? true
  );

  const [schemaId, setSchemaId] = useState<string | undefined>(
    params.id as string
  );

  const onSubmit = (values: z.infer<typeof schemaFieldSchema>) => {
    const result = updateSchemaFields({
      ...values,
      isRequired: isRequiredEnabled ? values.isRequired : false,
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
                  disabled={!isRequiredEnabled}
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
          name='schema'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schema</FormLabel>
              <Select
                onValueChange={(event) => {
                  field.onChange(event);
                  setIsRequiredEnabled(event !== 'self');
                }}
                defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='dark:bg-off-white'>
                    <SelectValue placeholder='Select one of the schemas' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='self'>
                    Self &#40;would refer to itself&#41;
                  </SelectItem>
                  {schemas?.map((schema) => {
                    if (schemaId !== schema.id) {
                      return (
                        <SelectItem
                          key={schema.id}
                          value={schema.id.toString()}>
                          {schema.name}
                        </SelectItem>
                      );
                    }
                  })}
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
  );
};

export default SchemaFieldForm;
