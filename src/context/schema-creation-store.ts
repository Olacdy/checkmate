import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { FieldType } from '@/schemas/fields-schemas';

type SchemaCreationStoreType = {
  name: string;
  fields: FieldType[];
  setName: (name: string) => void;
  setFields: (fields: FieldType[]) => void;
  resetSchema: () => void;
};

export const useSchemaCreationStore = create<SchemaCreationStoreType>()(
  devtools(
    persist(
      (set) => ({
        name: '',
        fields: [],
        setName: (name: string) =>
          set((state) => ({
            name: name,
          })),
        setFields: (fields: FieldType[]) =>
          set((state) => ({
            fields: fields,
          })),
        resetSchema: () => set((state) => ({ name: '', fields: [] })),
      }),
      {
        name: 'schema-creation-storage',
      }
    )
  )
);
