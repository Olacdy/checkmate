import { Icons } from '@/components/icons';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDocumentScale(
  percentOfScreenHeightScrolled: number,
  maxPercent: number,
  minPercent: number
) {
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
}

export function getIconByName(iconName: keyof typeof Icons) {
  return Icons[iconName];
}

export function formatDate(date: Date): string {
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

  const day = date.getDate();
  const month = months[date.getMonth() - 1];
  const year = date.getFullYear() % 100;

  return `${day} ${month}. ${year}`;
}
