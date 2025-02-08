import { PageHeader } from '@/components/page-header'

const title = 'Usuários Ativos'
const description = 'Lista de usuários ativos'

export default function ActiveUsersPage() {
  return (
    <>
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'users-active']}
        icon="placeholder"
      ></PageHeader>
    </>
  )
}
