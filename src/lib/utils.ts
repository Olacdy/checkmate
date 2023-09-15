import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type Schema } from '@prisma/client';

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

export const formatDate = (date: Date | string): string => {
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

  const newDate = new Date(date);

  const day = newDate.getDate();
  const month = months[newDate.getMonth() - 1];
  const year = newDate.getFullYear() % 100;

  return `${day} ${month}. ${year}`;
};

export const getSchemasStats = (schemas: Schema[]) => {
  const totalValidations = schemas.reduce((accumulator, schema) => {
    return accumulator + schema.successes + schema.errors;
  }, 0);

  const totalSuccesses = schemas.reduce((accumulator, schema) => {
    return accumulator + schema.successes;
  }, 0);

  const totalErros = totalValidations - totalSuccesses;

  return {
    validations: totalValidations,
    successes: totalSuccesses,
    errors: totalErros,
  };
};
