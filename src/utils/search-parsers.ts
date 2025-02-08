import { Charge, Client } from '@prisma/client'

import { ParamsTypes, SearchParamsTypes } from '@/contracts/commons'

const getLimit = (per_page: ParamsTypes) =>
  typeof per_page === 'string' ? parseInt(per_page) : 10

const getOffset = (page: ParamsTypes, limit: number) =>
  typeof page === 'string'
    ? parseInt(page) > 0
      ? (parseInt(page) - 1) * limit
      : 0
    : 0
const getDateParam = (date: ParamsTypes) =>
  typeof date === 'string' ? new Date(date) : undefined

const getColumnOrder = <T>(sort: ParamsTypes) =>
  typeof sort === 'string'
    ? (sort.split('.') as [keyof T | undefined, 'asc' | 'desc' | undefined])
    : []

export const searchCategoriesParse = async (
  searchParams: SearchParamsTypes['searchParams'],
) => {
  const { page, per_page, sort, name, from, to } = searchParams ?? {}
  const limit = getLimit(per_page)
  const [column, order] = getColumnOrder<Client>(sort)

  return {
    limit,
    offset: getOffset(page, limit),
    fromDay: getDateParam(from),
    toDay: getDateParam(to),
    column,
    order,
    search: typeof name === 'string' ? name : undefined,
  }
}

export const searchChargesParse = async (
  searchParams: SearchParamsTypes['searchParams'],
) => {
  const { page, per_page, sort, name, from, to } = searchParams ?? {}
  const limit = getLimit(per_page)
  const [column, order] = getColumnOrder<Charge>(sort)

  return {
    limit,
    offset: getOffset(page, limit),
    fromDay: getDateParam(from),
    toDay: getDateParam(to),
    column,
    order,
    search: typeof name === 'string' ? name : undefined,
  }
}
