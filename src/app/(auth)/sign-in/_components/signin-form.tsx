'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signInPasswordAction } from '@/actions/auth/signin-action'
import { InputForm } from '@/components/input-form'
import { Button } from '@/components/ui/button/index'
import { ButtonLink } from '@/components/ui/button-link'
import { Form } from '@/components/ui/form'
import { LoadingOnButton } from '@/components/ui/loading'
import { Text } from '@/components/ui/text'
import { loginSchema, LoginSchemaType } from '@/validators/signin-validator'

export default function SigninForm() {
  const router = useRouter()

  const { execute, isPending } = useStateAction(signInPasswordAction, {
    onSuccess: ({ data }) => {
      if (data?.redirectTo) {
        router.push(data.redirectTo)
      }
    },
    onError: () => {
      reset()
      toast.error('Falha ao logar', {
        description: 'Por favor, verifique suas credenciais',
      })
    },
  })

  const formMethods = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  const {
    reset,
    formState: { isSubmitting, isValid },
  } = formMethods

  return (
    <div className="shadow-lg p-8 rounded-lg">
      <Form {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(execute)}
          className="grid gap-4"
        >
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

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isValid}
          >
            <LoadingOnButton
              isLoading={isPending}
              defaultText="Entrar"
              onActionText="Entrando..."
            />
          </Button>
        </form>
      </Form>
      <ButtonLink
        variant="link"
        href="/recuperar-senha"
        className="w-full justify-end text-xs underline"
      >
        Esqueceu sua senha?
      </ButtonLink>
      <div className="flex items-center justify-center gap-2">
        <Text scale="sm" variant="body">
          Não tem uma conta?
        </Text>
        <ButtonLink variant="link" href="/sign-up" className="px-0">
          Cadastre-se
        </ButtonLink>
      </div>
    </div>
  )
}
