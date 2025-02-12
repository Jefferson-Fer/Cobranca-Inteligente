import { TypeClient } from '@prisma/client'

import { BadgeVariantsType } from '@/components/ui/badge/styles'
import { Option } from '@/contracts/commons'

export const userStatusText: Record<TypeClient, string> = {
  DEFAULTER: 'Inadimplente',
  STANDING: 'Em dia',
}

export const statusClientOptions: Option[] = [
  {
    label: 'Em dia',
    value: TypeClient.STANDING,
  },
  {
    label: 'Inadimplente',
    value: TypeClient.DEFAULTER,
  },
]

export const getBadgeVariantByTypeClient: Record<
  TypeClient,
  BadgeVariantsType['variant']
> = {
  DEFAULTER: 'destructive',
  STANDING: 'success',
}
