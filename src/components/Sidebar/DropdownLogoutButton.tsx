'use client'

import { useTransition } from 'react'

import { toast } from 'sonner'

import { signOutAction } from '@/actions/auth/signout-action'
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'

import { Icons } from '../icons'
interface DropdownLogoutButtonProps {
  shortcut?: string
}

export function DropdownLogoutButton({ shortcut }: DropdownLogoutButtonProps) {
  const [isPending, startTransition] = useTransition()

  function handleLogout() {
    startTransition(async () => {
      try {
        await signOutAction()

        toast.success('Saiu da conta com sucesso')
      } catch (error) {
        toast.error('Falha ao sair da Conta', {
          description:
            'Não conseguimos sair da conta, tente novamente mais tarde',
        })
        console.log('error', error)
      }
    })
  }

  return (
    <DropdownMenuItem
      className="flex cursor-pointer items-center gap-2"
      onClick={handleLogout}
    >
      <Icons.logout className="size-4" />
      {isPending ? 'Saindo...' : 'Sair'}
      <span className="sr-only">Sair da Conta</span>
      {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
    </DropdownMenuItem>
  )
}
