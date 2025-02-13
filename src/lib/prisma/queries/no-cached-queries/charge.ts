import { FindChargesList } from '@/contracts/charges'
import { prisma } from '@/lib/prisma'

export const getChargesByProfileQueryList = async (
  { search }: FindChargesList,
  profileId: string,
) => {
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
    },
  })

  const count = await prisma.charge.count({
    where: {
      client: {
        name: search ? { contains: search } : undefined,
      },
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
