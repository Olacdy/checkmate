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

import { ValidationType } from '@/schemas/schemas-schema';

type ValidationsTableProps = {
  type: 'single' | 'multiple';
  display?: 'all' | 'success' | 'error';
  validations: ValidationType[];
};

const ValidationsTable: FC<ValidationsTableProps> = ({
  type,
  display = 'all',
  validations,
}) => {
  return (
    <Table>
      <TableCaption>Most recent validations.</TableCaption>
      <TableHeader>
        <TableRow>
          {type === 'multiple' && <TableHead>Schema</TableHead>}
          <TableHead className='w-[100px]'>Id</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className='text-right'>Data</TableHead>
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
              <TableCell>{formatDate(validation.createdAt)}</TableCell>
              <TableCell>{validation.success}</TableCell>
              <TableCell className='text-right'>
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
