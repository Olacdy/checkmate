export const fieldErrors = [
  { code: 'FIELD_NAME_NOT_UNIQUE', message: 'Field name should be unique.' },
] as const;

export type FieldActionResultType = (typeof fieldErrors)[number]['code'] | true;
