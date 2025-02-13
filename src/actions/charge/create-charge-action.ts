'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { createChargeQuery } from '@/lib/prisma/mutations/charge'
import { authActionClient } from '@/lib/safe-action'
import { chargeSchema } from '@/validators'

export const createChargeAction = authActionClient
  .schema(chargeSchema)

  .metadata({
    name: 'create charge action',
  })

  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    console.log('params', params)

    const charge = await createChargeQuery(params, profile.id)

    if (!charge) {
      throw new Error('Erro ao criar cobrança')
    }

    revalidatePath('/conta')
    revalidateTag('charges' + profile.id)
  })
