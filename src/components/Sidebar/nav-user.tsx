'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { ProfileAuth } from '@/contracts/profile'

import { ChangeThemeButton } from './ChangeThemeButton'
import { DropdownLogoutButton } from './DropdownLogoutButton'
import { Icons } from '../icons'

interface NavUserProps {
  profile: ProfileAuth
}

export function NavUser({ profile }: NavUserProps) {
  const { isMobile } = useSidebar()
  const { name, email, image } = profile

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                {image && (
                  <AvatarImage
                    src={image}
                    alt={`Avatar do usuário ${name}`}
                    className="size-8"
                  />
                )}
                <AvatarFallback>
                  <Icons.user className="size-8" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{name}</span>
              </div>
              <Icons.updown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  {image && <AvatarImage src={image} alt={name} />}
                  <AvatarFallback className="rounded-lg">
                    <Icons.user className="size-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="items-center gap-2">
                <Icons.user className="size-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="items-center gap-2">
                <Icons.notifications className="size-4" />
                Notificações
              </DropdownMenuItem>
              <ChangeThemeButton />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownLogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
