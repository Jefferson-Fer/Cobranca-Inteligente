import { Metadata } from 'next'

import { env } from '@/lib/env'

import { ForgotPasswordForm } from './_components/forgot-password-form'

const title = 'Recuperação de senha'
const description = 'Recupere sua senha preenchendo o formulário.'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default function ForgotPasswordStore() {
  return (
    <div className="flex items-center justify-center w-full lg:w-[800px] px-8">
      <div className="mx-auto grid gap-6">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
