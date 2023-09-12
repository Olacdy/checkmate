'use client';

import { FC, createElement, useState } from 'react';

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

import { FieldDialogs } from '@/components/dashboard/create-schema/field-dialogs';
import FieldDraggable from '@/components/dashboard/create-schema/field-draggable';

import { cn } from '@/lib/utils';

import { fieldType } from '@/schemas/fields-schemas';

import { fieldTypes } from '@/helpers/data';

type SchemaCreationFormProps = {};

const schemaCreationSchema = z.object({
  schemaName: z.string().min(3, {
    message: 'Schema name must be at least 3 characters.',
  }),
});

const SchemaCreationForm: FC<SchemaCreationFormProps> = ({}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schemaCreationSchema>>({
    resolver: zodResolver(schemaCreationSchema),
    defaultValues: {
      schemaName: '',
    },
  });

  const [selectedSchemaField, setSelectedSchemaField] = useState<
    keyof typeof FieldDialogs | null
  >();

  const [schemaFields, setSchemaFields] = useState<fieldType[]>([]);

  const handleFieldDialogOpenChange = (open: boolean) => {
    !open && setSelectedSchemaField(null);
  };

  const handleCancelClick = () => {
    router.back();
  };

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
                      className='text-lg'
                      placeholder='Your schema name...'
                      {...field}
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
              className='w-full pt-3'
              axis='y'
              onReorder={setSchemaFields}
              values={schemaFields}>
              {schemaFields.map((schemaField) => {
                return <FieldDraggable value={schemaField} />;
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
                  {fieldTypes.map((fieldType) => {
                    return (
                      <DialogTrigger
                        asChild
                        key={fieldType.type}
                        onSelect={() => setSelectedSchemaField(fieldType.type)}>
                        <DropdownMenuItem>{fieldType.title}</DropdownMenuItem>
                      </DialogTrigger>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              {selectedSchemaField &&
                createElement(FieldDialogs[selectedSchemaField], {
                  schemaFields: schemaFields,
                  setSchemaFields: setSchemaFields,
                  handleFieldDialogOpenChange: handleFieldDialogOpenChange,
                })}
            </Dialog>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
};

export default SchemaCreationForm;
