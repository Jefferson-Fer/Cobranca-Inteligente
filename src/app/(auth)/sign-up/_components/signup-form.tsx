'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signUpProfileAction } from '@/actions/profile/signup-profile-action'
import { InputForm } from '@/components/input-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { LoadingOnButton } from '@/components/ui/loading'
import { signUpSchema, SignUpSchemaType } from '@/validators/signup-validator'

export function SignupForm() {
  const router = useRouter()

  const { execute, isPending } = useStateAction(signUpProfileAction, {
    onSuccess: ({ data }) => {
      if (data?.redirectTo) {
        toast.success('Cadastro realizado com sucesso', {
          description:
            'Você receberá um e-mail com as instruções para acessar o sistema.',
        })
        formMethods.reset()

        router.push(data.redirectTo)
      }
    },
    onError: ({ error }) => {
      toast.error('Erro', {
        description: error?.serverError ?? 'Ocorreu um erro ao cadastrar',
      })

      reset()
    },
  })

  const formMethods = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  })

  const {
    reset,
    formState: { isSubmitting },
  } = formMethods

  return (
    <div className="shadow-lg p-8 rounded-lg">
      <Form {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(execute)}
          className="grid gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <InputForm
              name="name"
              label="Nome"
              type="text"
              placeholder="ex: Jhon"
            />
            <InputForm
              name="lastName"
              label="Sobrenome"
              type="text"
              placeholder="ex: Doe"
            />
          </div>

          <InputForm
            name="email"
            label="E-mail"
            type="email"
            placeholder="meu@email.com"
          />

          <InputForm
            name="password"
            label="Senha"
            type="password"
            placeholder="****"
            toogleView
          />

          <InputForm
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            placeholder="****"
            toogleView
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isPending}
          >
            <LoadingOnButton
              isLoading={isPending}
              defaultText="Cadastrar"
              onActionText="Cadastrando..."
            />
          </Button>
        </form>
      </Form>
    </div>
  )
}
