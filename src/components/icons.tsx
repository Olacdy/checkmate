import { cn } from '@/lib/utils';
import {
  ArrowUpDown,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CloudCog,
  CopyPlus,
  GripVertical,
  LogOut,
  Moon,
  MoreHorizontal,
  Search,
  Sliders,
  Sun,
  Trash2,
  X,
  XCircle,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  sun: Sun,
  moon: Moon,
  settings: Sliders,
  delete: Trash2,
  drag: GripVertical,
  add: CopyPlus,
  check: Check,
  close: X,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  logout: LogOut,
  success: CheckCircle,
  error: XCircle,
  validation: CloudCog,
  more: MoreHorizontal,
  review: Search,
  sort: ArrowUpDown,
  calendar: Calendar,
  menu: ({ ...props }: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox='0 0 50 50'
      fill='current'
      className={cn('', props.className)}>
      <path d='M5 8a2 2 0 1 0 0 4h40a2 2 0 1 0 0-4H5zm0 15a2 2 0 1 0 0 4h40a2 2 0 1 0 0-4H5zm0 15a2 2 0 1 0 0 4h40a2 2 0 1 0 0-4H5z' />
    </svg>
  ),
  copy: ({ ...props }: LucideProps) => (
    <svg
      viewBox='0 0 18 19'
      fill='current'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('', props.className)}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.875 8.86a2.292 2.292 0 0 1 2.292-2.292h7.5a2.292 2.292 0 0 1 2.291 2.291v7.5a2.292 2.292 0 0 1-2.291 2.292h-7.5a2.292 2.292 0 0 1-2.292-2.292v-7.5Zm2.292-1.042c-.576 0-1.042.466-1.042 1.041v7.5c0 .576.466 1.042 1.042 1.042h7.5c.575 0 1.041-.466 1.041-1.042v-7.5a1.04 1.04 0 0 0-1.041-1.041h-7.5Z'
        fill='current'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2.335 1.984c-.277 0-.542.11-.737.305m0 0c-.195.196-.305.46-.305.737v7.5a1.042 1.042 0 0 0 1.042 1.042h.833a.625.625 0 1 1 0 1.25h-.833a2.292 2.292 0 0 1-2.292-2.292v-7.5A2.292 2.292 0 0 1 2.335.734h7.5a2.292 2.292 0 0 1 2.291 2.292v.833a.625.625 0 1 1-1.25 0v-.833a1.041 1.041 0 0 0-1.041-1.042h-7.5'
        fill='current'
      />
    </svg>
  ),
  gear: ({ ...props }: LucideProps) => (
    <svg
      height='512'
      viewBox='0 0 512 512'
      width='512'
      fill='current'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('', props.className)}>
      <path d='M424.5 216.5h-15.2c-12.4 0-22.8-10.7-22.8-23.4 0-6.4 2.7-12.2 7.5-16.5l9.8-9.6c9.7-9.6 9.7-25.3 0-34.9L381.5 110c-4.4-4.4-10.9-7-17.5-7s-13 2.6-17.5 7l-9.4 9.4c-4.5 5-10.5 7.7-17 7.7-12.8 0-23.5-10.4-23.5-22.7V89.1c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6 0-24.4 11.5-24.4 25.1v15.2c0 12.3-10.7 22.7-23.5 22.7-6.4 0-12.3-2.7-16.6-7.4l-9.7-9.6c-4.4-4.5-10.9-7-17.5-7s-13 2.6-17.5 7L110 132c-9.6 9.6-9.6 25.3 0 34.8l9.4 9.4c5 4.5 7.8 10.5 7.8 16.9 0 12.8-10.4 23.4-22.8 23.4H89.2c-13.7 0-25.2 10.7-25.2 24.3v30.4c0 13.5 11.5 24.3 25.2 24.3h15.2c12.4 0 22.8 10.7 22.8 23.4 0 6.4-2.8 12.4-7.8 16.9l-9.4 9.3c-9.6 9.6-9.6 25.3 0 34.8l22.3 22.2c4.4 4.5 10.9 7 17.5 7s13-2.6 17.5-7l9.7-9.6c4.2-4.7 10.2-7.4 16.6-7.4 12.8 0 23.5 10.4 23.5 22.7V423c0 13.5 10.8 25.1 24.5 25.1H272c13.6 0 24.4-11.5 24.4-25.1v-15.2c0-12.3 10.7-22.7 23.5-22.7 6.4 0 12.4 2.8 17 7.7l9.4 9.4c4.5 4.4 10.9 7 17.5 7s13-2.6 17.5-7l22.3-22.2c9.6-9.6 9.6-25.3 0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5 0-12.8 10.4-23.4 22.8-23.4h15.2c13.6 0 23.3-10.7 23.3-24.3v-30.5c.2-13.6-9.5-24.3-23.1-24.3zM336.8 256c0 44.1-35.7 80-80 80s-80-35.9-80-80 35.7-80 80-80 80 35.9 80 80z' />
    </svg>
  ),
  document: ({ ...props }: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox='0 0 50 50'
      fill='current'
      className={cn('', props.className)}>
      <path d='M30.398 2H7v46h36V14.602ZM15 28h16v2H15Zm20 8H15v-2h20Zm0-12H15v-2h20Zm-5-9V4.398L40.602 15Z' />
    </svg>
  ),
  question: ({ ...props }: LucideProps) => (
    <svg
      height='800'
      width='800'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 29.536 29.536'
      fill='current'
      className={cn('', props.className)}>
      <path d='M14.768 0C6.611 0 0 6.609 0 14.768c0 8.155 6.611 14.767 14.768 14.767s14.768-6.612 14.768-14.767C29.535 6.609 22.924 0 14.768 0zm0 27.126c-6.828 0-12.361-5.532-12.361-12.359 0-6.828 5.533-12.362 12.361-12.362 6.826 0 12.359 5.535 12.359 12.362s-5.533 12.359-12.359 12.359z' />
      <path d='M14.385 19.337c-1.338 0-2.289.951-2.289 2.34 0 1.336.926 2.339 2.289 2.339 1.414 0 2.314-1.003 2.314-2.339-.027-1.389-.928-2.34-2.314-2.34zm.357-13.245c-1.824 0-3.34.513-4.293 1.053l.875 2.804c.668-.462 1.697-.772 2.545-.772 1.285.027 1.879.644 1.879 1.543 0 .85-.67 1.697-1.494 2.701-1.156 1.364-1.594 2.701-1.516 4.012l.025.669h3.42v-.463c-.025-1.158.387-2.162 1.311-3.215.979-1.08 2.211-2.366 2.211-4.321 0-2.135-1.566-4.011-4.963-4.011z' />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  ),
  linkedin: ({ ...props }: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox='0 0 50 50'
      fill='current'
      className={cn('', props.className)}>
      <path d='M41 4H9C6.24 4 4 6.24 4 9v32c0 2.76 2.24 5 5 5h32c2.76 0 5-2.24 5-5V9c0-2.76-2.24-5-5-5zM17 20v19h-6V20h6zm-6-5.53c0-1.4 1.2-2.47 3-2.47s2.93 1.07 3 2.47c0 1.4-1.12 2.53-3 2.53-1.8 0-3-1.13-3-2.53zM39 39h-6V29c0-2-1-4-3.5-4.04h-.08C27 24.96 26 27.02 26 29v10h-6V20h6v2.56S27.93 20 31.81 20c3.97 0 7.19 2.73 7.19 8.26V39z' />
    </svg>
  ),
  twitter: ({ ...props }: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox='0 0 50 50'
      fill='current'
      className={cn('', props.className)}>
      <path d='M11 4a7 7 0 0 0-7 7v28a7 7 0 0 0 7 7h28a7 7 0 0 0 7-7V11a7 7 0 0 0-7-7H11zm2.086 9h7.937l5.637 8.01L33.5 13H36l-8.21 9.613L37.913 37H29.98l-6.541-9.293L15.5 37H13l9.309-10.896L13.086 13zm3.828 2 14.107 20h3.065L19.979 15h-3.065z' />
    </svg>
  ),
  github: ({ ...props }: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox='0 0 64 64'
      fill='current'
      className={cn('', props.className)}>
      <path d='M32 10c12.15 0 22 9.85 22 22 0 9.768-6.369 18.045-15.179 20.916l.006-.021s-1.485-.696-1.453-1.938c.035-1.367 0-4.556 0-5.727 0-2.01-1.272-3.434-1.272-3.434s9.977.112 9.977-10.533c0-4.107-2.147-6.245-2.147-6.245s1.128-4.385-.39-6.245c-1.701-.184-4.749 1.626-6.05 2.472 0 0-2.062-.846-5.492-.846s-5.492.846-5.492.846c-1.301-.846-4.348-2.656-6.05-2.472-1.518 1.86-.39 6.245-.39 6.245s-2.147 2.137-2.147 6.245c0 10.645 9.977 10.533 9.977 10.533s-1.005 1.136-1.225 2.806c-.696.236-1.721.528-2.549.528-2.165 0-3.812-2.105-4.416-3.078-.595-.96-1.815-1.766-2.953-1.766-.749 0-1.115.375-1.115.803s1.05.727 1.743 1.521c1.461 1.674 1.435 5.438 6.641 5.438.565 0 1.719-.139 2.588-.256-.005 1.185-.007 2.436.012 3.167.031 1.242-1.453 1.938-1.453 1.938l.006.021C16.369 50.045 10 41.768 10 32c0-12.15 9.85-22 22-22z' />
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden='true'
      focusable='false'
      data-prefix='fab'
      data-icon='google'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 488 512'
      fill='current'
      className={cn('', props.className)}>
      <path
        fill='current'
        d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'></path>
    </svg>
  ),
  dashboard: ({ ...props }: LucideProps) => (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='current'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('', props.className)}>
      <g
        clipPath='url(#a)'
        stroke='current'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path d='M13 6.5H9a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5Zm0-6H9a.5.5 0 0 0-.5.5v2.01a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V1a.5.5 0 0 0-.5-.5Zm-8 0H1a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V1A.5.5 0 0 0 5 .5Zm0 9.99H1a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-2.01a.5.5 0 0 0-.5-.5Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='current' d='M0 0h14v14H0z' />
        </clipPath>
      </defs>
    </svg>
  ),
  schemas: ({ ...props }: LucideProps) => (
    <svg
      width='15'
      height='14'
      viewBox='0 0 15 14'
      fill='current'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('', props.className)}>
      <path
        d='M9.5 2.5h-6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1ZM4.5 5h4m-4 2.5h4m-4 2.5h2'
        stroke='current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5 .5h6.5a1 1 0 0 1 1 1V11'
        stroke='current'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
};
