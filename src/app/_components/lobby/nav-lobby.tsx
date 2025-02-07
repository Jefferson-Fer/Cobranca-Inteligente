'use client'

import { useState } from 'react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button/index'
import { ButtonLink } from '@/components/ui/button-link'
import { Headline } from '@/components/ui/headline'
import { lobbyNavigation } from '@/config/navigation'

export function MainNavLobby() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full flex items-center md:justify-center bg-primary">
      <ButtonLink href="/" className="hidden md:flex shadow-none">
        <Headline variant="white">CobraInt</Headline>
      </ButtonLink>
      <ul className="hidden md:flex flex-1 items-center justify-center space-x-8 p-4">
        {lobbyNavigation.map((item) => (
          <li key={item.id}>
            <Button onClick={() => handleClick(item.id)}>{item.label}</Button>
          </li>
        ))}
      </ul>
      <Button onClick={toggleMenu} className="md:hidden">
        <Icons.menu />
      </Button>
      {isMenuOpen && (
        <ul className="absolute top-12 left-0 p-4 bg-primary rounded-md">
          {lobbyNavigation.map((item) => (
            <li key={item.id}>
              <Button
                className="shadow-none"
                onClick={() => handleClick(item.id)}
              >
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
