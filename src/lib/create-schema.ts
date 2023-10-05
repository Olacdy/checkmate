import { z } from 'zod';

import { FieldType } from '@/schemas/fields-schemas';

const createStringField = async (
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

const createNumberField = async (
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

const createDateField = async (
  dateFieldConfig: Extract<FieldType, { type: 'date' }>
) => {
  const { isRequired, from, to } = dateFieldConfig;

  let dateField = z.coerce.date();

  if (from) dateField = dateField.min(new Date(from));
  if (to) dateField = dateField.max(new Date(to));

  // @ts-ignore
  if (!isRequired) dateField = dateField.optional();

  return dateField;
};

const createBooleanField = async (
  booleanFieldConfig: Extract<FieldType, { type: 'boolean' }>
) => {
  const { isRequired } = booleanFieldConfig;

  let booleanField = z.boolean();

  // @ts-ignore
  if (!isRequired) booleanField = booleanField.optional();

  return booleanField;
};

const createSchemaField = async (
  schemaFieldConfig: Extract<FieldType, { type: 'schema' }>
) => {
  const { isRequired, referencedSchema, isArray } = schemaFieldConfig;

  // if (referencedSchema === 'self') {
  //   let selfReference = schema;

  //   schema.setKey(
  //     fieldConfig.name,
  //     z.lazy(() => schema.array())
  //   );
  // }
};

const fieldCreators = {
  string: createStringField,
  number: createNumberField,
  date: createDateField,
  boolean: createBooleanField,
  // schema: createSchemaField,
};

export const createSchema = async (fieldConfigs: FieldType[]) => {
  const schema = z.object({});

  fieldConfigs.forEach(async (fieldConfig) => {
    // @ts-ignore
    const fieldSchema = fieldCreators[fieldConfig.type](fieldConfig);

    if (fieldSchema) {
      // @ts-ignore
      schema.shape[fieldConfig.name.toLowerCase()] = await fieldSchema;
    }
  });

  return schema;
};
