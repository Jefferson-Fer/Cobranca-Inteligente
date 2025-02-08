import { PageHeader } from '@/components/page-header'

const title = 'Mensalidades'
const description = 'Lista de mensalidades'

export default function MonthlyChargesPage() {
  return (
    <>
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'charges-monthly']}
        icon="placeholder"
      ></PageHeader>
    </>
  )
}
