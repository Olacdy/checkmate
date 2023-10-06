import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { prisma } from '@/lib/db';

import { SchemaType } from '@/schemas/schema-route-schemas';

export const getBaseUrl = () => {
  const vc = process.env.VERCEL_URL;
  if (vc) return 'https://' + vc;
  return 'http://localhost:3000';
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const calculateDocumentScale = (
  percentOfScreenHeightScrolled: number,
  maxPercent: number,
  minPercent: number
) => {
  const gap = 12;
  const multiplier = 10;

  const transformedInput =
    ((Math.min(
      Math.max(percentOfScreenHeightScrolled, minPercent),
      maxPercent
    ) -
      minPercent) *
      maxPercent *
      2) /
    (maxPercent - minPercent);

  const input = Math.max(
    multiplier * Math.abs(Math.cbrt(transformedInput - maxPercent)) - gap,
    0
  );

  const inputMax = multiplier * Math.abs(Math.cbrt(maxPercent)) - gap;

  const outputMax = 100;

  return (input / inputMax) * outputMax;
};

export const formatDate = (
  date: Date | string,
  options?: { includeTime?: boolean }
): string => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  if (typeof date === 'string') {
    date = new Date(date);
  }

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear() % 100;

  let formattedDate = `${day} ${month}. ${year}`;

  if (options?.includeTime) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours and minutes with leading zeros if needed
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    formattedDate = `${formattedHours}:${formattedMinutes}, ${formattedDate}`;
  }

  return formattedDate;
};

export const getManySchemaStat = (schemas: SchemaType[]) => {
  const totalValidations = schemas.reduce((accumulator, schema) => {
    return accumulator + getOneSchemaStat(schema).validations;
  }, 0);

  const totalSuccesses = schemas.reduce((accumulator, schema) => {
    return accumulator + getOneSchemaStat(schema).successes;
  }, 0);

  const totalErros = totalValidations - totalSuccesses;

  return {
    validations: totalValidations,
    successes: totalSuccesses,
    errors: totalErros,
  };
};

export const getOneSchemaStat = (schema: SchemaType) => {
  const validations = schema.validations.length;

  const successes = schema.validations.reduce((accumulator, validation) => {
    return accumulator + (validation.success ? 1 : 0);
  }, 0);

  const errors = schema.validations.reduce((accumulator, validation) => {
    return accumulator + (validation.success ? 0 : 1);
  }, 0);

  return { validations, successes, errors };
};

export const getReferencesComparison = (
  dbData: Awaited<ReturnType<typeof prisma.schemaReference.findMany>>,
  incomingData: Awaited<ReturnType<typeof prisma.schemaReference.findMany>>
) => {
  if (!dbData)
    return {
      referencesToAdd: incomingData,
      referencesToUpdate: [],
      referencesToDelete: [],
    };

  if (!incomingData)
    return {
      referencesToAdd: [],
      referencesToUpdate: [],
      referencesToDelete: dbData,
    };

  const referringIdsDb = dbData.map((item) => item.referringId);
  const referringIdsIncoming = incomingData.map((item) => item.referringId);

  const referencesToAdd = incomingData.filter(
    (item) => !referringIdsDb.includes(item.referringId)
  );
  const referencesToUpdate = incomingData.filter((item) =>
    referringIdsDb.includes(item.referringId)
  );
  const referencesToDelete = dbData.filter(
    (item) => !referringIdsIncoming.includes(item.referringId)
  );

  return {
    referencesToAdd,
    referencesToUpdate,
    referencesToDelete,
  };
};
