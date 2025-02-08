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
import { Form } from '@/components/ui/form'
import { LoadingOnButton } from '@/components/ui/loading'
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Icons.new />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar cliente</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Adicione um novo cliente para gerenciar suas contas e transações.
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
          </form>
        </Form>
        <DialogFooter className="w-full flex justify-between gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="mr-auto">
              Cancelar
            </Button>
          </DialogClose>

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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
