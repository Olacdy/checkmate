'use client';

import { FC, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
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

import { cn } from '@/lib/utils';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { fieldTypes } from '@/helpers/data';
import { FieldDialogs } from './field-dialogs';

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
  const [schemaFields, setSchemaFields] = useState([]);

  const onSubmit = async (values: z.infer<typeof schemaCreationSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-1 flex-col space-y-8'>
        <div className='flex w-full items-end justify-between gap-10'>
          <FormField
            control={form.control}
            name='schemaName'
            render={({ field }) => (
              <FormItem className='w-full max-w-xs'>
                <FormLabel>Schema name</FormLabel>
                <FormControl>
                  <Input
                    className='input bg-oxford-blue/90 text-lg'
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
              onClick={() => router.back()}
              className='bg-oxford-blue/90 text-lg'
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
        <Card className='flex flex-1 flex-col gap-5 border-0 bg-transparent dark:bg-transparent'>
          <CardTitle className='pl-5'>Fields</CardTitle>
          <Card className='flex flex-1 bg-transparent dark:bg-transparent'>
            <CardContent
              className={cn(
                'flex flex-1 flex-col items-center justify-between',
                {
                  'justify-center p-0 pl-2': schemaFields.length === 0,
                }
              )}>
              <div>
                {schemaFields.map((schemaField) => {
                  return <></>;
                })}
              </div>
              <Dialog
                onOpenChange={(open) => {
                  !open && setSelectedSchemaField(null);
                }}>
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
                        <>
                          <DialogTrigger
                            asChild
                            onSelect={() =>
                              setSelectedSchemaField(fieldType.type)
                            }>
                            <DropdownMenuItem>
                              {fieldType.title}
                            </DropdownMenuItem>
                          </DialogTrigger>
                        </>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FieldDialogs.string />
              </Dialog>
            </CardContent>
          </Card>
        </Card>
      </form>
    </Form>
  );
};

export default SchemaCreationForm;
