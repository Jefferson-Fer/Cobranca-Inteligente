/*'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { updatePasswordAction } from '@/actions/auth/update-password-action'
import { HeaderForm } from '@/app/(auth)/_components/header-form'
import { Icons } from '@/components/icons'
import { InputForm } from '@/components/input-form'
import { AlertCard } from '@/components/ui/alert-card'
import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/ui/button-link'
import { Form } from '@/components/ui/form'
import { recoverPasswordSchema, RecoverPasswordSchemaType } from '@/validators'

interface SuccessType {
  redirectTo?: string
  success: boolean
}

export const NewPasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState<SuccessType>({ success: false })
  const formMethods = useForm<RecoverPasswordSchemaType>({
    resolver: zodResolver(recoverPasswordSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = formMethods
  const { execute: updatePassword, isPending } = useStateAction(
    updatePasswordAction,
    {
      onSuccess: ({ data }) => {
        toast.success('Senha atualizada com sucesso')
        if (data?.redirectTo) {
          setIsSuccess({
            success: true,
            redirectTo: data.redirectTo,
          })
        }
      },
      onError: () => {
        toast.error('Erro ao atualizar senha', {
          description: 'Verifique se a senha informada está correta.',
        })
      },
    },
  )

  function onSubmit(credentials: RecoverPasswordSchemaType) {
    updatePassword({
      password: credentials.password,
      confirmPassword: credentials.confirmPassword,
    })
  }

  if (isSuccess && isSuccess.redirectTo) {
    return (
      <AlertCard
        title="Senha atualizada!"
        description="Sua senha foi atualizada com sucesso."
        icon="check"
        variant="success"
      >
        <ButtonLink size="sm" href={isSuccess.redirectTo}>
          Ir para login
        </ButtonLink>
      </AlertCard>
    )
  }

  return (
    <>
      <HeaderForm
        title="Nova Senha"
        description="Informe sua nova senha para acessar sua conta."
      />
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <InputForm
            name="password"
            label="Senha"
            type="password"
            placeholder="********"
            autoComplete="off"
            required
            toogleView
          />
          <InputForm
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            placeholder="********"
            autoComplete="off"
            required
            toogleView
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
}*/
