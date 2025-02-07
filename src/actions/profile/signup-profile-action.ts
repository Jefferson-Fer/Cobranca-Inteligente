'use server'

import { TypeProfile } from '@prisma/client'
import { revalidateTag } from 'next/cache'

import { createUserProfileQuery } from '@/lib/prisma/mutations/profile'
import { getUserByEmailQuery } from '@/lib/prisma/queries/no-cached-queries/user'
import { actionClientWithMeta } from '@/lib/safe-action'
import { createServerClient } from '@/lib/supabase/server'
import { getURL } from '@/lib/utils'
import { signUpSchema } from '@/validators'

export const signUpProfileAction = actionClientWithMeta
  .schema(signUpSchema)
  .metadata({
    name: 'signUp Profile Action',
  })
  .stateAction(async ({ parsedInput: params }) => {
    const { name, email, lastName, password } = params

    const hasEmail = await getUserByEmailQuery(email)

    if (hasEmail) {
      throw new Error('Usuário já cadastrado')
    }

    const redirectTo = `${getURL()}confirmacao?email=${email}`
    const supabase = await createServerClient()

    const { data: dataUser, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: TypeProfile.USER,
        },
        emailRedirectTo: redirectTo,
      },
    })

    if (error || !dataUser.user?.id) {
      throw new Error('Erro ao criar usuário')
    }

    await createUserProfileQuery({
      name,
      lastName,
      userId: dataUser.user.id,
    })

    revalidateTag('profile_list')

    return { redirectTo }
  })
