import { Client } from '@prisma/client'

import { FindGenericList } from './commons'

export type ClientFields = keyof Client
export type FindClientsList = FindGenericList<ClientFields> & {
  profile?: string
}

export type ClientType = Client

export type ClientWithCounts = Omit<Client, 'updateAt'>
