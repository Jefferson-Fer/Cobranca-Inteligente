import { TypeProfile } from '@prisma/client'
import { redirect } from 'next/navigation'

import { PageHeader } from '@/components/page-header'
import { getAllProfiles, getProfile } from '@/lib/prisma/queries/cached-queries'

import { UsersShellTable } from './_components/users-shell-table'

const title = 'Usuários'
const description = 'Gerencie seus usuários'

export default async function UsersPage() {
  const profile = await getProfile()

  if (!profile || profile.role !== TypeProfile.ADMIN) {
    return redirect('/sign-in')
  }

  const profiles = await getAllProfiles()

  return (
    <>
      <PageHeader
        {...{ title, description }}
        breadcrumbLinks={['dashboard', 'users']}
        icon="user"
        pageType="odin"
      />
      <UsersShellTable data={profiles} pageCount={1} />
    </>
  )
}
