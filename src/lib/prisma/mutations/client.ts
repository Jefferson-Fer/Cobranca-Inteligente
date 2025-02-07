import { prisma } from '@/lib/prisma'
import {
  ClientSchemaType,
  DeleteClientBatchSchemaType,
  DeleteClientSchemaType,
  UpdateClientSchemaType,
} from '@/validators/client-validator'

export const createClientQuery = async (
  client: ClientSchemaType,
  profileId: string,
) => {
  return await prisma.client.create({
    data: {
      ...client,
      profileId,
    },
  })
}

export const deleteClientQuery = async (params: DeleteClientSchemaType) => {
  return await prisma.client.delete({
    where: {
      id: params.id,
    },
  })
}

export const deleteClientBatchQuery = async (
  params: DeleteClientBatchSchemaType,
) => {
  return await prisma.client.deleteMany({
    where: {
      id: { in: params.ids },
    },
  })
}

export const updateClientQuery = async (params: UpdateClientSchemaType) => {
  return await prisma.client.update({
    where: {
      id: params.id,
    },
    data: {
      ...params,
    },
  })
}
