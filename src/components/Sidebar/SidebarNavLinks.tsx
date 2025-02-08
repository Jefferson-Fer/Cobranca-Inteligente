'use client'

import { useMemo } from 'react'

import { TypeProfile } from '@prisma/client'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { SidebarLink } from '@/config/sidebars'
import { cn } from '@/lib/utils'

import { Icons } from '../icons'

interface SidebarNavLinksProps {
  links: SidebarLink[]
  baseUrl: string
  userType: TypeProfile
}

export function SidebarNavLinks({
  links,
  baseUrl,
  userType,
}: SidebarNavLinksProps) {
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
        actived:
          (link && link.url?.includes(String(segment))) ||
          (link.url === '/' && !segment),
      }))
  }, [links, segment, userType])

  return sidebarLinksWithActived.map(({ url, icon, title, actived }) => (
    <Link
      key={title}
      href={`${baseUrl}${url}`}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary-foreground hover:bg-primary group-[.isOpen]:justify-center h-8',
        {
          'bg-primary text-primary-foreground': actived,
        },
      )}
    >
      {IconLink(icon)}
      <span className="block group-[.isOpen]:hidden">{title}</span>
    </Link>
  ))
}
