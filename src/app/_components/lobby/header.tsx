import { ButtonLink } from '@/components/ui/button-link'

import { MainNavLobby } from './nav-lobby'

export default function HeaderLobby() {
  return (
    <header className="sticky top-0 shadow-md z-50 w-full pointer-events-auto px-4 md:px-6 lg:px-12 2xl:px-24 bg-primary">
      <nav className="flex-1 flex justify-between gap-4 h-20 items-center">
        <MainNavLobby />
        <ButtonLink
          href="/sign-in"
          className="flex items-center md:justify-center bg-foreground"
        >
          Acessar
        </ButtonLink>
      </nav>
    </header>
  )
}
