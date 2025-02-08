import { Headline } from '@/components/ui/headline'
import { Text } from '@/components/ui/text'

interface HeaderFormProps {
  title: string
  description: string
}

export function HeaderForm({ title, description }: HeaderFormProps) {
  return (
    <div className="grid gap-2 text-center">
      <Headline variant="black">{title}</Headline>
      <Text variant="body">{description}</Text>
    </div>
  )
}
