import { prisma } from '@/lib/prisma'
import { ChargeSchemaType } from '@/validators'

export const createChargeQuery = async (
  params: ChargeSchemaType,
  profileId: string,
) => {
  return await prisma.charge.create({
    data: {
      ...params,
      total_value:
        params.amount +
        (params.additional_value ?? 0) -
        (params.discount_value ?? 0),
      profileId,
    },
  })
}
