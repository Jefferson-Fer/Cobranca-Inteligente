import { DataTableLoading } from '@/components/data-table/data-table-loading'
import { Icons } from '@/components/icons'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

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
        <Button className="w-[200px]">
          <Icons.new className="size-4" />
          <Text variant="white">Adicionar</Text>
        </Button>
      </PageHeader>

      <DataTableLoading columnCount={5} />
    </>
  )
}
