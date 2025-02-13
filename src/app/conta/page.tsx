import { Metadata } from 'next'

import CardInfo from '@/components/card-info'
import { Text } from '@/components/ui/text'
import { env } from '@/lib/env'

import { SalesComparisonChart } from './_components/sales-comparison-chart'
import SalesMonthCard from './_components/sales-month-card'

const title = 'Clientes'
const description = 'Lista de clientes'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardInfo title="Receita total" icon="money">
          <Text>Aqui vão as informações do total do mês</Text>
        </CardInfo>

        <CardInfo title="A receber">
          <Text>Aqui vão as informações do que ainda tem a receber no mês</Text>
        </CardInfo>

        <CardInfo title="Recebido">
          <Text>Aqui vão as informações do que já recebeu no mês</Text>
        </CardInfo>

        <CardInfo title="Atrasados">
          <Text>Aqui vão as informações dos atrasados no mês</Text>
        </CardInfo>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
        <SalesComparisonChart className="col-span-10 lg:col-span-6" />
        <SalesMonthCard className="col-span-10 lg:col-span-4" />
      </div>
    </div>
  )
}
