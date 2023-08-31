import { Moon, Sun, type LucideIcon, type LucideProps } from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  sun: Sun,
  moon: Moon,
  copy: ({ ...props }: LucideProps) => (
    <svg viewBox='0 0 18 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M5.875 8.86a2.292 2.292 0 0 1 2.292-2.292h7.5a2.292 2.292 0 0 1 2.291 2.291v7.5a2.292 2.292 0 0 1-2.291 2.292h-7.5a2.292 2.292 0 0 1-2.292-2.292v-7.5Zm2.292-1.042c-.576 0-1.042.466-1.042 1.041v7.5c0 .576.466 1.042 1.042 1.042h7.5c.575 0 1.041-.466 1.041-1.042v-7.5a1.04 1.04 0 0 0-1.041-1.041h-7.5Z'
        fill='currentColor'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M2.335 1.984c-.277 0-.542.11-.737.305m0 0c-.195.196-.305.46-.305.737v7.5a1.042 1.042 0 0 0 1.042 1.042h.833a.625.625 0 1 1 0 1.25h-.833a2.292 2.292 0 0 1-2.292-2.292v-7.5A2.292 2.292 0 0 1 2.335.734h7.5a2.292 2.292 0 0 1 2.291 2.292v.833a.625.625 0 1 1-1.25 0v-.833a1.041 1.041 0 0 0-1.041-1.042h-7.5'
        fill='currentColor'
      />
    </svg>
  ),
};
