'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'

import { createChargeAction } from '@/actions/charge/create-charge-action'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DatePickerSingle } from '@/components/ui/date-picker-single'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
  FormControl,
} from '@/components/ui/form'
import { InputMoney } from '@/components/ui/input-money'
import { LoadingOnButton } from '@/components/ui/loading'
import { SearchPopover } from '@/components/ui/search-popover'
import { Textarea } from '@/components/ui/textarea'
import { useGetClientsOptions } from '@/lib/react-query/queries/charge-queries'
import { chargeSchema, ChargeSchemaType } from '@/validators/charge-validator'

export default function NewChargeModal() {
  const [isOpen, setIsOpen] = useState(false)

  const formMethods = useForm<ChargeSchemaType>({
    resolver: zodResolver(chargeSchema),
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
  const [debouncedSearchClient] = useDebounce(searchClient, 400)

  const { data: clients } = useGetClientsOptions(debouncedSearchClient)

  const handleCreateCharge = (data: ChargeSchemaType) => {
    console.log(data)
    execute(data)
  }

  console.log('clients', clients)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Icons.new />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar cobrança</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Adicione uma nova cobrança para gerenciar suas contas e transações.
        </DialogDescription>
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
                />
                <FormMessage>
                  {formMethods.formState.errors.clientId?.message}
                </FormMessage>
              </FormItem>
              <FormItem>
                <FormLabel className="font-bold flex items-center justify-between">
                  Valor
                </FormLabel>
                <InputMoney name="amount" placeholder="ex: 100,00" />
                <FormMessage>{errors.amount?.message}</FormMessage>
              </FormItem>
            </div>
            <FormItem className="space-y-3">
              <FormLabel className="font-bold flex items-center justify-between">
                Data de vencimento
              </FormLabel>

              <DatePickerSingle
                value={undefined}
                onChange={(value) => {
                  setValue('dueDate', value ? new Date(value) : new Date())
                }}
                className="w-full"
              />

              <FormMessage>{errors.dueDate?.message}</FormMessage>
            </FormItem>
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel className="font-bold flex items-center justify-between">
                  Tarifa mensal
                </FormLabel>
                <InputMoney name="tariff" placeholder="ex: 100,00" />
                <FormMessage>{errors.tariff?.message}</FormMessage>
              </FormItem>
              <FormItem>
                <FormLabel className="font-bold flex items-center justify-between">
                  Tarifa diária
                </FormLabel>
                <InputMoney name="day_tariff" placeholder="ex: 100,00" />
                <FormMessage>{errors.day_tariff?.message}</FormMessage>
              </FormItem>
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

        <DialogFooter className="w-full flex flex-row justify-between gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="mr-auto">
              Cancelar
            </Button>
          </DialogClose>

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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
