import { ReactNode } from 'react'

export default async function LobbyLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className="relative flex flex-col min-h-screen">{children}</div>
}
