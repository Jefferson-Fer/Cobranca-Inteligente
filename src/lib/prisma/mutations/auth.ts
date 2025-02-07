'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { getURL } from 'next/dist/shared/lib/utils'
import { cookies as cookiesHeaders } from 'next/headers'

import { createServerClient } from '@/lib/supabase/server'
import * as validators from '@/validators'

import { prisma } from '..'

export const forgotPasswordQuery = async ({
  email,
  token,
}: validators.FogotPasswordSchemaType) => {
  const supabase = await createServerClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}/loja/nova-senha`,
    captchaToken: token,
  })

  if (error) {
    throw new Error('Erro ao enviar e-mail')
  }
}

export const recoverPasswordQuery = async ({
  password,
}: validators.RecoverPasswordSchemaType) => {
  const cookies = await cookiesHeaders()

  const supabase = await createServerClient({ admin: true })
  let redirectTo = '/entrar'
  const userId = cookies.get('tmp_user_id')?.value

  if (!userId) {
    throw new Error('Erro ao atualizar a senha')
  }

  const {
    error,
    data: { user },
  } = await supabase.auth.admin.updateUserById(userId, {
    password,
  })

  if (error) {
    throw new Error('Erro ao atualizar a senha')
  }

  cookies.delete('tmp_user_id')

  if (user) {
    const { user_metadata } = user
    const { role } = user_metadata

    if (['MANAGER', 'SELLER'].includes(role)) {
      redirectTo = '/loja/entrar'
    }

    if (role === 'ADMIN') {
      redirectTo = '/kratos/entrar'
    }

    if (role === 'USER') {
      redirectTo = '/entrar'
    }
  }

  return { redirectTo }
}

export const signUpConfirmationQuery = async ({
  pin,
  email,
}: validators.SignUpConfirmationSchemaType) => {
  const supabase = await createServerClient()

  const {
    error,
    data: { user },
  } = await supabase.auth.verifyOtp({
    email,
    token: pin,
    type: 'email',
  })

  if (error || !user) {
    throw new Error('Erro ao confirmar e-mail')
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (!profile) {
    throw new Error('Perfil não encontrado')
  }

  await prisma.profile.update({
    where: {
      id: profile.id,
    },
    data: {
      status: 'ACTIVE',
    },
  })

  revalidatePath('/conta')
  revalidatePath('/odin')

  revalidateTag('profiles')

  return { redirectTo: `${getURL()}/sign-in` }
}
