import FieldDialogType from '@/components/dashboard/create-schema/field-dialogs';
import DateFieldDialog from '@/components/dashboard/create-schema/field-dialogs/date-field-dialog';
import NumberFieldDialog from '@/components/dashboard/create-schema/field-dialogs/number-field-dialog';
import SchemaFieldDialog from '@/components/dashboard/create-schema/field-dialogs/schema-field-dialog';
import StringFieldDialog from '@/components/dashboard/create-schema/field-dialogs/string-field-dialog';

import { Icons } from '@/components/icons';

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

export const fields = [
  {
    name: 'string',
    icon: 'string',
    type: 'string',
    dialog: StringFieldDialog,
  },
  {
    name: 'number',
    icon: 'number',
    type: 'number',
    dialog: NumberFieldDialog,
  },
  {
    name: 'date',
    icon: 'calendar',
    type: 'date',
    dialog: DateFieldDialog,
  },
  {
    name: 'schema',
    icon: 'schema',
    type: 'schema',
    dialog: SchemaFieldDialog,
  },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
  type: string;
  dialog: FieldDialogType;
}[];
