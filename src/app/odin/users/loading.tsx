import { DataTableLoading } from '@/components/data-table/data-table-loading'
import { PageHeader } from '@/components/page-header'

export default async function UsersLoading() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Usuários"
        description="Gerencie seus usuários"
        breadcrumbLinks={['dashboard', 'users']}
        icon="user"
        pageType="odin"
      />

      <DataTableLoading columnCount={5} />
    </div>
  )
}
