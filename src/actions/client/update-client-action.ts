'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { updateClientQuery } from '@/lib/prisma/mutations/client'
import { authActionClient } from '@/lib/safe-action'
import { updateClientSchema } from '@/validators'

export const updateClientAction = authActionClient
  .schema(updateClientSchema)
  .metadata({
    name: 'update client action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const client = await updateClientQuery(params)

    if (!client) {
      throw new Error('Erro ao atualizar cliente')
    }

    revalidatePath('/conta')
    revalidateTag('clients' + profile.id)
  })
