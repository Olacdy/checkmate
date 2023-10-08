import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodString,
  ZodTypeAny,
  z,
} from 'zod';

import { prisma } from '@/lib/db';
import { toLowerCaseFirstLetter } from '@/lib/utils';

import { FieldType } from '@/schemas/fields-schemas';

const createStringField = async (
  stringFieldConfig: Extract<FieldType, { type: 'string' }>
) => {
  const { isRequired, isArray, isEmail, minLength, maxLength, regex } =
    stringFieldConfig;

  let stringField:
    | ZodString
    | ZodOptional<ZodString>
    | ZodArray<ZodString, 'many'>
    | ZodOptional<ZodArray<ZodString, 'many'>> = z.string();

  if (isEmail) stringField = stringField.email();
  if (minLength) stringField = stringField.min(minLength);
  if (maxLength) stringField = stringField.max(maxLength);
  if (regex) stringField = stringField.regex(new RegExp(regex));

  if (isArray) stringField = stringField.array();

  if (!isRequired) stringField = stringField.optional();

  return stringField;
};

const createNumberField = async (
  numberFieldConfig: Extract<FieldType, { type: 'number' }>
) => {
  const { isRequired, isArray, isInt, min, max } = numberFieldConfig;

  let numberField:
    | ZodNumber
    | ZodOptional<ZodNumber>
    | ZodArray<ZodNumber, 'many'>
    | ZodOptional<ZodArray<ZodNumber, 'many'>> = z.number();

  if (isInt) numberField = numberField.int();
  if (min) numberField = numberField.min(min);
  if (max) numberField = numberField.max(max);

  if (isArray) numberField = numberField.array();

  if (!isRequired) numberField = numberField.optional();

  return numberField;
};

const createDateField = async (
  dateFieldConfig: Extract<FieldType, { type: 'date' }>
) => {
  const { isRequired, isArray, from, to } = dateFieldConfig;

  let dateField:
    | ZodDate
    | ZodOptional<ZodDate>
    | ZodArray<ZodDate, 'many'>
    | ZodOptional<ZodArray<ZodDate, 'many'>> = z.coerce.date();

  if (from) dateField = dateField.min(new Date(from));
  if (to) dateField = dateField.max(new Date(to));

  if (isArray) dateField = dateField.array();

  if (!isRequired) dateField = dateField.optional();

  return dateField;
};

const createBooleanField = async (
  booleanFieldConfig: Extract<FieldType, { type: 'boolean' }>
) => {
  const { isRequired, isArray } = booleanFieldConfig;

  let booleanField:
    | ZodBoolean
    | ZodOptional<ZodBoolean>
    | ZodArray<ZodBoolean, 'many'>
    | ZodOptional<ZodArray<ZodBoolean, 'many'>> = z.boolean();

  if (isArray) booleanField = booleanField.array();

  if (!isRequired) booleanField = booleanField.optional();

  return booleanField;
};

const createSchemaField = async (
  schemaFieldConfig: Extract<FieldType, { type: 'schema' }>,
  schema: ZodObject<{}, 'strip', ZodTypeAny, {}, {}>
) => {
  const { isRequired, isArray, referencedSchema } = schemaFieldConfig;

  let referencedSchemaField: any;

  if (referencedSchema !== 'self') {
    const referencedSchemaFields = (
      await prisma.schema.findFirst({
        where: {
          id: referencedSchema,
        },
        select: {
          fields: true,
        },
      })
    )?.fields;

    if (referencedSchemaFields) {
      referencedSchemaField = await createSchema(
        referencedSchemaFields as FieldType[]
      );
    }
  }

  if (referencedSchema === 'self') referencedSchemaField = schema;

  if (isArray) referencedSchemaField = referencedSchemaField.array();

  if (!isRequired && referencedSchema !== 'self')
    referencedSchemaField = referencedSchemaField.optional();

  if (referencedSchema === 'self')
    return z.lazy(() => referencedSchemaField).optional();

  return referencedSchemaField;
};

const fieldCreators = {
  string: createStringField,
  number: createNumberField,
  date: createDateField,
  boolean: createBooleanField,
  schema: createSchemaField,
};

export const createSchema = async (fieldConfigs: FieldType[]) => {
  const schema = z.object({});

  for (const fieldConfig of fieldConfigs) {
    const fieldSchema = await fieldCreators[fieldConfig.type](
      // @ts-ignore
      fieldConfig,
      schema
    );

    if (fieldSchema) {
      // @ts-ignore
      schema.shape[toLowerCaseFirstLetter(fieldConfig.name)] = fieldSchema;
    }
  }

  return schema;
};
