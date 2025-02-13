'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createChargeAction } from '@/actions/charge/create-charge-action'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DatePickerSingle } from '@/components/ui/date-picker-single'
import {
  Form,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
  FormControl,
} from '@/components/ui/form'
import InputCurrency from '@/components/ui/input-currency'
import { LoadingOnButton } from '@/components/ui/loading'
import { SearchPopover } from '@/components/ui/search-popover'
import {
  Sheet,
  SheetDescription,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useDebounce } from '@/hooks/use-debounce'
import { useGetClientsOptions } from '@/lib/react-query/queries/charge-queries'
import { chargeSchema, ChargeSchemaType } from '@/validators/charge-validator'

export default function NewChargeModal() {
  const [isOpen, setIsOpen] = useState(false)

  const formMethods = useForm<ChargeSchemaType>({
    resolver: zodResolver(chargeSchema),
    defaultValues: {
      amount: 0,
    },
  })

  const { execute, isPending } = useStateAction(createChargeAction, {
    onSuccess: () => {
      toast.success('Cobrança criada com sucesso')
      reset()
      setIsOpen(false)
    },
    onError: () => {
      toast.error('Erro ao criar cliente')
      reset()
      setIsOpen(false)
    },
  })

  const {
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = formMethods

  const [searchClient, setSearchClient] = useState('')
  const debouncedSearchClient = useDebounce(searchClient, 400)

  const { data: clients } = useGetClientsOptions(debouncedSearchClient)

  const handleCreateCharge = (data: ChargeSchemaType) => {
    execute({
      ...data,
      client_name: searchClient,
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Icons.new />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar cobrança</SheetTitle>
        </SheetHeader>
        <SheetDescription className="sr-only">
          Adicione uma nova cobrança para gerenciar suas contas e transações.
        </SheetDescription>
        <Form {...formMethods}>
          <form
            onSubmit={handleSubmit(handleCreateCharge)}
            className="grid gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel className="font-bold flex items-center justify-between">
                  Cliente
                </FormLabel>
                <SearchPopover
                  selectedValue={watch('clientId')}
                  onSelectedValueChange={(value) => setValue('clientId', value)}
                  searchValue={searchClient}
                  onSearchValueChange={setSearchClient}
                  items={clients ?? []}
                  isLoading={false}
                />
                <FormMessage>
                  {formMethods.formState.errors.clientId?.message}
                </FormMessage>
              </FormItem>

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
                  setValue(
                    'dueDate',
                    value ? dayjs(new Date(value)).toDate() : new Date(),
                  )
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
            onClick={handleSubmit(handleCreateCharge)}
          >
            <LoadingOnButton
              isLoading={isPending}
              defaultText="Cadastrar"
              onActionText="Cadastrando..."
            />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
