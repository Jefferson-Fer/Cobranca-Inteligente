'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { updateChargeReceiveQuery } from '@/lib/prisma/mutations/charge'
import { authActionClient } from '@/lib/safe-action'
import { receiveChargeSchema } from '@/validators'

export const updateChargeReceiveAction = authActionClient
  .schema(receiveChargeSchema)
  .metadata({
    name: 'update charge receive action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const charge = await updateChargeReceiveQuery(params)

    if (!charge) {
      throw new Error('Erro ao receber cobrança')
    }

    revalidatePath('/conta')
    revalidateTag('charges' + profile.id)
  })
