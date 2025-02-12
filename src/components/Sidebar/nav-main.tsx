'use client'

import { useMemo } from 'react'

import { TypeProfile } from '@prisma/client'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { NewSidebarLink } from '@/config/sidebars'

import { Icons } from '../icons'

interface NavMainProps {
  links: NewSidebarLink[]
  baseUrl: string
  userType: TypeProfile
}

export function NavMain({ links, baseUrl, userType }: NavMainProps) {
  const segment = useSelectedLayoutSegment()

  const IconLink = (icon: keyof typeof Icons) => {
    const Icon = Icons[icon]
    return <Icon className="size-4" />
  }

  const sidebarLinksWithActived = useMemo(() => {
    return links
      .filter((link) => !link.hideTo?.includes(userType))
      .map((link) => ({
        ...link,
        items: link.items?.filter((item) => !item.hideTo?.includes(userType)),
        actived:
          link.isActive ||
          (link && link.url?.includes(String(segment))) ||
          (link.url === '/' && !segment),
      }))
  }, [links, segment, userType])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>General</SidebarGroupLabel>
      <SidebarMenu>
        {sidebarLinksWithActived.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild>
                  {item.items ? (
                    <>
                      {item.icon && IconLink(item.icon)}
                      <span>{item.title}</span>
                      <Icons.chevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </>
                  ) : (
                    <Link key={item.title} href={`${baseUrl}${item.url}`}>
                      {IconLink(item.icon as keyof typeof Icons)}
                      <span className="block group-[.isOpen]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          key={subItem.title}
                          href={`${baseUrl}${subItem.url}`}
                        >
                          {IconLink(subItem.icon)}
                          <span className="block group-[.isOpen]:hidden">
                            {subItem.title}
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
