'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';

import { getQueryKey } from '@trpc/react-query';

import { useRouter } from 'next/navigation';

import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast, type toast as Toast } from '@/components/ui/use-toast';

import FieldsCard from '@/components/dashboard/schema/fields-card';

import { useSchemaCreationStore } from '@/context/schema-creation-store';

import { trpc } from '@/trpc/client';

import { FieldType } from '@/schemas/fields-schemas';
import { SchemaType, createSchemaSchema } from '@/schemas/schema-route-schemas';

import { FieldActionResultType } from '@/helpers/schema-creation-errors';

type CreateSchemaFormProps = {
  type?: 'add';
};

type EditSchemaFormProps = {
  type?: 'edit';
  schema: SchemaType;
};

type AnySchemaFromProps = {
  toast: typeof Toast;
  router: AppRouterInstance;
  onSettled: () => void;
  schemaFields: FieldType[];
  setSchemaFields: (schemaFields: FieldType[]) => void;
  createSchemaFieldsActions: (
    updateSchemaFields: (field?: FieldType[]) => void
  ) => {
    addSchemaField: (schemaField: FieldType) => FieldActionResultType;
    editSchemaField: (schemaField: FieldType) => FieldActionResultType;
    removeSchemaField: (schemaField: FieldType) => FieldActionResultType;
  };
};

type SchemaFormProps = CreateSchemaFormProps | EditSchemaFormProps;

const SchemaForm: FC<SchemaFormProps> = (props) => {
  // Getting query client and defining queries to invalidate
  const queryClient = useQueryClient();

  const onSettled = () => {
    queryClient.invalidateQueries(getQueryKey(trpc.schema.getSchemas));
    queryClient.invalidateQueries(getQueryKey(trpc.schema.getSchemasCount));
  };

  // Getting schema form type
  const { type } = props;

  // Getting toast for messages
  const { toast } = useToast();

  // Getting router
  const router = useRouter();

  const [schemaFields, setSchemaFields] = useState<FieldType[]>([]);

  // CRUD schema fields methods
  const createSchemaFieldsActions = (
    updateSchemaFields: (field?: FieldType[]) => void
  ) => {
    const addSchemaField = (schemaField: FieldType): FieldActionResultType => {
      const isUnique = !schemaFields.some(
        (field) =>
          field.name === schemaField.name && field.id !== schemaField.id
      );

      if (!isUnique) {
        return 'FIELD_NAME_NOT_UNIQUE';
      }

      updateSchemaFields([...schemaFields, schemaField]);

      return true;
    };

    const editSchemaField = (schemaField: FieldType): FieldActionResultType => {
      updateSchemaFields(
        schemaFields.map((field) =>
          field.id === schemaField.id ? { ...schemaField } : field
        )
      );

      return true;
    };

    const removeSchemaField = (
      schemaField: FieldType
    ): FieldActionResultType => {
      updateSchemaFields(
        schemaFields.filter((field) => field.id !== schemaField.id)
      );

      return true;
    };

    return { addSchemaField, editSchemaField, removeSchemaField };
  };

  if (type === 'add')
    return (
      <AddSchema
        toast={toast}
        router={router}
        onSettled={onSettled}
        schemaFields={schemaFields}
        setSchemaFields={setSchemaFields}
        createSchemaFieldsActions={createSchemaFieldsActions}
      />
    );
  if (type === 'edit')
    return (
      <EditSchema
        schema={props.schema}
        toast={toast}
        router={router}
        onSettled={onSettled}
        schemaFields={schemaFields}
        setSchemaFields={setSchemaFields}
        createSchemaFieldsActions={createSchemaFieldsActions}
      />
    );
};

export default SchemaForm;

const AddSchema: FC<AnySchemaFromProps & CreateSchemaFormProps> = ({
  toast,
  router,
  onSettled,
  schemaFields,
  setSchemaFields,
  createSchemaFieldsActions,
}) => {
  // Schema storage related properties and actions
  const {
    name,
    setName,
    fields: storedFields,
    setFields,
    resetSchema,
  } = useSchemaCreationStore();

  // Getting tRPC route to add schemas
  const addSchema = trpc.schema.addSchema.useMutation({
    onSettled: onSettled,
  });

  // Initializing form
  const form = useForm<z.infer<typeof createSchemaSchema>>({
    resolver: zodResolver(createSchemaSchema),
    defaultValues: {
      name: name,
    },
  });

  // Update schemas with passed value or update only global store after reorder
  const updateSchemaFields = (fields?: FieldType[]) => {
    if (fields) {
      setSchemaFields(fields);
      setFields(fields);
    } else {
      setFields(schemaFields);
    }
  };

  // Initializing CRUD schema actions
  const { addSchemaField, editSchemaField, removeSchemaField } =
    createSchemaFieldsActions(updateSchemaFields);

  // Setting schema fields according to a state stored in localStorage
  useEffect(() => {
    setSchemaFields(storedFields);
  }, []);

  const handleCancelClick = () => {
    router.back();
    resetSchema();
  };

  // Update global schema name
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    setName(newName);
    form.setValue('name', newName);
  };

  // Handle submittion
  const onSubmit = async (values: z.infer<typeof createSchemaSchema>) => {
    if (schemaFields.length < 1) {
      toast({
        variant: 'destructive',
        title: 'Please, add at least one field.',
      });
      return;
    }

    await addSchema.mutateAsync({
      name: values.name,
      fields: JSON.stringify(storedFields),
    });

    resetSchema();

    router.replace('/dashboard/schemas');

    toast({
      variant: 'success',
      title: 'Schema successfully created',
    });
  };

  return (
    <div className='flex flex-1 flex-col gap-10'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col space-y-8'>
          <div className='flex w-full items-end justify-between gap-10'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='relative w-full max-w-xs'>
                  <FormLabel>Schema name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      className='text-lg text-oxford-blue-dark dark:text-oxford-blue-dark'
                      placeholder='Your schema name...'
                      {...field}
                      value={name}
                      onChange={handleNameChange}
                    />
                  </FormControl>
                  <FormMessage className='absolute -bottom-7 left-0' />
                </FormItem>
              )}
            />
            <div className='flex items-center justify-between gap-5'>
              <Button
                onClick={handleCancelClick}
                className='bg-oxford-blue/90 text-lg hover:bg-oxford-blue/70'
                type='reset'>
                Cancel
              </Button>

              <Button
                className='bg-crayola-blue px-5 text-lg text-off-white hover:bg-crayola-blue/80 dark:bg-crayola-blue dark:text-off-white dark:hover:bg-crayola-blue/80'
                type='submit'>
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <FieldsCard
        type='edit'
        schemaFields={schemaFields}
        setSchemaFields={setSchemaFields}
        addSchemaField={addSchemaField}
        editSchemaField={editSchemaField}
        removeSchemaField={removeSchemaField}
        updateSchemaFields={updateSchemaFields}
      />
    </div>
  );
};

const EditSchema: FC<AnySchemaFromProps & EditSchemaFormProps> = ({
  schema,
  toast,
  router,
  onSettled,
  schemaFields,
  setSchemaFields,
  createSchemaFieldsActions,
}) => {
  // Getting tRPC route to edit schemas
  const editSchema = trpc.schema.editSchema.useMutation({
    onSettled: onSettled,
  });

  // Initializing form
  const form = useForm<z.infer<typeof createSchemaSchema>>({
    resolver: zodResolver(createSchemaSchema),
    defaultValues: {
      name: schema.name,
    },
  });

  // Setting schema fields from passed schema
  useEffect(() => {
    setSchemaFields(schema.fields as FieldType[]);
  }, []);

  // Update schemas with passed value or update only global store after reorder
  const updateSchemaFields = (fields?: FieldType[]) => {
    if (fields) {
      setSchemaFields(fields);
    }
  };

  // Initializing CRUD schema actions
  const { addSchemaField, editSchemaField, removeSchemaField } =
    createSchemaFieldsActions(updateSchemaFields);

  const handleResetClick = () => {
    form.setValue('name', schema.name);
    setSchemaFields(schema.fields as FieldType[]);
  };

  // Handle submittion
  const onSubmit = async (values: z.infer<typeof createSchemaSchema>) => {
    if (schemaFields.length < 1) {
      toast({
        variant: 'destructive',
        title: 'Please, add at least one field.',
      });
      return;
    }

    await editSchema.mutateAsync({
      id: schema.id,
      name: values.name,
      fields: JSON.stringify(schemaFields),
    });

    router.replace(`/dashboard/schema/${schema.id}`);
    router.refresh();

    toast({
      variant: 'success',
      title: 'Schema successfully edited',
    });
  };

  return (
    <div className='flex flex-1 flex-col gap-10'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col space-y-8'>
          <div className='flex w-full items-end justify-between gap-10'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='relative w-full max-w-xs'>
                  <FormLabel>Schema name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      className='text-lg text-oxford-blue-dark dark:text-oxford-blue-dark'
                      placeholder='Your schema name...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='absolute -bottom-7 left-0' />
                </FormItem>
              )}
            />
            <div className='flex items-center justify-between gap-5'>
              <Button
                onClick={handleResetClick}
                className='bg-oxford-blue/90 text-lg hover:bg-oxford-blue/70'
                type='reset'>
                Reset
              </Button>

              <Button
                className='bg-crayola-blue px-5 text-lg text-off-white hover:bg-crayola-blue/80 dark:bg-crayola-blue dark:text-off-white dark:hover:bg-crayola-blue/80'
                type='submit'>
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <FieldsCard
        type='edit'
        schemaFields={schemaFields}
        setSchemaFields={setSchemaFields}
        addSchemaField={addSchemaField}
        editSchemaField={editSchemaField}
        removeSchemaField={removeSchemaField}
        updateSchemaFields={updateSchemaFields}
      />
    </div>
  );
};
