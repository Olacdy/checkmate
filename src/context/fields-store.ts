import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { FieldType } from '@/schemas/fields-schemas';

type FieldsStateType = {
  fields: FieldType[];
  setFields: (fields: FieldType[]) => void;
};

export const useFieldsStore = create<FieldsStateType>()(
  devtools(
    persist(
      (set) => ({
        fields: [],
        setFields: (fields: FieldType[]) =>
          set((state) => ({
            fields: fields,
          })),
      }),
      {
        name: 'field-storage',
      }
    )
  )
);
