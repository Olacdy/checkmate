import DatetimeFieldDialog from './datetime-field-dialog';
import NumberFieldDialog from './number-field-dialog';
import SchemaFieldDialog from './schema-field-dialog';
import StringFieldDialog from './string-field-dialog';

export const FieldDialogs = {
  string: StringFieldDialog,
  number: NumberFieldDialog,
  datetime: DatetimeFieldDialog,
  schema: SchemaFieldDialog,
};
