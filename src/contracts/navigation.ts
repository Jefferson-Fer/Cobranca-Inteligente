import { Icons } from '@/components/icons'

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type PanelType = 'odin' | 'user'

export type DepartmentNavigationResponse = {
  name: string
  slug: string
  brands: {
    name: string
    slug: string
  }[]
  categories: {
    name: string
    slug: string
  }[]
  smallBanner?: {
    src: string
    alt: string
  }
}

export type SubItemNavigation = {
  defaultValue: string
  items: DepartmentNavigationResponse[]
}
