'use server'

import { forgotPasswordQuery } from '@/lib/prisma/mutations'
import { actionClientWithMeta } from '@/lib/safe-action'
import { forgotPasswordSchema } from '@/validators/signup-validator'

export const forgotPasswordAction = actionClientWithMeta
  .schema(forgotPasswordSchema)
  .metadata({
    name: 'Forgot Password',
  })

  .stateAction(async ({ parsedInput: params }) => {
    await forgotPasswordQuery(params)
  })
