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

export const getClientsByProfileQuery = async (
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
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
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

export const getSearchClientsQuery = async (search?: string) => {
  const clients = await prisma.client.findMany({
    where: {
      name: search ? { contains: search, mode: 'insensitive' } : undefined,
    },
  })

  return clients.map((client) => ({
    value: client.id,
    label: client.name,
  }))
}
