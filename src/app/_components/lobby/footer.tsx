import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button/index'
import { ButtonLink } from '@/components/ui/button-link'
import { Headline } from '@/components/ui/headline'
import { Text } from '@/components/ui/text'
import { lobbyNavigation } from '@/config/navigation'

export default function Footer() {
  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="flex bg-primary px-8 md:px-12 lg:px-16 2xl:px-24">
      <div className="w-full  flex flex-col min-h-64 gap-4">
        <ButtonLink href="/" className="flex mt-6 justify-start">
          <Headline variant="white">CobraInt</Headline>
        </ButtonLink>
        <div className="w-full flex justify-between gap-4">
          <nav className="flex-1 hidden md:flex flex-col gap-1 ">
            {lobbyNavigation.map((item) => (
              <Button
                onClick={() => handleClick(item.id)}
                title={item.label}
                variant="whiteLink"
                key={item.id}
              >
                {item.label}
              </Button>
            ))}
          </nav>
          <div className="mt-6 md:mt-0 flex flex-col gap-4">
            <Text weight="semibold" variant="white">
              Redes Sociais
            </Text>
            <div className="flex gap-4 text-background">
              <Icons.facebook className="size-6" />
              <Icons.instagram className="size-6" />
              <Icons.linkedin className="size-6" />
              <Icons.twitter className="size-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
