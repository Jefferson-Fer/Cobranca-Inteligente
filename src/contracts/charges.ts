import { Charge } from '@prisma/client'

import { FindGenericList } from './commons'

export type ChargeFields = keyof Charge

export type FindChargesList = FindGenericList<ChargeFields> & {
  client?: string
  profile?: string
}

export type ChargeType = Charge

export type ChargeWithCounts = Omit<Charge, 'updateAt'> & {
  client: {
    name: string
  }
}
