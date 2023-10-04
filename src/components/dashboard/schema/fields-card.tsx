'use client';

import { FC, HTMLAttributes, useState } from 'react';

import { Reorder } from 'framer-motion';

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

import Field from '@/components/dashboard/schema/field';
import FieldDialog from '@/components/dashboard/schema/field-dialogs';

import { Icons } from '@/components/icons';

import { cn } from '@/lib/utils';

import { fields } from '@/helpers/data';

import { FieldType } from '@/schemas/fields-schemas';

import { Separator } from '@/components/ui/separator';
import { FieldActionResultType } from '@/helpers/field-creation-errors';

type BaseFieldsCardProps = {
  schemaFields: FieldType[];
} & HTMLAttributes<HTMLDivElement>;

type ReadonlyFieldsCardProps = {
  type: 'readonly';
  name: string;
};

type EditFieldsCardProps = {
  type: 'edit';
  setSchemaFields: (schemaFields: FieldType[]) => void;
  addSchemaField: (schemaField: FieldType) => FieldActionResultType;
  editSchemaField: (schemaField: FieldType) => FieldActionResultType;
  removeSchemaField: (schemaField: FieldType) => FieldActionResultType;
  updateSchemaFields: (fields?: FieldType[]) => void;
};

type FieldsCardProps = BaseFieldsCardProps &
  (ReadonlyFieldsCardProps | EditFieldsCardProps);

const FieldsCard: FC<FieldsCardProps> = ({
  className,
  schemaFields,
  ...props
}) => {
  const { type } = props;

  // Client state
  const [openedDialog, setOpenedDialog] = useState<
    (typeof fields)[number] | undefined
  >();

  // Handle active dialog state
  const handleOpenedDialogChange = (open: boolean) => {
    !open && setOpenedDialog(undefined);
  };

  const correspondingFields = () => {
    if (type === 'readonly') {
      return {
        fields: (
          <div className='max-h-[67vh] w-full overflow-y-auto'>
            <div className='flex w-full flex-col gap-4 py-3'>
              {schemaFields.map((schemaField) => {
                return (
                  <Field
                    key={schemaField.id}
                    type='readonly'
                    value={schemaField}
                  />
                );
              })}
            </div>
          </div>
        ),
        addField: <></>,
      };
    }

    if (type === 'edit') {
      const {
        setSchemaFields,
        addSchemaField,
        editSchemaField,
        removeSchemaField,
        updateSchemaFields,
      } = props;

      return {
        fields: (
          <div className='flex max-h-[50vh] w-full flex-1 overflow-y-auto'>
            <Reorder.Group
              className='flex w-full flex-1 flex-col gap-4 overflow-hidden pr-3 pt-5'
              axis='y'
              onReorder={setSchemaFields}
              values={schemaFields}>
              {schemaFields.map((schemaField) => {
                return (
                  <Field
                    key={schemaField.id}
                    type='draggable'
                    value={schemaField}
                    editSchemaField={editSchemaField}
                    removeSchemaFeild={() => removeSchemaField(schemaField)}
                    updateSchemaFields={() => updateSchemaFields()}
                  />
                );
              })}
            </Reorder.Group>
          </div>
        ),
        addField: (
          <Dialog open={!!openedDialog} onOpenChange={handleOpenedDialogChange}>
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
                fieldType={openedDialog.type}
                updateSchemaFields={addSchemaField}
                closeDialog={() => handleOpenedDialogChange(false)}
              />
            )}
          </Dialog>
        ),
      };
    }

    return { fields: <></>, addField: <></> };
  };

  return (
    <Card
      className={cn(
        'flex flex-1 flex-col gap-5 border-0 bg-transparent dark:bg-transparent',
        className
      )}>
      <CardTitle
        className={cn('pl-5', {
          'text-2xl': type === 'readonly',
        })}>
        {type === 'edit' ? 'Fields' : `${props.name}`}
      </CardTitle>
      <Card className='flex flex-1 border-oxford-blue/10 bg-transparent dark:border-slate-600/30 dark:bg-transparent'>
        <CardContent
          className={cn(
            'flex flex-1 flex-col items-center justify-between gap-3 pb-2',
            {
              'justify-center p-0 pl-2': schemaFields.length === 0,
              'pt-3': type === 'readonly',
            }
          )}>
          {schemaFields.length !== 0 && correspondingFields().fields}
          {type === 'edit' && schemaFields.length !== 0 && <Separator />}
          {type === 'edit' && correspondingFields().addField}
        </CardContent>
      </Card>
    </Card>
  );
};

export default FieldsCard;
