import { redirect } from 'next/navigation'

import EmptyState from '@/components/empty-state'
import { PageHeader } from '@/components/page-header'
import { ParamsTypes, SearchParamsTypes } from '@/contracts/commons'
import {
  getClientsByProfile,
  getProfile,
} from '@/lib/prisma/queries/cached-queries'
import { searchCategoriesParse } from '@/utils/search-parsers'

import { ClientsTableShell } from './_components/clients-shell-table'
import NewUserModal from './_components/new-user-modal'

const title = 'Clientes'
const description = 'Lista de clientes'

export default async function ClientesPage({
  params: paramsPromise,
}: {
  params: Promise<{ searchParams: SearchParamsTypes }>
}) {
  const { searchParams } = await paramsPromise
  const parsedParams = await searchCategoriesParse(
    searchParams as unknown as { [key: string]: ParamsTypes },
  )

  const profile = await getProfile()

  if (!profile) {
    return redirect('/sign-in')
  }

  const clients = await getClientsByProfile(parsedParams, profile.id)

  const pageCount = Math.ceil((clients?.count ?? 0) / parsedParams.limit)

  return (
    <>
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'costumers']}
        icon="placeholder"
      >
        <NewUserModal />
      </PageHeader>
      {clients?.clients && clients.clients.length > 0 ? (
        <ClientsTableShell data={clients.clients} pageCount={pageCount} />
      ) : (
        <EmptyState
          title="Nenhum cliente encontrado"
          description="Crie um cliente para começar a gerenciar suas vendas"
        />
      )}
    </>
  )
}
