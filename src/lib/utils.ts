import { Icons } from '@/components/Icons';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDocumentScale(percentOfScreenHeightScrolled: number) {
  const maxPercent = 50;
  const gap = 12;
  const multiplier = 10;

  const input = Math.max(
    multiplier *
      Math.abs(
        Math.cbrt(
          Math.min(
            percentOfScreenHeightScrolled - maxPercent / 2,
            maxPercent / 2
          )
        )
      ) -
      gap,
    0
  );

  const inputMax = multiplier * Math.abs(Math.cbrt(maxPercent / 2)) - gap;

  const outputMax = 100;

  return (input / inputMax) * outputMax;
}

export function getIconByName(iconName: keyof typeof Icons) {
  return Icons[iconName];
}
