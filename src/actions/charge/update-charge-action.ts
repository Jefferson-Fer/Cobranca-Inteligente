'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { updateChargeQuery } from '@/lib/prisma/mutations/charge'
import { authActionClient } from '@/lib/safe-action'
import { updateChargeSchema } from '@/validators'

export const updateChargeAction = authActionClient
  .schema(updateChargeSchema)
  .metadata({
    name: 'update charge action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const charge = await updateChargeQuery(params)

    if (!charge) {
      throw new Error('Erro ao atualizar cobrança')
    }

    revalidatePath('/conta')
    revalidateTag('charges' + profile.id)
  })
