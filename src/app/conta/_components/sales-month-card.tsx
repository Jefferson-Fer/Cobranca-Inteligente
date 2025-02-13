import CardInfo from '@/components/card-info'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'

interface SalesMonthCardProps {
  className?: string
}

export default function SalesMonthCard({ className }: SalesMonthCardProps) {
  return (
    <CardInfo
      title="Vendas recentes"
      description="Você fez um total de 10 vendas no mês"
      className={cn(className)}
    >
      <Text>Aqui vão as informações do total do mês</Text>
    </CardInfo>
  )
}
