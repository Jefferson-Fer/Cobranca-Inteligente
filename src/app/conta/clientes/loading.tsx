import { DataTableLoading } from '@/components/data-table/data-table-loading'
import { Icons } from '@/components/icons'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

const title = 'Clientes'
const description = 'Lista de clientes'

export default function ClientesLoading() {
  return (
    <>
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'costumers']}
        icon="placeholder"
      >
        <Button>
          <Icons.new />
        </Button>
      </PageHeader>

      <DataTableLoading columnCount={5} />
    </>
  )
}
