'use client'

import * as React from 'react'

import { NavMain } from '@/components/Sidebar/nav-main'
import { NavUser } from '@/components/Sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { sidebarOdin, sidebarUser } from '@/config/sidebars'
import { ProfileAuth } from '@/contracts/profile'
import { toTitleCase } from '@/lib/utils'

import { Icons } from '../icons'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  type: 'user' | 'odin'
  profile: ProfileAuth
}

export function AppSidebar({
  type = 'user',
  profile,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Icons.logoIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">CobraInt</span>
                <span className="truncate text-xs">{toTitleCase(type)}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          links={type === 'user' ? sidebarUser : sidebarOdin}
          baseUrl={type === 'user' ? '/conta' : '/odin'}
          userType={profile.role}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser profile={profile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
