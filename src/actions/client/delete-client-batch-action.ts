'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { deleteClientBatchQuery } from '@/lib/prisma/mutations/client'
import { authActionClient } from '@/lib/safe-action'
import { deleteClientBatchSchema } from '@/validators/client-validator'

export const deleteClientBatchAction = authActionClient
  .schema(deleteClientBatchSchema)
  .metadata({
    name: 'delete client batch action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const client = await deleteClientBatchQuery(params)

    if (!client) {
      throw new Error('Clientes não encontrados')
    }

    revalidatePath('/conta')
    revalidateTag('clients' + profile.id)
  })
