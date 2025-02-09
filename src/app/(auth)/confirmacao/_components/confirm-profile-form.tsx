'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signUpConfirmationAction } from '@/actions/auth/signup-confirmation-action'
import { Icons } from '@/components/icons'
import { AlertCard } from '@/components/ui/alert-card'
import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/ui/button-link'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import {
  SignUpConfirmationSchemaType,
  signUpConfirmationSchema,
} from '@/validators/signup-validator'

import { HeaderForm } from '../../_components/header-form'

export const ConfirmProfileForm = () => {
  const [isConfirmed, setIsConfirmed] = useState(false)

  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const { execute, isPending } = useStateAction(signUpConfirmationAction, {
    onSuccess: () => {
      toast.success('Confirmação realizada com sucesso.', {
        description: 'Agora você já pode fazer o login.',
      })
      setIsConfirmed(true)
    },

    onError: ({ error }) => {
      toast.error('Falha ao confirmar cadastro', {
        description:
          error?.serverError ??
          'Verifique se os dados informados estão corretos',
      })
    },
  })

  const form = useForm<SignUpConfirmationSchemaType>({
    resolver: zodResolver(signUpConfirmationSchema),
    defaultValues: {
      email: email ?? '',
    },
  })

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = form

  if (!email) {
    return (
      <AlertCard
        variant="destructive"
        title="E-mail não informado!"
        description="Não foi encontrado um email na URL."
        icon="errorTriangle"
      />
    )
  } else {
    setValue('email', email)
  }

  if (isConfirmed) {
    return (
      <AlertCard
        title="Cadastro confirmado"
        description="Agora você já pode fazer o login."
        icon="check"
        variant="success"
      >
        <ButtonLink
          variant="default"
          size="sm"
          href="/sign-in"
          className="mt-2"
          prefetch={false}
        >
          Fazer login
        </ButtonLink>
      </AlertCard>
    )
  }

  return (
    <>
      <HeaderForm
        title="Confirmar cadastro"
        description="Por favor, insira o código de confirmação recebido no seu e-mail."
      />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(execute)}
          className="w-full lg:w-2/3 space-y-6 mx-auto"
        >
          <FormField
            control={control}
            name="pin"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Código de confirmação</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Por favor, insira o código de confirmação recebido no seu
                  e-mail.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting || isPending}>
            {isSubmitting || isPending ? (
              <>
                Confirmando cadastro...
                <Icons.spinner
                  className="ml-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              </>
            ) : (
              'Confirmar'
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}
