'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

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
import { useToast } from '@/components/ui/use-toast';

import { useSchemaCreationStore } from '@/context/schema-creation-store';

import { trpc } from '@/trpc/client';

import { FieldType } from '@/schemas/fields-schemas';
import { SchemaType, createSchemaSchema } from '@/schemas/schemas-schema';

import FieldsCard from './fields-card';

type CreateSchemaFormProps = {
  type?: 'add';
};

type EditSchemaFormProps = {
  type?: 'edit';
  schema: SchemaType;
};

type SchemaFormProps = CreateSchemaFormProps | EditSchemaFormProps;

const SchemaForm: FC<SchemaFormProps> = (props) => {
  const { type } = props;

  if (type === 'add') return <AddSchema />;
  if (type === 'edit') return <EditSchema schema={props.schema} />;
};

export default SchemaForm;

const AddSchema: FC<CreateSchemaFormProps> = () => {
  const { toast } = useToast();

  // Getting tRPC route to add schemas
  const addSchema = trpc.schema.addSchema.useMutation();

  // Getting router
  const router = useRouter();

  // Schema storage related properties and actions
  const {
    name,
    setName,
    fields: storedFields,
    setFields,
    resetSchema,
  } = useSchemaCreationStore();

  // Initializing form
  const form = useForm<z.infer<typeof createSchemaSchema>>({
    resolver: zodResolver(createSchemaSchema),
    defaultValues: {
      name: name,
    },
  });

  const [schemaFields, setSchemaFields] = useState<FieldType[]>([]);

  // CRUD schema fields methods
  const addSchemaField = (schemaField: FieldType): boolean => {
    const isUnique = !schemaFields.some(
      (field) => field.name === schemaField.name && field.id !== schemaField.id
    );

    if (!isUnique) {
      return false;
    }

    updateSchemaFields([...schemaFields, schemaField]);

    return true;
  };

  const editSchemaField = (schemaField: FieldType): boolean => {
    const newSchemaFields = schemaFields.map((field) =>
      field.id === schemaField.id ? { ...schemaField } : field
    );

    updateSchemaFields(newSchemaFields);

    return true;
  };

  const removeSchemaField = (schemaField: FieldType): boolean => {
    const newSchemaFields = schemaFields.filter(
      (field) => field.id !== schemaField.id
    );

    updateSchemaFields(newSchemaFields);

    return true;
  };

  // Update schemas with passed value or update only global store after reorder
  const updateSchemaFields = (fields?: FieldType[]) => {
    if (fields) {
      setSchemaFields(fields);
      setFields(fields);
    } else {
      setFields(schemaFields);
    }
  };

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

const EditSchema: FC<EditSchemaFormProps> = ({ schema }) => {
  const { toast } = useToast();

  // Getting tRPC route to edit schemas
  const editSchema = trpc.schema.editSchema.useMutation();

  // Getting router
  const router = useRouter();

  // Initializing form
  const form = useForm<z.infer<typeof createSchemaSchema>>({
    resolver: zodResolver(createSchemaSchema),
    defaultValues: {
      name: schema.name,
    },
  });

  const [schemaFields, setSchemaFields] = useState<FieldType[]>(
    schema.fields as FieldType[]
  );

  // CRUD schema fields methods
  const addSchemaField = (schemaField: FieldType): boolean => {
    const isUnique = !schemaFields.some(
      (field) => field.name === schemaField.name && field.id !== schemaField.id
    );

    if (!isUnique) {
      return false;
    }

    updateSchemaFields([...schemaFields, schemaField]);

    return true;
  };

  const editSchemaField = (schemaField: FieldType): boolean => {
    const newSchemaFields = schemaFields.map((field) =>
      field.id === schemaField.id ? { ...schemaField } : field
    );

    updateSchemaFields(newSchemaFields);

    return true;
  };

  const removeSchemaField = (schemaField: FieldType): boolean => {
    const newSchemaFields = schemaFields.filter(
      (field) => field.id !== schemaField.id
    );

    updateSchemaFields(newSchemaFields);

    return true;
  };

  // Update schemas with passed value or update only global store after reorder
  const updateSchemaFields = (fields?: FieldType[]) => {
    if (fields) {
      setSchemaFields(fields);
    }
  };

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
