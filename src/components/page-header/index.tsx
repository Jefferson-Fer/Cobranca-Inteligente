import { ReactNode } from 'react'

import { cn, makeBreadcrumbByKeys } from '@/lib/utils'

import BreadcrumbDashboard from '../breadcrumb-dashboard'
import { Icons } from '../icons'
import { Headline } from '../ui/headline'
import { Text } from '../ui/text'

interface PageHeaderProps {
  title: string
  icon?: keyof typeof Icons
  children?: ReactNode
  description?: string | null
  className?: string
  breadcrumbLinks?: string[]
  pageType?: 'odin' | 'conta'
}

export const PageHeader = ({
  title,
  icon,
  children,
  description,
  className,
  breadcrumbLinks,
  pageType = 'conta',
}: PageHeaderProps) => {
  const Icon = Icons[icon ?? 'chevronLeft'] ?? null
  const links = makeBreadcrumbByKeys(breadcrumbLinks ?? [], pageType)
  return (
    <header className={cn('flex flex-col gap-1 mb-4', className)}>
      {breadcrumbLinks && <BreadcrumbDashboard links={links} />}
      <div className="flex flex-col sm:flex-row gap-2 justify-start sm:justify-between items-center">
        <div className="flex flex-col gap-1 w-full">
          <Headline
            variant="heading"
            size="lg"
            className="flex gap-2 items-center text-left"
          >
            {icon && <Icon />} {title}
          </Headline>
          {description && <Text variant="body">{description}</Text>}
        </div>
        {children}
      </div>
    </header>
  )
}
