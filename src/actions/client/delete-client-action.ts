'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { deleteClientQuery } from '@/lib/prisma/mutations/client'
import { authActionClient } from '@/lib/safe-action'
import { deleteClientSchema } from '@/validators/client-validator'

export const deleteClientAction = authActionClient
  .schema(deleteClientSchema)
  .metadata({
    name: 'delete client action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const client = await deleteClientQuery(params)

    if (!client) {
      throw new Error('Cliente não encontrado')
    }

    revalidatePath('/conta')
    revalidateTag('clients' + profile.id)
  })
