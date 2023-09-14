'use client';

import { ChangeEvent, FC, createElement, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { Reorder } from 'framer-motion';

import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useSchemaCreationStore } from '@/context/schema-creation-store';

import { FieldDialogs } from '@/components/dashboard/create-schema/field-dialogs';
import FieldDraggable from '@/components/dashboard/create-schema/field-draggable';

import { cn } from '@/lib/utils';

import { FieldType } from '@/schemas/fields-schemas';

type SchemaCreationFormProps = {};

const schemaCreationSchema = z.object({
  schemaName: z.string().min(3, {
    message: 'Schema name must be at least 3 characters.',
  }),
});

const SchemaCreationForm: FC<SchemaCreationFormProps> = ({}) => {
  const router = useRouter();

  // Schema storage related properties and actions
  const {
    name,
    setSchemaName,
    fields: storedFields,
    setFields,
    resetSchema,
  } = useSchemaCreationStore();

  // Initializing form
  const form = useForm<z.infer<typeof schemaCreationSchema>>({
    resolver: zodResolver(schemaCreationSchema),
    defaultValues: {
      schemaName: '',
    },
  });

  // Client state
  const [selectedSchemaField, setSelectedSchemaField] = useState<
    keyof typeof FieldDialogs | null
  >();
  const [schemaFields, setSchemaFields] = useState<FieldType[]>([]);

  // Setting schema fields according to a state stored in localStorage
  useEffect(() => {
    setSchemaFields(storedFields);
  }, []);

  // Handle active dialog state
  const handleFieldDialogOpenChange = (open: boolean) => {
    !open && setSelectedSchemaField(null);
  };

  const handleCancelClick = () => {
    router.back();
    resetSchema();
  };

  // CRUD schema fields methods
  const addSchemaField = (schemaField: FieldType): boolean => {
    const isUnique = !schemaFields.some(
      (field) => field.name === schemaField.name && field.id !== schemaField.id
    );

    if (!isUnique) {
      return false;
    }

    updateSchemaFields([schemaField, ...schemaFields]);

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

  // Update global schema name
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSchemaName(e.target.value);
  };

  // Handle submittion
  const onSubmit = async (values: z.infer<typeof schemaCreationSchema>) => {
    console.log(values);
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
              name='schemaName'
              render={({ field }) => (
                <FormItem className='w-full max-w-xs'>
                  <FormLabel>Schema name</FormLabel>
                  <FormControl>
                    <Input
                      className='text-lg text-oxford-blue-dark dark:text-oxford-blue-dark'
                      placeholder='Your schema name...'
                      {...field}
                      value={name}
                      onChange={handleNameChange}
                    />
                  </FormControl>
                  <FormMessage />
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
      <Card className='flex flex-1 flex-col gap-5 border-0 bg-transparent dark:bg-transparent'>
        <CardTitle className='pl-5'>Fields</CardTitle>
        <Card className='flex flex-1 bg-transparent dark:bg-transparent'>
          <CardContent
            className={cn('flex flex-1 flex-col items-center justify-between', {
              'justify-center p-0 pl-2': schemaFields.length === 0,
            })}>
            <Reorder.Group
              className='flex w-full flex-col gap-4 pt-3'
              axis='y'
              onReorder={setSchemaFields}
              values={schemaFields}>
              {schemaFields.map((schemaField) => {
                return (
                  <FieldDraggable
                    key={schemaField.name}
                    value={schemaField}
                    editSchemaField={editSchemaField}
                    removeSchemaFeild={removeSchemaField}
                    updateSchemaFields={updateSchemaFields}
                  />
                );
              })}
            </Reorder.Group>
            <Dialog
              open={!!selectedSchemaField}
              onOpenChange={handleFieldDialogOpenChange}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='flex items-center gap-3 decoration-emerald-700 dark:decoration-success'
                    variant='link'>
                    <span
                      className={cn(
                        'text-base text-emerald-700 dark:text-success',
                        {
                          'text-lg': schemaFields.length === 0,
                        }
                      )}>
                      Add a new field
                    </span>
                    <Icons.add
                      className={cn(
                        'h-4 w-4 stroke-emerald-700 dark:stroke-success',
                        {
                          'h-5 w-5': schemaFields.length === 0,
                        }
                      )}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>Select field type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.keys(FieldDialogs).map((fieldType) => {
                    return (
                      <DialogTrigger
                        asChild
                        key={fieldType}
                        onSelect={() =>
                          setSelectedSchemaField(
                            fieldType as keyof typeof FieldDialogs
                          )
                        }>
                        <DropdownMenuItem className='capitalize'>
                          {fieldType}
                        </DropdownMenuItem>
                      </DialogTrigger>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              {selectedSchemaField &&
                createElement(FieldDialogs[selectedSchemaField], {
                  updateSchemaFields: addSchemaField,
                  closeDialog: () => handleFieldDialogOpenChange(false),
                })}
            </Dialog>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
};

export default SchemaCreationForm;
