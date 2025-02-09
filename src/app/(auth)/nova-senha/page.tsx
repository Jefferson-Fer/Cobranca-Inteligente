import { Metadata } from 'next'

import { env } from '@/lib/env'

import { NewPasswordForm } from './_components/new-password-form'

const title = 'Alteração de senha'
const description = 'Informe sua nova senha para acessar sua conta.'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default function NewPasswordStore() {
  return (
    <div className="flex items-center justify-center w-full lg:w-[800px] px-8">
      <div className="mx-auto grid gap-6">
        <NewPasswordForm />
      </div>
    </div>
  )
}
