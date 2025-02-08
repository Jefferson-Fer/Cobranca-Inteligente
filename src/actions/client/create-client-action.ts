'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { createClientQuery } from '@/lib/prisma/mutations/client'
import { authActionClient } from '@/lib/safe-action'
import { clientSchema } from '@/validators'

export const createClientAction = authActionClient
  .schema(clientSchema)
  .metadata({
    name: 'create client action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const client = await createClientQuery(params, profile.id)

    if (!client) {
      throw new Error('Erro ao criar cliente')
    }

    revalidatePath('/conta')
    revalidateTag('clients' + profile.id)
  })
