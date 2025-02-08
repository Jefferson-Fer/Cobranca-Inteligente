import { PageHeader } from '@/components/page-header'

const title = 'Relatórios'
const description = 'Relatórios do sistema'

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'reports']}
        icon="placeholder"
      ></PageHeader>
    </>
  )
}
