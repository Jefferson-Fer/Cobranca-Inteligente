import { FindChargesList } from '@/contracts/charges'
import { prisma } from '@/lib/prisma'

export const getChargesByProfileQueryList = async (
  {
    limit,
    offset,
    column = 'createdAt',
    fromDay,
    order = 'desc',
    search,
    toDay,
  }: FindChargesList,
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

  const charges = await prisma.charge.findMany({
    include: {
      client: {
        select: {
          name: true,
        },
      },
    },

    where: {
      client: {
        name: search ? { contains: search } : undefined,
      },
      profileId,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.charge.count({
    where: {
      client: {
        name: search ? { contains: search } : undefined,
      },
      profileId,
      createdAt: dayFilter,
    },

    orderBy: orderFilter,
  })

  return { charges, count }
}
