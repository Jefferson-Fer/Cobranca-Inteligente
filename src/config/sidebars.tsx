import { TypeProfile } from '@prisma/client'

import { Icons } from '@/components/icons'

export type SidebarLink = {
  title: string
  url: string
  icon: keyof typeof Icons
  hideTo?: TypeProfile[]
}

export type NewSidebarLink = {
  title: string
  url: string
  isActive?: boolean
  icon?: keyof typeof Icons
  hideTo?: TypeProfile[]
  items?: SidebarLink[]
}

export const sidebarOdin: NewSidebarLink[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: 'home',
  },
  {
    title: 'Usuários',
    url: '/users',
    icon: 'user',
  },
]

export const sidebarUser: NewSidebarLink[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: 'home',
  },
  {
    title: 'Clientes',
    url: '/clientes',
    icon: 'costumers',
  },
  {
    title: 'Cobranças',
    url: '/cobrancas',
    icon: 'money',
  },
]
