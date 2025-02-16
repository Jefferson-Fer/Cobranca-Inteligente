import CardInfo from '@/components/card-info'
import EmptyState from '@/components/empty-state'
import { Text } from '@/components/ui/text'
import { ChargeWithCounts } from '@/contracts/charges'
import { cn, formatMoney } from '@/lib/utils'

interface SalesMonthCardProps {
  charges: ChargeWithCounts[]
  className?: string
}

export default function SalesMonthCard({
  charges,
  className,
}: SalesMonthCardProps) {
  return (
    <CardInfo
      title="Vendas recentes"
      description={`Você fez um total de ${charges.length} vendas no mês`}
      className={cn(className)}
    >
      {charges && charges.length > 0 ? (
        <div className="flex flex-col gap-4">
          {charges.slice(0, 5).map((charge) => (
            <div key={charge.id} className="flex justify-between gap-2">
              <div className="flex flex-col">
                <Text weight={'semibold'}>{charge.client_name}</Text>
                <Text scale={'xs'} variant={'body'}>
                  {charge.description}
                </Text>
              </div>
              <Text scale={'lg'} weight={'bold'}>
                {formatMoney(charge.total_value)}
              </Text>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhuma venda recente"
          description="Você ainda não tem vendas recentes"
        />
      )}
    </CardInfo>
  )
}
