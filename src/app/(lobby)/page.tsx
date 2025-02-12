import { Metadata } from 'next'

import HeaderLobby from '@/app/_components/lobby/header'
import { env } from '@/lib/env'

import { MainLobby } from './_components/main-lobby'

const title = 'CobraInt'
const description = 'Sistema de Gestão de Vendas'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default function LobbyPage() {
  return (
    <>
      <HeaderLobby />
      <MainLobby />
    </>
  )
}
