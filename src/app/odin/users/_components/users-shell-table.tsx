'use client'

import { useMemo } from 'react'
import { useState } from 'react'

import { TypeProfile } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'
import {
  getBadgeVariantByTypeProfile,
  statusTypeProfileText,
} from '@/config/constant'
import { ProfileWithUser } from '@/contracts/profile'

interface SelectedRowType {
  id: string
  enabled: boolean
}

interface UsersTableShellProps {
  data: ProfileWithUser[]
  pageCount: number
}

export function UsersShellTable({ data, pageCount }: UsersTableShellProps) {
  const [selectedRowIds, setSelectedRowIds] = useState<SelectedRowType[]>([])

  const onUpdate = (profile: ProfileWithUser) => {
    console.log(profile)
    console.log(selectedRowIds)
  }

  const columns = useMemo<ColumnDef<ProfileWithUser, unknown>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length
                  ? []
                  : data.map((row) => {
                      return {
                        enabled: true,
                        id: row.id,
                      }
                    }),
              )
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedRowIds((prev) =>
                value
                  ? [
                      ...prev,
                      {
                        id: row.original.id,
                        enabled: true,
                      },
                    ]
                  : prev.filter((item) => item.id !== row.original.id),
              )
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nome" />
        ),
        cell: ({ row }) => {
          const { name } = row.original

          return <Text>{name}</Text>
        },
      },
      {
        accessorKey: 'lastName',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Sobrenome" />
        ),
        cell: ({ row }) => {
          const { lastName } = row.original

          return <Text>{lastName}</Text>
        },
      },
      {
        accessorKey: 'type',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ cell }) => {
          const status = cell.getValue() as TypeProfile

          return (
            <Badge variant={getBadgeVariantByTypeProfile[status]}>
              {statusTypeProfileText[status]}
            </Badge>
          )
        },
      },

      {
        id: 'actions',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Ações" />
        ),
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <Icons.settingsHorizontal
                  className="size-4"
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem asChild>
                <Button
                  className="w-full justify-start"
                  variant={'link'}
                  onClick={() => onUpdate(row.original)}
                >
                  <Icons.edit className="mr-2 size-4" aria-hidden="true" />
                  Editar
                </Button>
              </DropdownMenuItem>

              <Separator />
              <DropdownMenuItem asChild>
                <Button
                  variant={'destructiveLink'}
                  onClick={() => {
                    //setSelectedClient(row.original)
                    row.toggleSelected(false)
                  }}
                  className="w-full justify-start"
                >
                  <Icons.trash className="mr-2 size-4" aria-hidden="true" />{' '}
                  Deletar
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  )
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        pageCount={pageCount}
        filterFields={[
          {
            value: 'name',
            label: 'Nome',
            placeholder: 'Buscar por nomes..',
          },
        ]}
      />
    </>
  )
}
