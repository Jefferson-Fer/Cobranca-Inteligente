import NumberFlow from '@number-flow/react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Text } from '@/components/ui/text'
import { ChargeWithCounts } from '@/contracts/charges'
import { formatDate, formatMoney } from '@/lib/utils'

interface ChargeDetailsPaidSheetProps {
  charge: ChargeWithCounts | null
  open: boolean
  setOpen: (open: boolean) => void
}

export function ChargeDetailsPaidSheet({
  charge,
  open,
  setOpen,
}: ChargeDetailsPaidSheetProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Pagamento
            <Badge variant="outline">
              {formatDate(charge?.updatedAt || new Date())}
            </Badge>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Detalhes da cobrança
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <Text scale={'sm'} weight={'semibold'}>
              Valor da cobrança
            </Text>
            <NumberFlow
              value={charge?.amount || 0}
              format={{
                style: 'currency',
                currency: 'BRL',
              }}
              className="font-semibold"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <Text scale={'sm'} weight={'semibold'}>
              Tarifa mensal
            </Text>
            <NumberFlow
              value={charge?.tariff || 0}
              format={{
                style: 'currency',
                currency: 'BRL',
              }}
              className="text-muted-foreground"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <Text scale={'sm'} weight={'semibold'}>
              Tarifa diária
            </Text>
            <NumberFlow
              value={charge?.day_tariff || 0}
              format={{
                style: 'currency',
                currency: 'BRL',
              }}
              className="text-muted-foreground"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-2">
            <Text scale={'lg'} weight={'bold'}>
              Valor total
            </Text>
            <Text scale={'lg'} weight={'bold'}>
              {formatMoney(charge?.total_value || 0)}
            </Text>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Text scale={'sm'} variant={'body'}>
              Data da cobrança
            </Text>
            <Text scale={'sm'} variant={'body'}>
              {formatDate(charge?.dueDate || new Date())}
            </Text>
          </div>

          <div className="bg-muted items-center rounded-md gap-2 p-2">
            <Text scale={'sm'} weight={'semibold'}>
              Descrição
            </Text>
            <Text scale={'sm'} variant={'body'}>
              {charge?.description}
            </Text>
          </div>
        </div>

        <Button
          className="w-full sm:w-[200px] mt-4"
          onClick={() => setOpen(false)}
        >
          Fechar
        </Button>
      </SheetContent>
    </Sheet>
  )
}
