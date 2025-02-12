import { Ratelimit } from '@upstash/ratelimit'
import { headers } from 'next/headers'
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from 'next-safe-action'
import { z } from 'zod'

import { ProfileAuth } from '@/contracts/profile'
import { prisma } from '@/lib/prisma'
import { client as RedisClient } from '@/lib/redis'
import { createServerClient as createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/utils'

import { getProfile, getUser } from './prisma/queries/cached-queries'

const ratelimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(10, '10s'),
  redis: RedisClient,
})

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})

export const actionClientWithMeta = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
      track: z
        .object({
          event: z.string(),
          channel: z.string(),
        })
        .optional(),
    })
  },
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})

export const authActionClient = actionClientWithMeta
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next({ ctx: undefined })

    if (process.env.NODE_ENV === 'development') {
      logger('Input ->', clientInput)
      logger('Result ->', result.data)
      logger('Metadata ->', metadata)

      return result
    }

    return result
  })
  .use(async ({ next, metadata }) => {
    const ip = (await headers()).get('x-forwarded-for')

    const { success, remaining } = await ratelimit.limit(`${ip}-${metadata}`)

    if (!success) {
      throw new Error('Muitas requisições')
    }

    return next({
      ctx: {
        ratelimit: {
          remaining,
        },
      },
    })
  })
  .use(async ({ next }) => {
    const user = await getUser()
    const supabase = await createClient({ admin: true })
    let profile: ProfileAuth | null = null

    if (!user) {
      throw new Error('Não autorizado')
    }

    const hasProfile = await getProfile()

    if (!hasProfile) {
      throw new Error('Perfil de usuário não encontrado')
    }

    profile = hasProfile

    return next({
      ctx: {
        supabase,
        //analytics,
        user,
        prisma,
        profile,
      },
    })
  })
