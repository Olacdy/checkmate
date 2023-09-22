import { z } from 'zod';

import { FieldType } from '@/schemas/fields-schemas';

const createStringField = (
  stringFieldConfig: Extract<FieldType, { type: 'string' }>
) => {
  const { isRequired, isEmail, minLength, maxLength, regex } =
    stringFieldConfig;

  const stringField = z.string();

  if (!isRequired) stringField.optional();
  if (isEmail) stringField.email();
  if (minLength) stringField.min(minLength);
  if (maxLength) stringField.max(maxLength);
  if (regex) stringField.regex(new RegExp(regex));

  return stringField;
};

const createNumberField = (
  numberFieldConfig: Extract<FieldType, { type: 'number' }>
) => {
  const { isRequired, isInt, min, max } = numberFieldConfig;

  const numberField = z.number();

  if (!isRequired) numberField.optional();
  if (isInt) numberField.int();
  if (min) numberField.min(min);
  if (max) numberField.max(max);

  return numberField;
};

const createDateField = (
  dateFieldConfig: Extract<FieldType, { type: 'date' }>
) => {
  const { isRequired, from, to } = dateFieldConfig;

  const dateField = z.date();

  if (!isRequired) dateField.optional();
  if (from) dateField.min(from);
  if (to) dateField.max(to);

  return dateField;
};

const createBooleanField = (
  booleanFieldConfig: Extract<FieldType, { type: 'boolean' }>
) => {
  const { isRequired } = booleanFieldConfig;

  const booleanField = z.boolean();

  if (!isRequired) booleanField.optional();

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
      schemaFields[fieldConfig.name] = fieldSchema;
    }
  });

  const schema = z.object(schemaFields);

  return schema;
};
