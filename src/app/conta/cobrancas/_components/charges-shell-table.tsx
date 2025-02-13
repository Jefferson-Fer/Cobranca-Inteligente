'use client'

import { useCallback, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import NumberFlow from '@number-flow/react'
import { StatusCharge } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { deleteChargeAction } from '@/actions/charge/delete-charge-action'
import { deleteChargeBatchAction } from '@/actions/charge/delte-charge-batch-action'
import { updateChargeAction } from '@/actions/charge/update-charge-action'
import { updateChargeReceiveAction } from '@/actions/charge/update-charge-receive-action'
import { DataTable } from '@/components/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Icons } from '@/components/icons'
import { InputForm } from '@/components/input-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DatePickerSingle } from '@/components/ui/date-picker-single'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import InputCurrency from '@/components/ui/input-currency'
import { LoadingOnButton } from '@/components/ui/loading'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetDescription,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Text } from '@/components/ui/text'
import { Textarea } from '@/components/ui/textarea'
import {
  getBadgeVariantByStatusCharge,
  statusChargeOptions,
  statusChargeText,
} from '@/config/constant'
import { ChargeWithCounts } from '@/contracts/charges'
import { formatDate, formatMoney } from '@/lib/utils'
import {
  ReceiveChargeSchemaType,
  receiveChargeSchema,
} from '@/validators/charge-validator'

import { ChargeDetailsPaidSheet } from './charge-details-paid-sheet'
interface ChargesTableShellProps {
  data: ChargeWithCounts[]
  pageCount: number
}

interface SelectedRowType {
  id: string
  enabled: boolean
}

export interface FilterOptions {
  name: string
  status: string | null
}

export function ChargesTableShell({ data, pageCount }: ChargesTableShellProps) {
  const [selectedRowIds, setSelectedRowIds] = useState<SelectedRowType[]>([])
  const [selectedCharge, setSelectedCharge] = useState<ChargeWithCounts | null>(
    null,
  )
  const [isDeleteItem, setIsDeleteItem] = useState(false)
  const [confirmBatchDelete, setConfirmBatchDelete] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isReceiveDialogOpen, setIsReceiveDialogOpen] = useState(false)
  const [openChargeDetailsPaidSheet, setOpenChargeDetailsPaidSheet] =
    useState(false)

  const { execute, isPending } = useStateAction(updateChargeAction, {
    onSuccess: () => {
      toast.success('Cobrança atualizada com sucesso')
      reset()
      setIsUpdateDialogOpen(false)
    },

    onError: ({ error }) => {
      toast.error('Erro ao atualizar cobrança', {
        description: error.serverError,
      })
      reset()
      setIsUpdateDialogOpen(false)
    },
  })

  const { execute: executeReceive, isPending: isPendingReceive } =
    useStateAction(updateChargeReceiveAction, {
      onSuccess: () => {
        toast.success('Cobrança recebida com sucesso')
      },

      onError: ({ error }) => {
        toast.error('Erro ao receber cobrança', {
          description: error.serverError,
        })
      },
    })
  const { execute: executeDelete, isPending: isPendingDelete } = useStateAction(
    deleteChargeAction,
    {
      onSuccess: () => {
        toast.success('Cobrança deletada com sucesso')
        setSelectedCharge(null)
      },

      onError: ({ error }) => {
        toast.error('Erro ao deletar cobrança', {
          description: error.serverError,
        })
        setSelectedCharge(null)
      },
    },
  )

  const { execute: executeDeleteBatch, isPending: isPendingDeleteBatch } =
    useStateAction(deleteChargeBatchAction, {
      onSuccess: () => {
        toast.success('Cobranças deletadas com sucesso')
        setConfirmBatchDelete(false)
      },
      onError: ({ error }) => {
        toast.error('Erro ao deletar clientes', {
          description: error.serverError,
        })
        setConfirmBatchDelete(false)
      },
    })

  const formMethods = useForm<ReceiveChargeSchemaType>({
    resolver: zodResolver(receiveChargeSchema),
  })

  const {
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = formMethods

  const onUpdate = useCallback(
    (charge: ChargeWithCounts) => {
      setValue('amount', charge.amount ?? 0)
      setValue('day_tariff', charge.day_tariff ?? 0)
      setValue('tariff', charge.tariff ?? 0)
      setValue('additional_value', charge.additional_value ?? undefined)
      setValue('discount_value', charge.discount_value ?? undefined)
      setValue(
        'dueDate',
        charge.dueDate ? dayjs(new Date(charge.dueDate)).toDate() : new Date(),
      )
      setValue('description', charge.description ?? '')
      setValue('clientId', charge.clientId ?? '')
      setValue('client_name', charge.client_name ?? '')
      setValue('id', charge.id ?? '')
      setValue('status', charge.status ?? StatusCharge.PENDING)
    },
    [setValue],
  )

  const handleDeleteCharge = useCallback(() => {
    if (selectedCharge) {
      executeDelete({ id: selectedCharge.id })
    }
  }, [executeDelete, selectedCharge])

  const columns = useMemo<ColumnDef<ChargeWithCounts, unknown>[]>(
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
        accessorKey: 'client_name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Cliente" />
        ),
        cell: ({ row }) => {
          const { client_name } = row.original

          return <Text>{client_name}</Text>
        },
      },
      {
        accessorKey: 'total_value',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Valor" />
        ),
        cell: ({ row }) => {
          const { total_value } = row.original

          return <Text>{formatMoney(total_value)}</Text>
        },
      },
      {
        accessorKey: 'status',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ cell }) => {
          const status = cell.getValue() as StatusCharge

          return (
            <Badge variant={getBadgeVariantByStatusCharge[status]}>
              {statusChargeText[status]}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'dueDate',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Data de vencimento" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date, true),
        enableColumnFilter: false,
      },
      {
        id: 'actions',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Ações" />
        ),
        cell: ({ row }) =>
          row.original.status === StatusCharge.PAID ? (
            <Button
              aria-label="Ver detalhes"
              variant={'ghost'}
              onClick={() => {
                setSelectedCharge(row.original)
                setOpenChargeDetailsPaidSheet(true)
              }}
            >
              <Icons.eye className="size-4" aria-hidden="true" />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-label="Open menu" variant="ghost">
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
                    variant={'ghost'}
                    onClick={() => {
                      onUpdate(row.original)
                      setIsUpdateDialogOpen(true)
                    }}
                  >
                    <Icons.edit className="mr-2 size-4" aria-hidden="true" />
                    Editar
                  </Button>
                </DropdownMenuItem>

                <Separator />

                <DropdownMenuItem asChild>
                  <Button
                    variant={'ghost'}
                    onClick={() => {
                      onUpdate(row.original)
                      setIsReceiveDialogOpen(true)
                    }}
                    className="w-full justify-start"
                  >
                    <Icons.money className="mr-2 size-4" aria-hidden="true" />{' '}
                    Receber
                  </Button>
                </DropdownMenuItem>
                <Separator />

                <DropdownMenuItem asChild>
                  <Button
                    variant={'destructiveLink'}
                    onClick={() => {
                      setSelectedCharge(row.original)
                      setIsDeleteItem(true)
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
            value: 'client_name',
            label: 'Cliente',
            placeholder: 'Buscar por cliente..',
          },
          {
            value: 'status',
            label: 'Status',
            placeholder: 'Buscar por status..',
            options: statusChargeOptions,
          },
        ]}
        deleteRowsAction={() => setConfirmBatchDelete(true)}
      />

      <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar cobrança</SheetTitle>
          </SheetHeader>
          <SheetDescription className="sr-only">
            Edite as informações da cobrança.
          </SheetDescription>
          <Form {...formMethods}>
            <form onSubmit={handleSubmit(execute)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <InputForm name="client_name" label="Cliente" disabled />

                <InputCurrency
                  label="Valor"
                  name="amount"
                  placeholder="R$ 0,00"
                />
              </div>
              <FormItem className="space-y-3">
                <FormLabel className="font-bold flex items-center justify-between">
                  Data de vencimento
                </FormLabel>

                <DatePickerSingle
                  value={watch('dueDate')?.toISOString()}
                  onChange={(value) => {
                    setValue('dueDate', value ? new Date(value) : new Date())
                  }}
                  className="w-full"
                />

                <FormMessage>{errors.dueDate?.message}</FormMessage>
              </FormItem>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputCurrency
                  label="Juros mensal"
                  name="tariff"
                  placeholder="R$ 0,00"
                />
                <InputCurrency
                  label="Juros diário"
                  name="day_tariff"
                  placeholder="R$ 0,00"
                />
              </div>

              <FormField
                control={formMethods.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold flex items-center justify-between">
                      Descrição
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ex: 100 reais de juros"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <SheetFooter className="w-full flex flex-row justify-between gap-2 mt-4">
            <SheetClose asChild>
              <Button type="button" variant="outline" className="mr-auto">
                Cancelar
              </Button>
            </SheetClose>

            <Button
              type="submit"
              disabled={isPending}
              onClick={handleSubmit(execute)}
            >
              <LoadingOnButton
                isLoading={isPending}
                defaultText="Atualizar"
                onActionText="Atualizando..."
              />
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={isReceiveDialogOpen} onOpenChange={setIsReceiveDialogOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Receber cobrança</SheetTitle>
          </SheetHeader>
          <SheetDescription className="sr-only">
            Adicione as informações da cobrança.
          </SheetDescription>
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(executeReceive)}
              className="grid gap-4"
            >
              <InputCurrency
                name="additional_value"
                label="Valor adicional"
                placeholder="R$ 0,00"
              />
              <InputCurrency
                name="discount_value"
                label="Valor de desconto"
                placeholder="R$ 0,00"
              />
            </form>
          </Form>

          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between mt-4">
              <Text scale={'lg'}>Total: </Text>
              <Text scale={'xl'} weight={'bold'}>
                <NumberFlow
                  value={
                    watch('amount') +
                    (watch('tariff') ?? 0) +
                    (watch('day_tariff') ?? 0) +
                    (watch('additional_value') ?? 0) -
                    (watch('discount_value') ?? 0)
                  }
                  format={{
                    style: 'currency',
                    currency: 'BRL',
                    trailingZeroDisplay: 'stripIfInteger',
                  }}
                />
              </Text>
            </div>
            <Text scale={'xs'} variant={'body'}>
              Valor acrescido de tarifas{' '}
            </Text>
          </div>
          <Separator />

          <SheetFooter className="w-full flex flex-row justify-between gap-2 mt-4">
            <SheetClose asChild>
              <Button type="button" variant="outline" className="mr-auto">
                Cancelar
              </Button>
            </SheetClose>

            <Button
              type="submit"
              disabled={isPendingReceive}
              onClick={handleSubmit(executeReceive)}
            >
              <LoadingOnButton
                isLoading={isPendingReceive}
                defaultText="Receber"
                onActionText="Recebendo..."
              />
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <ChargeDetailsPaidSheet
        charge={selectedCharge}
        open={openChargeDetailsPaidSheet}
        setOpen={setOpenChargeDetailsPaidSheet}
      />

      <ConfirmDialog
        onConfirm={handleDeleteCharge}
        open={!!selectedCharge && isDeleteItem}
        onCancel={() => {
          setSelectedCharge(null)
          setIsDeleteItem(false)
        }}
        isLoading={isPendingDelete}
      />

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
