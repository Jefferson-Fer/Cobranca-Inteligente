import { Icons } from '@/components/icons'
import { ChangeThemeButton } from '@/components/Sidebar/ChangeThemeButton'
import { DropdownLogoutButton } from '@/components/Sidebar/DropdownLogoutButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button/index'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Text } from '@/components/ui/text'
import { ProfileAuth } from '@/contracts/profile'

interface DropdownSidebarUserProps {
  profile: ProfileAuth
  variant?: 'secondary' | 'navsidebar'
}
export function DropdownSidebarUser({
  profile,
  variant = 'secondary',
}: DropdownSidebarUserProps) {
  const { name, image } = profile

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === 'navsidebar' ? (
          <Button
            variant="navsidebar"
            className="text-center w-full group-[.isOpen]:text-left"
          >
            <Avatar className="size-8">
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
            <div className="flex flex-col -space-y-2 items-start group-[.isOpen]:hidden">
              <Text as="span" scale="sm" weight="semibold" className="truncate">
                {name}
              </Text>
            </div>
            <Icons.updown className="size-4 text-muted-foreground block group-[.isOpen]:hidden" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full p-0 lg:hidden"
          >
            <Avatar className="size-8">
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
            <span className="sr-only">Toggle user menu</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          <Icons.user className="size-4" />
          Perfil
        </DropdownMenuItem>
        <ChangeThemeButton />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          <Icons.settings className="size-4" />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownLogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
