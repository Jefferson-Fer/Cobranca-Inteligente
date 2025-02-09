import { Metadata } from 'next'

import { AlertCard } from '@/components/ui/alert-card'
import { SearchParamsTypes } from '@/contracts/commons'
import { env } from '@/lib/env'

import { ConfirmProfileForm } from './_components/confirm-profile-form'

const title = 'Confirmar cadastro'
const description = 'Confirme seu cadastro para acessar o sistema.'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default async function ConfirmacaoPage({
  params,
}: {
  params: Promise<SearchParamsTypes>
}) {
  const searchParams = await params

  const { email } = searchParams as unknown as { email: string }

  console.log('page email', email)

  return (
    <div className="flex items-center justify-center py-12 w-full lg:w-[800px]">
      <div className="mx-auto grid gap-6">
        {email ? (
          <ConfirmProfileForm email={''} />
        ) : (
          <AlertCard
            variant="destructive"
            title="E-mail não informado!"
            description="Não foi encontrado um email na URL."
            icon="errorTriangle"
          />
        )}
      </div>
    </div>
  )
}
