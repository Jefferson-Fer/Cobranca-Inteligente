import { Metadata } from 'next'

import { env } from '@/lib/env'

const title = 'Dashboard'
const description = 'Dashboard do Odin'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Odin</h1>
    </div>
  )
}
