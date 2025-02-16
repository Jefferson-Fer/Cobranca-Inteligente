'use server'

import { unstable_cacheTag as cacheTag } from 'next/cache'

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

export const getAllProfiles = async () => {
  'use cache'
  cacheTag('profiles')
  const profiles = await Queries.getAllProfilesQuery()

  return profiles
}

export const getClientsByProfile = async (profileId: string) => {
  'use cache'
  cacheTag('clients' + profileId)
  const clients = await Queries.getClientsByProfileQuery(profileId)

  return clients
}

export const getSearchClients = async (search?: string, profileId?: string) => {
  'use cache'
  cacheTag('clients' + profileId)
  const clients = await Queries.getSearchClientsQuery(search, profileId)

  return clients
}

export const getChargeById = async (id: string) => {
  'use cache'
  cacheTag('charge' + id)
  const charge = await Queries.getChargeByIdQuery(id)

  return charge
}

export const getChargesByProfile = async (profileId: string) => {
  'use cache'
  cacheTag('charges' + profileId)
  const charges = await Queries.getChargesByProfileQueryList(profileId)

  return {
    charges: charges.charges,
    count: charges.count,
  }
}
