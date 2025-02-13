'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { deleteChargeBatchQuery } from '@/lib/prisma/mutations/charge'
import { authActionClient } from '@/lib/safe-action'
import { deleteChargeBatchSchema } from '@/validators/charge-validator'

export const deleteChargeBatchAction = authActionClient
  .schema(deleteChargeBatchSchema)
  .metadata({
    name: 'delete charge batch action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const charges = await deleteChargeBatchQuery(params)

    if (!charges) {
      throw new Error('Cobranças não encontradas')
    }

    revalidatePath('/conta')
    revalidateTag('charges' + profile.id)
  })
