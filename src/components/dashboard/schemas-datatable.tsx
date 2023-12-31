'use client';

import { FC, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { getQueryKey } from '@trpc/react-query';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components//ui/dropdown-menu';
import { Input } from '@/components//ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Icons } from '@/components/icons';

import DeleteSchemaDialog from '@/components/dashboard/delete-schema-dialog';
import MoreSchemasActions from '@/components/dashboard/more-schemas-actions';

import { trpc } from '@/trpc/client';

import { cn, formatDate, getBaseUrl, getOneSchemaStat } from '@/lib/utils';

import { SchemaType } from '@/schemas/schema-route-schemas';

export const columns: ColumnDef<SchemaType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <Icons.sort className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='pl-4 text-left capitalize'>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          className='hidden lg:flex'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Created At
          <Icons.sort className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = formatDate(row.original.createdAt);

      return (
        <div className='hidden pl-6 text-left font-medium lg:flex'>
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: 'validations',
    header: () => <div className='hidden text-right xs:block'>Validations</div>,
    cell: ({ row }) => {
      const { validations } = getOneSchemaStat(row.original);

      return (
        <div className='hidden text-right font-medium xs:block'>
          {validations}
        </div>
      );
    },
  },
  {
    accessorKey: 'successes',
    header: () => <div className='hidden text-right sm:block'>Successes</div>,
    cell: ({ row }) => {
      const { successes } = getOneSchemaStat(row.original);

      return (
        <div className='hidden text-right font-medium sm:block'>
          {successes}
        </div>
      );
    },
  },
  {
    accessorKey: 'errors',
    header: () => <div className='hidden text-right sm:block'>Errors</div>,
    cell: ({ row }) => {
      const { errors } = getOneSchemaStat(row.original);

      return (
        <div className='hidden text-right font-medium sm:block'>{errors}</div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
  },
];

type SchemasDataTableProps = {
  initialSchemas: SchemaType[];
};

const SchemasDataTable: FC<SchemasDataTableProps> = ({ initialSchemas }) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const getSchemas = trpc.schema.getSchemas.useQuery(undefined, {
    initialData: initialSchemas,
  });

  const data = getSchemas.data;

  const deleteSchema = trpc.schema.deleteSchema.useMutation({
    onSettled: () => {
      getSchemas.refetch();
      queryClient.invalidateQueries(getQueryKey(trpc.schema.getSchemasCount));
    },
  });

  const handleReview = (schemaId: string) => {
    router.push(`/dashboard/schema/${schemaId}`);
  };

  const handleCopy = (schemaId: string) => {
    toast('Link copied to a clipboard.');

    const baseUrl = getBaseUrl();

    navigator.clipboard.writeText(`${baseUrl}/api/v1/${schemaId}`);
  };

  const handleDelete = (schemaId: string) => {
    deleteSchema.mutate({ id: schemaId });

    toast.success('Schema successfully deleted.');
  };

  const handleDeleteMultiple = () => {
    selectedSchemaIds.forEach((selectedSchemaId) => {
      deleteSchema.mutate({ id: selectedSchemaId });
    });

    if (selectedSchemaIds.length > 0)
      toast.success(
        `${selectedSchemaIds.length} ${
          selectedSchemaIds.length > 1 ? 'schemas' : 'schema'
        } deleted`
      );
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedSchemaIds, setSelectedSchemaIds] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  const selectedActions = [
    {
      name: 'delete',
      icon: 'delete',
      style: 'text-error focus:bg-error/40 dark:focus:bg-error/40',
      onSelect: (selectedSchemas: SchemaType[]) => {
        setSelectedSchemaIds(
          selectedSchemas.map((selectedSchema) => selectedSchema.id)
        );
      },
    },
  ] satisfies {
    name: string;
    icon: keyof typeof Icons;
    style: string;
    onSelect: (selectedSchemas: SchemaType[]) => void;
  }[];

  return (
    <div className='flex flex-1 flex-col gap-3'>
      <div className='flex items-center justify-between gap-5'>
        <div className='flex flex-1 items-center gap-4'>
          <Input
            placeholder='Filter schemas by name...'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className='max-w-xs text-oxford-blue-dark dark:text-oxford-blue-dark'
          />
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='dark:bg-slate-100 dark:text-oxford-blue-dark dark:hover:bg-slate-200 dark:hover:text-oxford-blue-dark'>
                  Actions <Icons.chevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' className='w-32'>
                {selectedActions.map((action) => {
                  const Icon = Icons[action.icon];

                  if (action.name === 'delete') {
                    return (
                      <DialogTrigger key={action.name} asChild>
                        <DropdownMenuItem
                          className={cn(
                            'flex items-center justify-between capitalize',
                            action.style
                          )}
                          onSelect={() =>
                            action.onSelect(
                              table
                                .getFilteredSelectedRowModel()
                                .rows.map((row) => row.original)
                            )
                          }>
                          <span>{action.name}</span>
                          <Icon className='h-4 w-4' />
                        </DropdownMenuItem>
                      </DialogTrigger>
                    );
                  }

                  return (
                    <DropdownMenuItem
                      key={action.name}
                      className={cn(
                        'flex items-center justify-between capitalize',
                        action.style
                      )}
                      onSelect={() =>
                        action.onSelect(
                          table
                            .getFilteredSelectedRowModel()
                            .rows.map((row) => row.original)
                        )
                      }>
                      <span>{action.name}</span>
                      <Icon className='h-4 w-4' />
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <DeleteSchemaDialog
              type='multiple'
              handleDelete={handleDeleteMultiple}
              closeDialog={() => setDeleteDialogOpen(false)}
            />
          </Dialog>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='hidden dark:bg-slate-100 dark:text-oxford-blue-dark dark:hover:bg-slate-200 dark:hover:text-oxford-blue-dark xs:flex'>
              Columns <Icons.chevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className={cn('capitalize', {
                      'hidden lg:flex': column.id === 'createdAt',
                      'hidden sm:flex':
                        column.id === 'successes' || column.id === 'errors',
                      'hidden xs:flex': column.id === 'validations',
                    })}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex-1 rounded-md border border-oxford-blue/30 dark:border-slate-600/30'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className='border-oxford-blue/30 dark:border-slate-600/30'
                key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='[&:has([role=checkbox])]:pl-3'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className='border-oxford-blue/30 dark:border-slate-600/30'
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => {
                    let content = flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    );

                    if (cell.id.includes('actions')) {
                      content = flexRender(
                        <div className='flex w-full items-center justify-center'>
                          <MoreSchemasActions
                            handleReview={() => handleReview(row.original.id)}
                            handleCopy={() => handleCopy(row.original.id)}
                            handleDelete={() => handleDelete(row.original.id)}
                          />
                        </div>,
                        cell.getContext()
                      );
                    }

                    return (
                      <TableCell
                        key={cell.id}
                        className='[&:has([role=checkbox])]:pl-3'>
                        {content}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-[34rem] text-center'>
                  No schemas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 pt-4'>
        <div className='flex-1 text-sm'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchemasDataTable;
