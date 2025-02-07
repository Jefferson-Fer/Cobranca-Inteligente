import { prisma } from '@/lib/prisma'
import { ChargeSchemaType } from '@/validators'

export const createChargeQuery = async (
  params: ChargeSchemaType,
  profileId: string,
) => {
  return await prisma.charge.create({
    data: {
      ...params,
      profileId,
    },
  })
}
