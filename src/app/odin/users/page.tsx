import { TypeProfile } from '@prisma/client'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PageHeader } from '@/components/page-header'
import { env } from '@/lib/env'
import { getAllProfiles, getProfile } from '@/lib/prisma/queries/cached-queries'

import { UsersShellTable } from './_components/users-shell-table'

const title = 'Usuários'
const description = 'Gerencie seus usuários'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

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
