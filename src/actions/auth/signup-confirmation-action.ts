'use server'

import { signUpConfirmationQuery } from '@/lib/prisma/mutations/auth'
import { actionClientWithMeta } from '@/lib/safe-action'
import { getURL } from '@/lib/utils'
import { signUpConfirmationSchema } from '@/validators/signup-validator'

export const signUpConfirmationAction = actionClientWithMeta
  .schema(signUpConfirmationSchema)
  .metadata({
    name: 'Sign Up Confirmation',
  })
  .stateAction(async ({ parsedInput: params }) => {
    console.log('params', params)
    await signUpConfirmationQuery(params)

    return { redirectTo: `${getURL()}sign-in` }
  })
