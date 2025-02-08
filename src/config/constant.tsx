import { TypeClient } from '@prisma/client'

import { BadgeVariantsType } from '@/components/ui/badge/styles'

export const userStatusText: Record<TypeClient, string> = {
  DEFAULTER: 'Inadimplente',
  STANDING: 'Em dia',
}

export const getBadgeVariantByTypeClient: Record<
  TypeClient,
  BadgeVariantsType['variant']
> = {
  DEFAULTER: 'destructive',
  STANDING: 'success',
}
