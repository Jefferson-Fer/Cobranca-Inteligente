import { StatusCharge } from '@prisma/client'

import CardInfo from '@/components/card-info'
import { Text } from '@/components/ui/text'
import { ChargeWithCounts } from '@/contracts/charges'
import { formatMoney } from '@/lib/utils'

interface InfoCardsProps {
  currentMonthCharges: ChargeWithCounts[]
  previousMonthCharges: ChargeWithCounts[]
}

const calculateTotalReceita = (charges: ChargeWithCounts[]) => {
  return charges.reduce((total, charge) => total + charge.total_value, 0)
}

const calculateTotalRecebido = (charges: ChargeWithCounts[]) => {
  return charges.reduce((total, charge) => {
    if (charge.status === StatusCharge.PAID) {
      return total + charge.total_value
    }
    return total
  }, 0)
}

const calculateTotalAtrasados = (charges: ChargeWithCounts[]) => {
  return charges.reduce((total, charge) => {
    if (charge.status === StatusCharge.OVERDUE) {
      return total + charge.total_value
    }
    return total
  }, 0)
}

export default function InfoCards({
  currentMonthCharges,
  previousMonthCharges,
}: InfoCardsProps) {
  const totalReceitaAtual = calculateTotalReceita(currentMonthCharges)
  const totalReceitaAnterior = calculateTotalReceita(previousMonthCharges)
  const receitaChangePercentage =
    ((totalReceitaAtual - totalReceitaAnterior) / totalReceitaAnterior) * 100

  const totalRecebidoAtual = calculateTotalRecebido(currentMonthCharges)
  const totalRecebidoAnterior = calculateTotalRecebido(previousMonthCharges)
  const recebidoChangePercentage =
    ((totalRecebidoAtual - totalRecebidoAnterior) / totalRecebidoAnterior) * 100

  const totalAtrasadosAtual = calculateTotalAtrasados(currentMonthCharges)
  const totalAtrasadosAnterior = calculateTotalAtrasados(previousMonthCharges)
  const atrasadosChangePercentage =
    ((totalAtrasadosAtual - totalAtrasadosAnterior) / totalAtrasadosAnterior) *
    100

  const totalReceberAtual =
    totalReceitaAtual - totalRecebidoAtual - totalAtrasadosAtual
  const totalReceberAnterior =
    totalReceitaAnterior - totalRecebidoAnterior - totalAtrasadosAnterior
  const receberChangePercentage =
    (totalReceberAtual / totalReceberAnterior) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardInfo title="Receita total" icon="money">
        <div className="flex flex-col justify-start">
          <Text scale={'xl'} weight={'bold'}>
            {formatMoney(totalReceitaAtual)}
          </Text>
          {totalReceitaAnterior > 0 && (
            <Text scale={'sm'} variant={'body'}>
              {receitaChangePercentage > 0
                ? `+ ${receitaChangePercentage.toFixed(2)}%`
                : `${receitaChangePercentage.toFixed(2)}%`}{' '}
              do que o mês passado
            </Text>
          )}
        </div>
      </CardInfo>

      <CardInfo title="A receber">
        <div className="flex flex-col justify-start">
          <Text scale={'xl'} weight={'bold'}>
            {formatMoney(totalReceberAtual)}
          </Text>
          {totalReceberAnterior > 0 && (
            <Text scale={'sm'} variant={'body'}>
              {receberChangePercentage > 0
                ? `+ ${receberChangePercentage.toFixed(2)}%`
                : `${receberChangePercentage.toFixed(2)}%`}{' '}
              do que o mês passado
            </Text>
          )}
        </div>
      </CardInfo>

      <CardInfo title="Recebido">
        <div className="flex flex-col justify-start">
          <Text scale={'xl'} weight={'bold'}>
            {formatMoney(totalRecebidoAtual)}
          </Text>
          {totalRecebidoAnterior > 0 && (
            <Text scale={'sm'} variant={'body'}>
              {recebidoChangePercentage > 0
                ? `+ ${recebidoChangePercentage.toFixed(2)}%`
                : `${recebidoChangePercentage.toFixed(2)}%`}{' '}
              do que o mês passado
            </Text>
          )}
        </div>
      </CardInfo>

      <CardInfo title="Atrasados">
        <div className="flex flex-col justify-start">
          <Text scale={'xl'} weight={'bold'}>
            {formatMoney(totalAtrasadosAtual)}
          </Text>
          {totalAtrasadosAnterior > 0 && (
            <Text scale={'sm'} variant={'body'}>
              {atrasadosChangePercentage > 0
                ? `+ ${atrasadosChangePercentage.toFixed(2)}%`
                : `${atrasadosChangePercentage.toFixed(2)}%`}{' '}
              do que o mês passado
            </Text>
          )}
        </div>
      </CardInfo>
    </div>
  )
}
