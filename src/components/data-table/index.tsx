'use client'

import * as React from 'react'

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTableFilterField } from '@/contracts/commons'
import { cn } from '@/lib/utils'

import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { useSidebar } from '../ui/sidebar'
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number
  filterFields?: DataTableFilterField<TData>[]
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  filterFields = [],
  deleteRowsAction,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const { isMobile, state } = useSidebar()

  return (
    <div
      className={cn(
        'w-[91vmin] sm:w-[95vmax] md:w-[calc(95vw-var(--sidebar-width))] xl:w-full space-y-3 overflow-auto transition-all duration-300',
        !isMobile &&
          state === 'collapsed' &&
          'md:w-[calc(95vw-var(--sidebar-width-icon))] lg:w-full',
        !isMobile &&
          state === 'expanded' &&
          'lg:w-[calc(97vw-var(--sidebar-width))]',
      )}
    >
      <DataTableToolbar
        table={table}
        deleteRowsAction={deleteRowsAction}
        filterFields={filterFields}
      />
      <div className="rounded-md border bg-background overflow-hidden">
        <ScrollArea className="w-full">
          <Table className="w-max lg:w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" className="h-2.5 peer" />
        </ScrollArea>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
