import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

import { BadgeVariantsType, badgeVariants } from './styles'

export type BadgeProps = ComponentProps<'div'> & BadgeVariantsType

type BadgeAttributesProps = BadgeProps & {
  title: string
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

function BadgeAttributes({
  className,
  variant = 'attributes',
  children,
  title,
  ...props
}: BadgeAttributesProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {title}
      <div className="h-full w-1/2  text-gray-200">{children}</div>
    </div>
  )
}

export { Badge, BadgeAttributes, badgeVariants }
