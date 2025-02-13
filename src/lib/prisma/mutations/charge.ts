import { StatusCharge } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import {
  ChargeSchemaType,
  DeleteChargeBatchSchemaType,
  DeleteChargeSchemaType,
  ReceiveChargeSchemaType,
  UpdateChargeSchemaType,
} from '@/validators'

export const createChargeQuery = async (
  params: ChargeSchemaType,
  profileId: string,
) => {
  return await prisma.charge.create({
    data: {
      ...params,
      client_name: params.client_name ?? '',
      total_value: params.amount,
      profileId,
    },
  })
}

export const updateChargeQuery = async (params: UpdateChargeSchemaType) => {
  return await prisma.charge.update({
    where: {
      id: params.id,
      clientId: params.clientId,
    },
    data: params,
  })
}

export const updateChargeReceiveQuery = async (
  params: ReceiveChargeSchemaType,
) => {
  const totalValue =
    params.amount +
    (params.tariff ?? 0) +
    (params.day_tariff ?? 0) +
    (params.additional_value ?? 0) -
    (params.discount_value ?? 0)

  return await prisma.charge.update({
    where: {
      id: params.id,
      clientId: params.clientId,
    },
    data: {
      ...params,
      total_value: totalValue,
      status: StatusCharge.PAID,
    },
  })
}

export const deleteChargeQuery = async (params: DeleteChargeSchemaType) => {
  return await prisma.charge.delete({
    where: {
      id: params.id,
    },
  })
}

export const deleteChargeBatchQuery = async (
  params: DeleteChargeBatchSchemaType,
) => {
  return await prisma.charge.deleteMany({
    where: {
      id: { in: params.ids },
    },
  })
}
