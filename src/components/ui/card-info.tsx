import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Headline } from '@/components/ui/headline'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface CardInfoProps {
  title?: string
  description?: string
  children: React.ReactNode
  action?: React.ReactNode
  className?: string
}
export const CardInfo = ({
  title,
  description,
  children,
  className,
  action,
}: CardInfoProps) => {
  return (
    <Card className={cn('w-full rounded-md', className)}>
      <CardHeader className="pb-2 space-y-0">
        <div className="flex items-center justify-between">
          <Headline as="h2" variant="black">
            {title}
          </Headline>
          {action}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        <Separator className="mb-4" />
        {children}
      </CardContent>
    </Card>
  )
}
