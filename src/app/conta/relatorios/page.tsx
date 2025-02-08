import { PageHeader } from '@/components/page-header'

const title = 'Relatórios'
const description = 'Lista de relatórios'

export default function RelatoriosPage() {
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
