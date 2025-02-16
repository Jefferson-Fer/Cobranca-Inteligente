'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import CardInfo from '@/components/card-info'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ChargeWithCounts } from '@/contracts/charges'
import { cn } from '@/lib/utils'

const chartConfig = {
  vendas: {
    label: 'Vendas',
    color: '#2563eb',
  },
} satisfies ChartConfig

interface SalesComparisonChartProps {
  charges: ChargeWithCounts[]
  className?: string
}

export default function SalesComparisonChart({
  charges,
  className,
}: SalesComparisonChartProps) {
  const chartData = charges.reduce(
    (acc, charge) => {
      const month = new Date(charge.createdAt).toLocaleString('default', {
        month: 'short',
      })
      const existingMonth = acc.find((item) => item.month === month)
      if (existingMonth) {
        existingMonth.vendas += charge.total_value
      } else {
        acc.push({ month, vendas: charge.total_value })
      }
      return acc
    },
    [] as { month: string; vendas: number }[],
  )

  if (chartData.length < 6) {
    addMonthsArray(chartData)
  } else {
    chartData.reverse()
  }

  return (
    <CardInfo title="Visão geral" className={cn(className)}>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] max-h-[350px] w-full"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            dataKey="vendas"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="vendas" fill="var(--color-background)" radius={4} />
        </BarChart>
      </ChartContainer>
    </CardInfo>
  )
}

const addMonthsArray = (chartData: { month: string; vendas: number }[]) => {
  const allMonths = [
    'jan.',
    'fev.',
    'mar.',
    'abr.',
    'mai.',
    'jun.',
    'jul.',
    'ago.',
    'set.',
    'out.',
    'nov.',
    'dez.',
  ]
  const currentMonthIndex = new Date().getMonth()
  const lastSixMonths = []

  const monthsToAdd = 6 - chartData.length
  for (let i = 0; i < monthsToAdd; i++) {
    const monthIndex = (currentMonthIndex - i - chartData.length + 12) % 12
    lastSixMonths.push(allMonths[monthIndex])
  }

  lastSixMonths.forEach((month) => {
    if (!chartData.find((item) => item.month === month)) {
      chartData.push({ month, vendas: 0 })
    }
  })

  chartData.reverse()
}
