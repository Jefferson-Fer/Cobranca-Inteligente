import NumberFlow from '@number-flow/react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { CardInfo } from '@/components/ui/card-info'
import { Text } from '@/components/ui/text'
import { type Plans } from '@/contracts/plans'

const plans: Plans[] = [
  {
    title: 'Básico',
    description: 'Plano gratuito',
    value: 0,
    ticket: {
      value: 300,
      description: 'Por boleto pago',
    },
    card_credit: {
      value: 3.83,
      description: 'Por cartão de crédito',
    },
    analitycs: null,
    pix: null,
    invoice: null,
  },
  {
    title: 'Premium',
    description: 'Por apenas R$ 100,00',
    value: 100,
    ticket: {
      value: 190,
      description: 'Por boleto pago',
    },
    card_credit: {
      value: 1.83,
      description: 'Por cartão de crédito',
    },
    analitycs: 'Análise de dados',
    pix: {
      value: 80,
      description: 'Por pix realizado',
    },
    invoice: 'Nota fiscal gratuita ilimitada',
  },
]

export default function Plans() {
  return (
    <div className="flex px-8 md:px-12 lg:px-16 2xl:px-24">
      <div className="w-full flex flex-col md:flex-row items-center justify-center min-h-[350px] md:min-h-[500px] gap-4">
        {plans.map((plan) => (
          <CardInfo
            title={plan.title}
            description={plan.description}
            className="w-auto"
            key={plan.title}
          >
            <div className="w-72 lg:w-96 flex flex-col gap-2">
              <Text className="flex items-center">
                <Icons.check className="mr-2 size-4" />
                <NumberFlow
                  value={plan.card_credit.value / 100}
                  format={{
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }}
                />
                &nbsp;{plan.card_credit.description}
              </Text>
              <Text className="flex items-center">
                <Icons.check className="mr-2 size-4" />
                <NumberFlow
                  value={plan.ticket.value / 100}
                  format={{
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }}
                />
                &nbsp;{plan.ticket.description}
              </Text>
              {plan.analitycs ? (
                <Text className="flex items-center">
                  <Icons.check className="mr-2 size-4" />
                  {plan.analitycs}
                </Text>
              ) : (
                <Text className="flex items-center">
                  <Icons.x className="mr-2 size-4" />
                  Análise de dados
                </Text>
              )}
              {plan.pix ? (
                <Text className="flex items-center">
                  <Icons.check className="mr-2 size-4" />
                  <NumberFlow
                    value={plan.pix.value / 100}
                    format={{
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }}
                  />
                  &nbsp;{plan.pix.description}
                </Text>
              ) : (
                <Text className="flex items-center">
                  <Icons.x className="mr-2 size-4" />
                  Pix não disponível
                </Text>
              )}

              {plan.invoice ? (
                <Text className="flex items-center">
                  <Icons.check className="mr-2 size-4" />
                  {plan.invoice}
                </Text>
              ) : (
                <Text className="flex items-center">
                  <Icons.x className="mr-2 size-4" />
                  Nota fiscal gratuita ilimitada
                </Text>
              )}

              <Button className="w-full mt-20">Assinar</Button>
            </div>
          </CardInfo>
        ))}
      </div>
    </div>
  )
}
