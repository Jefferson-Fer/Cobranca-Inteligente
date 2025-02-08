import { PageHeader } from '@/components/page-header'

const title = 'Usuários'
const description = 'Lista de usuários'

export default function UsersPage() {
  return (
    <>
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'users']}
        icon="placeholder"
      ></PageHeader>
    </>
  )
}
