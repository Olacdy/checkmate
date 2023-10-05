import { z } from 'zod';

import { FieldType } from '@/schemas/fields-schemas';

const createStringField = (
  stringFieldConfig: Extract<FieldType, { type: 'string' }>
) => {
  const { isRequired, isEmail, minLength, maxLength, regex } =
    stringFieldConfig;

  let stringField = z.string();

  if (isEmail) stringField = stringField.email();
  if (minLength) stringField = stringField.min(minLength);
  if (maxLength) stringField = stringField.max(maxLength);
  if (regex) stringField = stringField.regex(new RegExp(regex));

  // @ts-ignore
  if (!isRequired) stringField = stringField.optional();

  return stringField;
};

const createNumberField = (
  numberFieldConfig: Extract<FieldType, { type: 'number' }>
) => {
  const { isRequired, isInt, min, max } = numberFieldConfig;

  let numberField = z.number();

  if (isInt) numberField = numberField.int();
  if (min) numberField = numberField.min(min);
  if (max) numberField = numberField.max(max);

  // @ts-ignore
  if (!isRequired) numberField = numberField.optional();

  return numberField;
};

const createDateField = (
  dateFieldConfig: Extract<FieldType, { type: 'date' }>
) => {
  const { isRequired, from, to } = dateFieldConfig;

  let dateField = z.date();

  if (from) dateField = dateField.min(from);
  if (to) dateField = dateField.max(to);

  // @ts-ignore
  if (!isRequired) dateField = dateField.optional();

  return dateField;
};

const createBooleanField = (
  booleanFieldConfig: Extract<FieldType, { type: 'boolean' }>
) => {
  const { isRequired } = booleanFieldConfig;

  let booleanField = z.boolean();

  // @ts-ignore
  if (!isRequired) booleanField = booleanField.optional();

  return booleanField;
};

const fieldCreators = {
  string: createStringField,
  number: createNumberField,
  date: createDateField,
  boolean: createBooleanField,
};

export const createSchema = (fieldConfigs: FieldType[]) => {
  const schemaFields: Record<string, any> = {};

  fieldConfigs.forEach((fieldConfig) => {
    // @ts-ignore
    const fieldSchema = fieldCreators[fieldConfig.type](fieldConfig);

    if (fieldSchema) {
      schemaFields[fieldConfig.name.toLowerCase()] = fieldSchema;
    }
  });

  const schema = z.object(schemaFields);

  return schema;
};
