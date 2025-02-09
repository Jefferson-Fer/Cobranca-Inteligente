import { Metadata } from 'next'

import { env } from '@/lib/env'

import { ConfirmProfileForm } from './_components/confirm-profile-form'

const title = 'Confirmar cadastro'
const description = 'Confirme seu cadastro para acessar o sistema.'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default async function ConfirmacaoPage() {
  return (
    <div className="flex items-center justify-center w-full lg:w-[800px] px-8">
      <div className="mx-auto grid gap-6">
        <ConfirmProfileForm />
      </div>
    </div>
  )
}
