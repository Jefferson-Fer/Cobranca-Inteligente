import Image from 'next/image'

import { ButtonLink } from '@/components/ui/button-link'
import { Headline } from '@/components/ui/headline'
import { Text } from '@/components/ui/text'

export default function Hero() {
  return (
    <div className="flex bg-muted px-8 md:px-12 lg:px-16 2xl:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center min-h-[350px] md:min-h-[500px] gap-2">
          <Headline size="3xl" variant="black">
            Gerencie suas vendas e optimize seu negócio
          </Headline>
          <Text scale="xl" variant="body">
            Solução de cobrança automática para agilizar e profissionalizar seu
            negócio.
          </Text>
          <ButtonLink href="/sign-in" w={'auto'} className="self-start">
            Acessar
          </ButtonLink>
        </div>
        <div className="hidden md:flex w-full flex-col items-center justify-center gap-2">
          <Image
            src="/images/lobby_hero.png"
            alt="Hero"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </div>
  )
}
