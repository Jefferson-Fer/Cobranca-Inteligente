'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { deleteChargeQuery } from '@/lib/prisma/mutations/charge'
import { authActionClient } from '@/lib/safe-action'
import { deleteChargeSchema } from '@/validators/charge-validator'

export const deleteChargeAction = authActionClient
  .schema(deleteChargeSchema)
  .metadata({
    name: 'delete charge action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const charge = await deleteChargeQuery(params)

    if (!charge) {
      throw new Error('Cobrança não encontrada')
    }

    revalidatePath('/conta')
    revalidateTag('charges' + profile.id)
  })
