import { Icons } from '@/components/icons';
import { type Schema } from '@prisma/client';

export const about = [
  {
    title: 'Elevate Data Validation Effortlessly',
    content:
      'Discover CheckMate, your ultimate SaaS solution for streamlined user data validation using defined schemas through a user-friendly UI, coupled with seamless JSON data validation against designated endpoints.',
  },
  {
    title: 'Rapid Endpoint Validation',
    content:
      'Experience rapid JSON data validation against specified endpoints. CheckMate ensures that data meets your requirements, enabling seamless integration with external services.',
  },
  {
    title: 'Enhanced Data Integrity',
    content:
      'Ensure data integrity by validating user information with precision. CheckMate guarantees that your user data aligns with your specifications, safeguarding the quality of your information.',
  },
  {
    title: 'Effortless Data Validation',
    content:
      'With CheckMate, validating user data against predefined schemas becomes a breeze. Utilize our intuitive UI tool to effortlessly define data structures, ensuring accuracy and consistency.',
  },
  {
    title: 'Immediate Issue Detection',
    content:
      "Stay ahead of discrepancies with instant notifications from CheckMate. The moment data mismatches or issues arise, you'll be alerted for swift resolution.",
  },
  {
    title: 'Efficient UI-Driven Workflow',
    content:
      'Craft, modify, and optimize data schemas using an intuitive UI interface. CheckMate simplifies schema creation, eliminating complexity and reducing the learning curve.',
  },
];

export const sections = [
  {
    title: 'Home',
    id: 'home',
  },
  {
    title: 'Product',
    id: 'product',
  },
  {
    title: 'About',
    id: 'about',
  },
  {
    title: 'Contact',
    id: 'contact',
  },
];

export const oauthProviders = [
  { name: 'google' },
  { name: 'github' },
] satisfies {
  name: keyof typeof Icons;
}[];

export const sideBarButtons = [
  {
    name: 'dashboard',
    path: '/dashboard',
    text: 'Dashboard',
    icon: 'dashboard',
  },
  {
    name: 'schemas',
    path: '/dashboard/schemas',
    text: 'Schemas',
    icon: 'schemas',
  },
] satisfies {
  name: string;
  path: string;
  text: string;
  icon: keyof typeof Icons;
}[];

// TODO: Delete later
export const featuredSchemas = [
  {
    id: '978a594f-592b-4403-95ce-95a630dc8ee1',
    name: 'Schema 1',
    createdAt: new Date(2023, 8, 20),
    successes: 100,
    errors: 10,
  },
  {
    id: '0562cd58-53dd-4190-82df-dba2bf8d8bb9',
    name: 'Schema 2',
    createdAt: new Date(2023, 8, 23),
    successes: 30,
    errors: 3,
  },
  {
    id: '8d10b7b9-5300-4a0e-8133-0fa024d20bb4',
    name: 'Schema 3',
    createdAt: new Date(2023, 8, 27),
    successes: 20,
    errors: 1,
  },
] as Schema[];
