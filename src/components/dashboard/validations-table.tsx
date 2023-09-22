'use client';

import { FC } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { formatDate } from '@/lib/utils';

import { ValidationType } from '@/schemas/schema-route-schemas';

type ValidationsTableProps = {
  type: 'single' | 'multiple';
  display?: 'all' | 'success' | 'error';
  validations: ValidationType[];
};

const captions = {
  all: 'Most recent validations.',
  success: 'Most recent successful validations',
  error: 'Most recent failed validations',
};

const ValidationsTable: FC<ValidationsTableProps> = ({
  type,
  display = 'all',
  validations,
}) => {
  return (
    <Table>
      <TableCaption>{captions[display]}</TableCaption>
      <TableHeader>
        <TableRow>
          {type === 'multiple' && <TableHead>Schema</TableHead>}
          <TableHead className='w-[160px]'>Id</TableHead>
          <TableHead className='hidden md:table-cell'>Created At</TableHead>
          <TableHead className='text-right lg:text-center'>Status</TableHead>
          <TableHead className='hidden text-right lg:table-cell'>
            Data
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {validations.map((validation) => {
          if (display === 'success' && !validation.success) return null;
          if (display === 'error' && validation.success) return null;

          return (
            <TableRow key={validation.id}>
              {type === 'multiple' && (
                <TableCell>
                  <Link href={`/dashboard/schema/${validation.schemaId}`}>
                    <Button variant='link'>{validation.schema.name}</Button>
                  </Link>
                </TableCell>
              )}
              <TableCell className='font-medium'>{validation.id}</TableCell>
              <TableCell className='hidden md:table-cell'>
                {formatDate(validation.createdAt)}
              </TableCell>
              <TableCell className='text-right lg:text-center'>
                {validation.success}
              </TableCell>
              <TableCell className='hidden text-right lg:table-cell'>
                <Link href={`/validation/${validation.id}`}>
                  <Button variant='link'>Review</Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ValidationsTable;
