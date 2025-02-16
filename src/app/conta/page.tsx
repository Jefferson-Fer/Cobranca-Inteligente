import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import EmptyState from '@/components/empty-state'
import { env } from '@/lib/env'
import {
  getChargesByProfile,
  getProfile,
} from '@/lib/prisma/queries/cached-queries'

import InfoCards from './_components/info-cards'
import SalesComparisonChart from './_components/sales-comparison-chart'
import SalesMonthCard from './_components/sales-month-card'

const title = 'Dashboard'
const description = 'Informações gerais do sistema'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default async function DashboardPage() {
  const profile = await getProfile()

  if (!profile) {
    return redirect('/sign-in')
  }

  const { charges } = await getChargesByProfile(profile.id)

  if (charges.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <EmptyState
          title="Nenhum cobrança encontrada"
          description="Crie uma cobrança para começar a usar o sistema"
        />
      </div>
    )
  }

  const currentMonthCharges = charges.filter((charge) => {
    const chargeDate = new Date(charge.createdAt)
    const now = new Date()
    return (
      chargeDate.getMonth() === now.getMonth() &&
      chargeDate.getFullYear() === now.getFullYear()
    )
  })

  const previousMonthCharges = charges.filter((charge) => {
    const chargeDate = new Date(charge.createdAt)
    const now = new Date()
    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    return (
      chargeDate.getMonth() === previousMonth.getMonth() &&
      chargeDate.getFullYear() === previousMonth.getFullYear()
    )
  })

  return (
    <div className="flex flex-col gap-4">
      <InfoCards
        currentMonthCharges={currentMonthCharges}
        previousMonthCharges={previousMonthCharges}
      />
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
        <SalesComparisonChart
          charges={charges}
          className="col-span-10 lg:col-span-6"
        />
        <SalesMonthCard
          charges={currentMonthCharges}
          className="col-span-10 lg:col-span-4"
        />
      </div>
    </div>
  )
}
