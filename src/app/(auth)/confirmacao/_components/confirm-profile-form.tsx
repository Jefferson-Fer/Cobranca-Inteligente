'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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

interface ConfirmProfileFormProps {
  email: string
}
export const ConfirmProfileForm = ({ email }: ConfirmProfileFormProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const router = useRouter()

  console.log('email confirmacao', email)

  const { execute, isPending } = useStateAction(signUpConfirmationAction, {
    onError: () => {
      toast.error('Falha ao confirmar cadastro', {
        description: 'Verifique se os dados informados estão corretos',
      })
    },
    onSuccess: ({ data }) => {
      if (data && data.redirectTo) {
        toast.success('Confirmação realizada com sucesso.', {
          description: 'Agora você já pode fazer o login.',
          action: {
            label: 'Fazer login',
            onClick: () => router.push(data.redirectTo),
            type: 'button',
          },
        })
        setIsConfirmed(true)
      }
    },
  })

  const form = useForm<SignUpConfirmationSchemaType>({
    resolver: zodResolver(signUpConfirmationSchema),
    defaultValues: {
      email,
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form

  console.log('errors', errors)

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
          href="/entrar"
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
