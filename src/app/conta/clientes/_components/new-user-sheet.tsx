'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createClientAction } from '@/actions/client/create-client-action'
import { Icons } from '@/components/icons'
import { InputForm } from '@/components/input-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { LoadingOnButton } from '@/components/ui/loading'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Text } from '@/components/ui/text'
import { clientSchema, ClientSchemaType } from '@/validators/client-validator'

export default function NewUserModal() {
  const [isOpen, setIsOpen] = useState(false)

  const { execute, isPending } = useStateAction(createClientAction, {
    onSuccess: () => {
      toast.success('Cliente criado com sucesso')
      reset()
      setIsOpen(false)
    },
    onError: () => {
      toast.error('Erro ao criar cliente')
      reset()
      setIsOpen(false)
    },
  })

  const formMethods = useForm<ClientSchemaType>({
    resolver: zodResolver(clientSchema),
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="w-full flex justify-end">
        <SheetTrigger asChild>
          <Button className="w-[200px]">
            <Icons.new className="size-4" />
            <Text variant="white">Adicionar</Text>
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar cliente</SheetTitle>
        </SheetHeader>
        <SheetDescription className="sr-only">
          Adicione um novo cliente para gerenciar suas contas e transações.
        </SheetDescription>
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
          </form>
        </Form>
        <SheetFooter className="w-full flex justify-between gap-2 mt-4">
          <SheetClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto mr-auto"
            >
              Cancelar
            </Button>
          </SheetClose>

          <Button
            type="submit"
            disabled={isSubmitting || isPending}
            onClick={handleSubmit(execute)}
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
