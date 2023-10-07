import { FC } from 'react';

import { z } from 'zod';

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FieldType,
  booleanFieldSchema,
  dateFieldSchema,
  numberFieldSchema,
  schemaFieldSchema,
  stringFieldSchema,
} from '@/schemas/fields-schemas';

import BooleanFieldForm from './boolean-field-form';
import DateFieldForm from './date-field-form';
import NumberFieldForm from './number-field-form';
import SchemaFieldForm from './schema-field-form';
import StringFieldForm from './string-field-form';

import { FieldActionResultType } from '@/helpers/field-creation-errors';

export type AnyFieldDialogProps = {
  updateSchemaFields: (
    schemaField: Omit<FieldType, 'type'>
  ) => FieldActionResultType;
  closeDialog: () => void;
};

type BaseFieldDialogProps = {
  updateSchemaFields: (schemaField: FieldType) => FieldActionResultType;
  closeDialog: () => void;
};

type StringFieldDialogProps = {
  fieldType?: 'string';
  defaultValues?: z.infer<typeof stringFieldSchema>;
};

type NumberFieldDialogProps = {
  fieldType?: 'number';
  defaultValues?: z.infer<typeof numberFieldSchema>;
};

type DateFieldDialogProps = {
  fieldType?: 'date';
  defaultValues?: z.infer<typeof dateFieldSchema>;
};

type BooleanFieldDialogProps = {
  fieldType?: 'boolean';
  defaultValues?: z.infer<typeof booleanFieldSchema>;
};

type SchemaFieldDialogProps = {
  fieldType?: 'schema';
  defaultValues?: z.infer<typeof schemaFieldSchema>;
};

export type FieldDialogProps = BaseFieldDialogProps &
  (
    | StringFieldDialogProps
    | NumberFieldDialogProps
    | DateFieldDialogProps
    | BooleanFieldDialogProps
    | SchemaFieldDialogProps
  );

const FieldDialog: FC<FieldDialogProps> = (props) => {
  const {
    fieldType,
    defaultValues,
    updateSchemaFields: updateSchemaFieldsUntyped,
    closeDialog,
  } = props;

  const correspondingFieldForm = () => {
    if (!!!fieldType) return <>No type specified</>;

    const updateSchemaFields = (
      schemaField: Omit<FieldType, 'type'>
    ): FieldActionResultType => {
      // @ts-ignore
      return updateSchemaFieldsUntyped({ ...schemaField, type: fieldType });
    };

    if (fieldType === 'string') {
      return (
        <StringFieldForm
          defaultValues={defaultValues}
          updateSchemaFields={updateSchemaFields}
          closeDialog={closeDialog}
        />
      );
    }

    if (fieldType === 'number') {
      return (
        <NumberFieldForm
          defaultValues={defaultValues}
          updateSchemaFields={updateSchemaFields}
          closeDialog={closeDialog}
        />
      );
    }

    if (fieldType === 'date') {
      return (
        <DateFieldForm
          defaultValues={defaultValues}
          updateSchemaFields={updateSchemaFields}
          closeDialog={closeDialog}
        />
      );
    }

    if (fieldType === 'boolean') {
      return (
        <BooleanFieldForm
          defaultValues={defaultValues}
          updateSchemaFields={updateSchemaFields}
          closeDialog={closeDialog}
        />
      );
    }

    if (fieldType === 'schema') {
      const { defaultValues } = props;

      return (
        <SchemaFieldForm
          defaultValues={defaultValues}
          updateSchemaFields={updateSchemaFields}
          closeDialog={closeDialog}
        />
      );
    }
  };

  return (
    <DialogContent className='dark:bg-oxford-blue-dark sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle className='text-xl text-oxford-blue dark:text-off-white'>
          {props.defaultValues ? 'Edit field' : 'Create field'}
        </DialogTitle>
        <DialogDescription>
          {`Design a field of type ${fieldType}. Click ${
            props.defaultValues ? 'edit' : 'create'
          } field when you are done.`}
        </DialogDescription>
      </DialogHeader>
      {correspondingFieldForm()}
    </DialogContent>
  );
};

export default FieldDialog;
