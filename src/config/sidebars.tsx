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
  icon: keyof typeof Icons
  isActive?: boolean
  hideTo?: TypeProfile[]
  items?: NewSidebarLink[]
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
    title: 'Clientes',
    url: '/clientes',
    icon: 'costumers',
    items: [
      {
        title: 'Listagem',
        url: '/clientes',
        icon: 'list',
      },
    ],
  },
  {
    title: 'Cobranças',
    url: '/cobrancas',
    icon: 'money',
    items: [
      {
        title: 'Mensalidades',
        url: '/cobrancas/mensalidades',
        icon: 'repeat',
      },
      {
        title: 'Parcelamentos',
        url: '/cobrancas/parcelamentos',
        icon: 'installments',
      },
    ],
  },
  {
    title: 'Relatórios',
    url: '/relatorios',
    icon: 'barChart',
    items: [
      {
        title: 'Listagem',
        url: '/relatorios',
        icon: 'list',
      },
    ],
  },
]
