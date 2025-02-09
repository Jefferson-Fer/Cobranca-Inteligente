'use server'

import { recoverPasswordQuery } from '@/lib/prisma/mutations'
import { authActionClient } from '@/lib/safe-action'
import { recoverPasswordSchema } from '@/validators'

export const updatePasswordAction = authActionClient
  .schema(recoverPasswordSchema)
  .metadata({
    name: 'Recover Password',
  })
  .stateAction(async ({ parsedInput: params }) => {
    const result = await recoverPasswordQuery(params)

    return { redirectTo: result.redirectTo }
  })
