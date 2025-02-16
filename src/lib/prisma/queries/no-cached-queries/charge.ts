import { prisma } from '@/lib/prisma'

export const getChargesByProfileQueryList = async (profileId: string) => {
  const charges = await prisma.charge.findMany({
    include: {
      client: {
        select: {
          name: true,
        },
      },
    },

    where: {
      profileId,
    },

    orderBy: {
      createdAt: 'desc',
    },
  })

  const count = await prisma.charge.count({
    where: {
      profileId,
    },
  })

  return { charges, count }
}

export const getChargeByIdQuery = async (id: string) => {
  return await prisma.charge.findFirst({
    where: { id },
    include: {
      client: {
        select: {
          name: true,
        },
      },
    },
  })
}
