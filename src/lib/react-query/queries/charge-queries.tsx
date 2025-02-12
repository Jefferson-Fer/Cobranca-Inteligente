import { queryOptions, useQuery } from '@tanstack/react-query'

import { getSearchClients } from '@/lib/prisma/queries/cached-queries'

const getClientsOptions = async (search?: string) => {
  const response = await getSearchClients(search)
  return response
}

export function useGetClientsOptions(search: string) {
  return useQuery(
    queryOptions({
      queryKey: ['clients-options', search],
      queryFn: () => getClientsOptions(search),
    }),
  )
}
