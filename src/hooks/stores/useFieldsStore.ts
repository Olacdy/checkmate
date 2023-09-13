import { create } from 'zustand';

import { FieldType } from '../../schemas/fields-schemas';

type FieldsStateType = {
  fields: FieldType[];
  isUniqueField: (fieldName: string) => boolean;
  addField: (field: FieldType) => void;
  removeField: (fieldName: string) => void;
  setFields: (fields: FieldType[]) => void;
};

export const useFieldStore = create<FieldsStateType>((set, get) => ({
  fields: [],
  isUniqueField: (fieldName: string) => {
    return !get().fields.some((field) => field.name === fieldName);
  },
  addField: (field: FieldType) => {
    set((state) => ({
      fields: [...state.fields, field],
    }));
  },
  removeField: (fieldName: string) => {
    set((state) => ({
      fields: state.fields.filter((field) => field.name !== fieldName),
    }));
  },
  setFields: (fields: FieldType[]) => {
    set((state) => ({
      fields: fields,
    }));
  },
}));
