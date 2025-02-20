import { AuthUser, TypeClient } from '@prisma/client'

import { ClientType, FindClientsList } from '@/contracts/clients'
import { prisma } from '@/lib/prisma'

export const getClientProfileQuery = async (
  user: AuthUser,
): Promise<ClientType[]> => {
  const clients = await prisma.client.findMany({
    where: {
      profile: {
        userId: user.id,
      },
    },
  })

  return clients
}

export const getClientsByProfileQuery = async (profileId: string) => {
  const clients = await prisma.client.findMany({
    where: {
      profileId: profileId,
    },
  })

  const count = await prisma.client.count({
    where: {
      profileId: profileId,
    },
  })

  return { clients, count }
}

export const getClientsByProfileDefaultersQuery = async (
  {
    limit,
    offset,
    column = 'createdAt',
    fromDay,
    order = 'desc',

    search,
    toDay,
  }: FindClientsList,
  profileId: string,
) => {
  const dayFilter =
    fromDay && toDay
      ? {
          gte: fromDay,
          lte: toDay,
        }
      : undefined

  const orderFilter =
    column && order
      ? {
          [column]: order,
        }
      : undefined

  const clients = await prisma.client.findMany({
    where: {
      name: search ? { contains: search } : undefined,
      profileId: profileId,
      type: TypeClient.DEFAULTER,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.client.count({
    where: {
      name: search ? { contains: search } : undefined,
      profileId: profileId,
      type: TypeClient.DEFAULTER,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { clients, count }
}

export const getSearchClientsQuery = async (
  search?: string,
  profileId?: string,
) => {
  const clients = await prisma.client.findMany({
    where: {
      name: search ? { contains: search, mode: 'insensitive' } : undefined,
      profileId: profileId,
    },
  })

  return clients.map((client) => ({
    label: client.name,
    value: client.id,
  }))
}
