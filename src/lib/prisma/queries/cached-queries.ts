'use server'

import { unstable_cacheTag as cacheTag } from 'next/cache'

import { FindChargesList } from '@/contracts/charges'
import { createServerClient } from '@/lib/supabase/server'

import * as Queries from './no-cached-queries'

export const getUser = async () => {
  const supabase = await createServerClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return null
  }

  const user = Queries.getUserQuery(data.user.id)

  if (!user) {
    return null
  }

  return user
}

export const getProfile = async () => {
  const user = await getUser()

  if (!user) {
    return null
  }

  const profile = await Queries.getProfileQuery(user)

  if (!profile) {
    return null
  }

  return profile
}

export const getClientsByProfile = async (profileId: string) => {
  'use cache'
  cacheTag('clients' + profileId)
  const clients = await Queries.getClientsByProfileQuery(profileId)

  return clients
}

export const getSearchClients = async (search?: string) => {
  'use cache'
  cacheTag('clients')
  const clients = await Queries.getSearchClientsQuery(search)

  return clients
}

export const getChargesByProfile = async (
  params: FindChargesList,
  profileId: string,
) => {
  'use cache'
  cacheTag('charges' + profileId)
  const charges = await Queries.getChargesByProfileQueryList(params, profileId)

  return {
    charges: charges.charges,
    count: charges.count,
  }
}
