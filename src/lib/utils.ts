import { TypeProfile } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

import { ContaNavigation } from '@/config/navigation'
import { OdinNavigation } from '@/config/navigation'

import { env } from './env'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validatePathByRole = (pathname: string, role: TypeProfile) => {
  const atOdin = pathname.startsWith('/odin')
  const atConta = pathname.startsWith('/conta')

  const signInAccountPath = '/sign-in'

  const validationPath = {
    [TypeProfile.ADMIN]: {
      isValidPath: atOdin,
      signInPath: signInAccountPath,
      dashboardPath: '/odin',
    },
    [TypeProfile.USER]: {
      isValidPath: atConta,
      signInPath: signInAccountPath,
      dashboardPath: '/conta',
    },
  }

  return validationPath[role]
}

export const getURL = () => {
  let url =
    env.NODE_ENV === 'production'
      ? env.NEXT_PUBLIC_VERCEL_URL
      : env.NEXT_PUBLIC_APP_URL
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`
  return url
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  )
}

export const makeBreadcrumbByKeys = (
  keys: string[],
  type: 'odin' | 'conta',
) => {
  const path = keys
    .map((key) =>
      type === 'odin'
        ? OdinNavigation.find((item) => item.key === key)
        : ContaNavigation.find((item) => item.key === key),
    )
    .filter(Boolean)

  return path.map((item) => ({
    label: item!.label,
    href: item!.href,
  }))
}

export const logger = (message: string, params?: unknown) => {
  console.log(message, params)
}

export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
}

export function formatDate(date: Date | string | number, short = false) {
  if (short) {
    return dayjs(date).format('DD/MM/YYYY')
  }

  return new Intl.DateTimeFormat('pt-BR', {
    month: short ? 'short' : 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatMoney(
  amount: number,
  currency: string = 'BRL',
  locale: string = 'pt-BR',
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
