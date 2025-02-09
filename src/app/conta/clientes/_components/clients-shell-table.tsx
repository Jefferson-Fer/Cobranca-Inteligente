'use client'

import { useCallback, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { TypeClient } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { deleteClientAction } from '@/actions/client/delete-client-action'
import { deleteClientBatchAction } from '@/actions/client/delete-client-batch-action'
import { updateClientAction } from '@/actions/client/update-client-action'
import { DataTable } from '@/components/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-herader'
import { Icons } from '@/components/icons'
import { InputForm } from '@/components/input-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DialogDescription } from '@/components/ui/dialog'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Dialog } from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form } from '@/components/ui/form'
import { LoadingOnButton } from '@/components/ui/loading'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'
import { userStatusText } from '@/config/constant'
import { getBadgeVariantByTypeClient } from '@/config/constant'
import { ClientWithCounts } from '@/contracts/clients'
import { updateClientSchema } from '@/validators/client-validator'
import { UpdateClientSchemaType } from '@/validators/client-validator'

interface ClientsTableShellProps {
  data: ClientWithCounts[]
}

interface SelectedRowType {
  id: string
  enabled: boolean
}

export interface FilterOptions {
  name: string
  status: string | null
}

export function ClientsTableShell({ data }: ClientsTableShellProps) {
  const [selectedRowIds, setSelectedRowIds] = useState<SelectedRowType[]>([])
  const [selectedClient, setSelectedClient] = useState<ClientWithCounts | null>(
    null,
  )
  const [confirmBatchDelete, setConfirmBatchDelete] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

  const { execute, isPending } = useStateAction(updateClientAction, {
    onSuccess: () => {
      toast.success('Cliente atualizado com sucesso')
      reset()
      setIsUpdateDialogOpen(false)
    },

    onError: ({ error }) => {
      toast.error('Erro ao atualizar cliente', {
        description: error.serverError,
      })
      reset()
      setIsUpdateDialogOpen(false)
    },
  })

  const { execute: executeDelete, isPending: isPendingDelete } = useStateAction(
    deleteClientAction,
    {
      onSuccess: () => {
        toast.success('Cliente deletado com sucesso')
        setSelectedClient(null)
      },

      onError: ({ error }) => {
        toast.error('Erro ao deletar cliente', {
          description: error.serverError,
        })
        setSelectedClient(null)
      },
    },
  )

  const { execute: executeDeleteBatch, isPending: isPendingDeleteBatch } =
    useStateAction(deleteClientBatchAction, {
      onSuccess: () => {
        toast.success('Clientes deletados com sucesso')
        setConfirmBatchDelete(false)
      },
      onError: ({ error }) => {
        toast.error('Erro ao deletar clientes', {
          description: error.serverError,
        })
        setConfirmBatchDelete(false)
      },
    })

  const formMethods = useForm<UpdateClientSchemaType>({
    resolver: zodResolver(updateClientSchema),
  })

  const { handleSubmit, setValue, reset } = formMethods

  const onUpdate = useCallback(
    (client: ClientWithCounts) => {
      setValue('email', client.email ?? '')
      setValue('phone', client.phone ?? '')
      setValue('name', client.name ?? '')
      setValue('id', client.id ?? '')

      setIsUpdateDialogOpen(true)
    },
    [setValue],
  )

  const handleDeleteClient = useCallback(() => {
    if (selectedClient) {
      executeDelete({ id: selectedClient.id })
    }
  }, [executeDelete, selectedClient])

  const columns = useMemo<ColumnDef<ClientWithCounts, unknown>[]>(
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
        accessorKey: 'phone',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Telefone" />
        ),
        cell: ({ row }) => {
          const phone = row.original.phone

          return <Text>{phone}</Text>
        },
      },

      {
        accessorKey: 'type',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ cell }) => {
          const type = cell.getValue() as TypeClient

          return (
            <Badge variant={getBadgeVariantByTypeClient[type]}>
              {userStatusText[type]}
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
                    setSelectedClient(row.original)
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
        filterFields={[
          {
            value: 'name',
            label: 'Nome',
            placeholder: 'Buscar por nomes..',
          },
        ]}
        deleteRowsAction={() => setConfirmBatchDelete(true)}
      />

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar cliente</DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Edite as informações do cliente.
          </DialogDescription>
          <Form {...formMethods}>
            <form onSubmit={handleSubmit(execute)} className="grid gap-4">
              <InputForm
                name="name"
                label="Nome"
                type="text"
                placeholder="ex: Jhon"
              />

              <InputForm
                name="email"
                label="E-mail"
                type="email"
                placeholder="meu@email.com"
              />

              <InputForm
                name="phone"
                label="Telefone"
                type="text"
                placeholder="(11) 99999-9999"
              />
              <div className="w-full flex justify-between gap-2">
                <Button
                  type="button"
                  variant={'outline'}
                  onClick={() => setIsUpdateDialogOpen(false)}
                >
                  Cancelar
                </Button>

                <Button type="submit" disabled={isPending}>
                  <LoadingOnButton
                    isLoading={isPending}
                    defaultText="Atualizar"
                    onActionText="Atualizando..."
                  />
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {selectedClient && (
        <ConfirmDialog
          onConfirm={handleDeleteClient}
          open={!!selectedClient}
          onCancel={() => setSelectedClient(null)}
          isLoading={isPendingDelete}
        />
      )}

      <ConfirmDialog
        onConfirm={() =>
          executeDeleteBatch({
            ids: selectedRowIds.map((item) => item.id),
          })
        }
        open={confirmBatchDelete}
        onCancel={() => setConfirmBatchDelete(false)}
        isLoading={isPendingDeleteBatch}
      />
    </>
  )
}
