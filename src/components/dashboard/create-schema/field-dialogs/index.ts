import DateFieldDialog from '@/components/dashboard/create-schema/field-dialogs/date-field-dialog';
import NumberFieldDialog from '@/components/dashboard/create-schema/field-dialogs/number-field-dialog';
import SchemaFieldDialog from '@/components/dashboard/create-schema/field-dialogs/schema-field-dialog';
import StringFieldDialog from '@/components/dashboard/create-schema/field-dialogs/string-field-dialog';

const FieldDialogs = [
  SchemaFieldDialog,
  StringFieldDialog,
  NumberFieldDialog,
  DateFieldDialog,
];

type FieldDialogType = (typeof FieldDialogs)[number];

export default FieldDialogType;
