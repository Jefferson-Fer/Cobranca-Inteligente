import React from 'react'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Text } from '../ui/text'

interface CardInfoProps {
  title: string
  description?: string
  children: React.ReactNode
  icon?: keyof typeof Icons
  className?: string
}

export default function CardInfo({
  title,
  description,
  children,
  icon,
  className,
}: CardInfoProps) {
  return (
    <Card className={cn('w-full rounded-md', className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <Text scale={'lg'} weight={'bold'}>
            {title}
          </Text>
          {icon && React.createElement(Icons[icon], { className: 'size-4' })}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
