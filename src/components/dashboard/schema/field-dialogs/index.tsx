import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FieldType,
  dateFieldSchema,
  numberFieldSchema,
  schemaFieldSchema,
  stringFieldSchema,
} from '@/schemas/fields-schemas';
import { FC } from 'react';
import { z } from 'zod';
import DateFieldForm from './date-field-form';
import NumberFieldForm from './number-field-form';
import SchemaFieldForm from './schema-field-form';
import StringFieldForm from './string-field-form';

export type BaseFieldDialogProps = {
  updateSchemaFields: (schemaField: FieldType) => boolean;
  closeDialog: () => void;
};

type StringFieldDialogProps = {
  type?: 'string';
  defaultValues?: z.infer<typeof stringFieldSchema>;
};

type NumberFieldDialogProps = {
  type?: 'number';
  defaultValues?: z.infer<typeof numberFieldSchema>;
};

type DateFieldDialogProps = {
  type?: 'date';
  defaultValues?: z.infer<typeof dateFieldSchema>;
};

type SchemaFieldDialogProps = {
  type?: 'schema';
  defaultValues?: z.infer<typeof schemaFieldSchema>;
};

export type FieldDialogProps = BaseFieldDialogProps &
  (
    | StringFieldDialogProps
    | NumberFieldDialogProps
    | DateFieldDialogProps
    | SchemaFieldDialogProps
  );

const FieldDialog: FC<FieldDialogProps> = (props) => {
  const correspondingFieldForm = () => {
    if (props.type === 'string') {
      const { defaultValues, updateSchemaFields, closeDialog } = props;

      return (
        <StringFieldForm
          defaultValues={defaultValues}
          updateSchemaFields={updateSchemaFields}
          closeDialog={closeDialog}
        />
      );
    }

    if (props.type === 'number') {
      const { defaultValues, updateSchemaFields, closeDialog } = props;

      return (
        <NumberFieldForm
          defaultValues={defaultValues}
          updateSchemaFields={updateSchemaFields}
          closeDialog={closeDialog}
        />
      );
    }

    if (props.type === 'date') {
      const { defaultValues, updateSchemaFields, closeDialog } = props;

      return (
        <DateFieldForm
          defaultValues={defaultValues}
          updateSchemaFields={updateSchemaFields}
          closeDialog={closeDialog}
        />
      );
    }

    if (props.type === 'schema') {
      const { defaultValues, updateSchemaFields, closeDialog } = props;

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
          {`Design a field of type ${props.type}. Click ${
            props.defaultValues ? 'edit' : 'create'
          } field when you are done.`}
        </DialogDescription>
      </DialogHeader>
      {correspondingFieldForm()}
    </DialogContent>
  );
};

export default FieldDialog;
