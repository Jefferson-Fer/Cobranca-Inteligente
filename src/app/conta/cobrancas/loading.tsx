import { DataTableLoading } from '@/components/data-table/data-table-loading'
import { Icons } from '@/components/icons'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

export default async function ChargeLoading() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Cobrancas"
        description="Gerencie suas cobranças"
        breadcrumbLinks={['dashboard', 'charges']}
        icon="placeholder"
      >
        <Button className="w-[200px]">
          <Icons.new className="size-4" />
          <Text variant="white">Adicionar</Text>
        </Button>
      </PageHeader>

      <DataTableLoading columnCount={5} />
    </div>
  )
}
