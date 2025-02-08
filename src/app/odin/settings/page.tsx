import { PageHeader } from '@/components/page-header'

const title = 'Configurações'
const description = 'Configurações do sistema'

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'settings']}
        icon="placeholder"
      ></PageHeader>
    </>
  )
}
