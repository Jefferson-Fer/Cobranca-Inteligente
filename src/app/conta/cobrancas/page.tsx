import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import EmptyState from '@/components/empty-state'
import { PageHeader } from '@/components/page-header'
import { ParamsTypes, SearchParamsTypes } from '@/contracts/commons'
import { env } from '@/lib/env'
import {
  getChargesByProfile,
  getProfile,
} from '@/lib/prisma/queries/cached-queries'
import { searchChargesParse } from '@/utils/search-parsers'

import NewChargeModal from './_components/new-charge-modal'

const title = 'Cobranças'
const description = 'Lista de cobranças'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default async function ChargesPage({
  params: paramsPromise,
}: {
  params: Promise<{ searchParams: SearchParamsTypes }>
}) {
  const { searchParams } = await paramsPromise
  const parsedParams = await searchChargesParse(
    searchParams as unknown as { [key: string]: ParamsTypes },
  )
  const profile = await getProfile()

  if (!profile) {
    return redirect('/sign-in')
  }

  const { charges, count } = await getChargesByProfile(parsedParams, profile.id)

  console.log('charges', charges)
  console.log('count', count)

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'charges']}
        icon="placeholder"
      >
        <NewChargeModal />
      </PageHeader>

      <EmptyState
        title="Nenhuma cobrança encontrada"
        description="Crie uma cobrança para começar a gerenciar suas vendas"
      />
    </div>
  )
}
