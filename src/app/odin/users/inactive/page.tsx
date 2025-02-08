import { PageHeader } from '@/components/page-header'

const title = 'Usuários Inativos'
const description = 'Lista de usuários inativos'

export default function InactiveUsersPage() {
  return (
    <>
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'users-inactive']}
        icon="placeholder"
      ></PageHeader>
    </>
  )
}
