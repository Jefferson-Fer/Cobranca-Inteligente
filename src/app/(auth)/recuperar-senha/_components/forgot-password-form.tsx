'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { forgotPasswordAction } from '@/actions/auth/forgot-password-action'
import { HeaderForm } from '@/app/(auth)/_components/header-form'
import { Icons } from '@/components/icons'
import { InputForm } from '@/components/input-form'
import { AlertCard } from '@/components/ui/alert-card'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { forgotPasswordSchema } from '@/validators/signup-validator'
import { FogotPasswordSchemaType } from '@/validators/signup-validator'

export const ForgotPasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false)

  const { execute, isPending } = useStateAction(forgotPasswordAction, {
    onError: ({ error }) => {
      toast.error('Falha ao enviar e-mail', {
        description:
          error?.serverError ?? 'Verifique se o e-mail informado está correto.',
      })
    },
    onSuccess: () => {
      setIsSuccess(true)
    },
  })

  const formMethods = useForm<FogotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const {
    formState: { isSubmitting, isValid },
  } = formMethods

  if (isSuccess) {
    return (
      <AlertCard
        title="E-mail enviado!"
        description="Verifique seu e-mail para redefinir sua senha."
        icon="check"
        variant="success"
      />
    )
  }

  return (
    <>
      <HeaderForm
        title="Recupere sua senha"
        description="Preencha o formulário para receber o link de recuperação."
      />
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
            autoComplete="off"
          />
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !isValid || isPending}
            >
              {isSubmitting || isPending ? (
                <>
                  Recuperando...
                  <Icons.spinner
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                </>
              ) : (
                'Recuperar'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
