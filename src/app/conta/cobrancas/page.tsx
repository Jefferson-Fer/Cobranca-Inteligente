import { PageHeader } from '@/components/page-header'

const title = 'Cobrancas'
const description = 'Lista de cobrancas'

export default function CobrancasPage() {
  return (
    <>
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'charges']}
        icon="placeholder"
      ></PageHeader>
    </>
  )
}
