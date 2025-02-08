'use client'

import { useCallback, useEffect } from 'react'

import { useTheme } from 'next-themes'

import { Icons } from '@/components/icons'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function ChangeThemeButton() {
  const { theme, setTheme } = useTheme()

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'm') {
        event.preventDefault()
        handleChangeTheme()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleChangeTheme])

  return (
    <DropdownMenuItem
      onClick={handleChangeTheme}
      className="flex cursor-pointer items-center gap-2"
    >
      <Icons.moon className="absolute size-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Icons.sun className="size-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      {theme === 'light' ? <span>Tema escuro</span> : <span>Tema claro</span>}
      <div className="ml-auto text-sm text-gray-500">⌘+M</div>
    </DropdownMenuItem>
  )
}
