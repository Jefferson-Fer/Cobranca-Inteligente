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
    title: 'Usuários',
    url: '#',
    icon: 'costumers',
    items: [
      {
        title: 'Listagem',
        url: '/users',
        icon: 'list',
      },
      {
        title: 'Ativos',
        url: '/users/active',
        icon: 'user_active',
      },
      {
        title: 'Inativos',
        url: '/users/inactive',
        icon: 'user_inactive',
      },
    ],
  },
  {
    title: 'Relatórios',
    url: '#',
    icon: 'barChart',
    items: [
      {
        title: 'Listagem',
        url: '/reports',
        icon: 'list',
      },
    ],
  },
  {
    title: 'Configurações',
    url: '#',
    icon: 'settings',
    items: [
      {
        title: 'Listagem',
        url: '/settings',
        icon: 'list',
      },
    ],
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
