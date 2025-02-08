import { ReactNode } from 'react'

import { Alert, AlertTitle, AlertDescription } from './alert'
import { Icons } from '../icons'
import { AlertVariants } from './alert/styles'

interface AlertCardProps {
  title: string
  description: string
  icon?: keyof typeof Icons
  variant?: AlertVariants['variant']
  children?: ReactNode
}

export function AlertCard({
  title,
  description,
  icon,
  variant = 'default',
  children,
}: AlertCardProps) {
  const Icon = icon ? Icons[icon] : null

  return (
    <Alert variant={variant} className="w-full">
      {Icon && <Icon className="size-6" />}
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        {children}
      </div>
    </Alert>
  )
}
