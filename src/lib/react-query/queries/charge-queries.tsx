import { queryOptions, useQuery } from '@tanstack/react-query'

import { getSearchClients } from '@/lib/prisma/queries/cached-queries'

const getClientsOptions = async (search?: string, profileId?: string) => {
  const response = await getSearchClients(search, profileId)
  return response
}

export function useGetClientsOptions(search: string, profileId: string) {
  return useQuery(
    queryOptions({
      queryKey: ['clients-options', search, profileId],
      queryFn: () => getClientsOptions(search, profileId),
    }),
  )
}
