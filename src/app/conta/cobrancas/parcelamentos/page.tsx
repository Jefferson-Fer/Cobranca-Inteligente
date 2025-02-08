import { PageHeader } from '@/components/page-header'

const title = 'Parcelamentos'
const description = 'Lista de parcelamentos'

export default function InstallmentsPage() {
  return (
    <>
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'charges-installments']}
        icon="placeholder"
      ></PageHeader>
    </>
  )
}
