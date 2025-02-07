'use server'

import { signUpConfirmationQuery } from '@/lib/prisma/mutations/auth'
import { actionClientWithMeta } from '@/lib/safe-action'
import { signUpConfirmationSchema } from '@/validators/signup-validator'

export const signUpConfirmationAction = actionClientWithMeta
  .schema(signUpConfirmationSchema)
  .metadata({
    name: 'Sign Up Confirmation',
  })
  .stateAction(async ({ parsedInput: params }) => {
    const result = await signUpConfirmationQuery(params)

    return result
  })
