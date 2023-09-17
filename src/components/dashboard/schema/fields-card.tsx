'use client';

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
import { fields } from '@/helpers/data';
import { cn } from '@/lib/utils';
import { FieldType } from '@/schemas/fields-schemas';
import { trpc } from '@/trpc/client';
import { Reorder } from 'framer-motion';
import { FC, useState } from 'react';
import Field from './field';
import FieldDialog from './field-dialogs';

type BaseFieldsCardProps = {
  schemaFields: FieldType[];
};

type ReadonlyFieldsCardProps = {
  type: 'readonly';
};

type EditFieldsCardProps = {
  type: 'edit';
  setSchemaFields: (schemaFields: FieldType[]) => void;
  addSchemaField: (schemaField: FieldType) => boolean;
  editSchemaField: (schemaField: FieldType) => boolean;
  removeSchemaField: (schemaField: FieldType) => boolean;
  updateSchemaFields: (fields?: FieldType[]) => void;
};

type FieldsCardProps = BaseFieldsCardProps &
  (ReadonlyFieldsCardProps | EditFieldsCardProps);

const FieldsCard: FC<FieldsCardProps> = (props) => {
  const schemas = trpc.schema.getSchemas.useQuery().data;

  // Client state
  const [openedDialog, setOpenedDialog] = useState<
    (typeof fields)[number] | undefined
  >();

  // Handle active dialog state
  const handleOpenedDialogChange = (open: boolean) => {
    !open && setOpenedDialog(undefined);
  };

  return (
    <Card className='flex flex-1 flex-col gap-5 border-0 bg-transparent dark:bg-transparent'>
      {props.type === 'edit' && <CardTitle className='pl-5'>Fields</CardTitle>}
      <Card className='flex flex-1 border-oxford-blue/10 bg-transparent dark:border-slate-600/30 dark:bg-transparent'>
        <CardContent
          className={cn('flex flex-1 flex-col items-center justify-between', {
            'justify-center p-0 pl-2': props.schemaFields.length === 0,
            'pt-3': props.type === 'readonly',
          })}>
          {props.type === 'readonly' && (
            <div className='flex w-full flex-col gap-4 pt-3'>
              {props.schemaFields.map((schemaField) => {
                return (
                  <Field
                    key={schemaField.id}
                    type='readonly'
                    value={schemaField}
                  />
                );
              })}
            </div>
          )}
          {props.type === 'edit' && (
            <>
              <Reorder.Group
                className='flex w-full flex-col gap-4 pt-3'
                axis='y'
                onReorder={props.setSchemaFields}
                values={props.schemaFields}>
                {props.schemaFields.map((schemaField) => {
                  return (
                    <Field
                      key={schemaField.id}
                      type='draggable'
                      value={schemaField}
                      editSchemaField={props.editSchemaField}
                      removeSchemaFeild={props.removeSchemaField}
                      updateSchemaFields={props.updateSchemaFields}
                    />
                  );
                })}
              </Reorder.Group>
              <Dialog
                open={!!openedDialog}
                onOpenChange={handleOpenedDialogChange}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className='flex items-center gap-3 decoration-emerald-700 dark:decoration-success'
                      variant='link'>
                      <span
                        className={cn(
                          'text-base text-emerald-700 dark:text-success',
                          {
                            'text-lg': props.schemaFields.length === 0,
                          }
                        )}>
                        Add a new field
                      </span>
                      <Icons.add
                        className={cn(
                          'h-4 w-4 stroke-emerald-700 dark:stroke-success',
                          {
                            'h-5 w-5': props.schemaFields.length === 0,
                          }
                        )}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Select field type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {fields.map((field) => {
                      const Icon = Icons[field.icon];

                      return (
                        <DialogTrigger asChild key={field.name}>
                          <DropdownMenuItem
                            className='flex items-center gap-2 capitalize'
                            onSelect={() => setOpenedDialog(field)}>
                            <Icon className='h-5 w-5' />
                            <span>{field.name}</span>
                          </DropdownMenuItem>
                        </DialogTrigger>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
                {openedDialog && (
                  <FieldDialog
                    type={openedDialog.type}
                    schemas={schemas}
                    updateSchemaFields={props.addSchemaField}
                    closeDialog={() => handleOpenedDialogChange(false)}
                  />
                )}
              </Dialog>
            </>
          )}
        </CardContent>
      </Card>
    </Card>
  );
};

export default FieldsCard;
