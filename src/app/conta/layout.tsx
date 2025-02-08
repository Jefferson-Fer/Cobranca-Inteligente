import { redirect } from 'next/navigation'

import { AppSidebar } from '@/components/Sidebar/app-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarProvider } from '@/components/ui/sidebar'
import { PreferencesType } from '@/contracts/profile'
import { getProfile } from '@/lib/prisma/queries/cached-queries'

import { HeaderAccount } from '../_components/conta/header'

interface ContaLayoutProps {
  children: React.ReactNode
}

export default async function ContaLayout({ children }: ContaLayoutProps) {
  const profile = await getProfile()

  if (!profile) {
    return redirect('/sign-in')
  }

  const { theme } = (profile.preferences as PreferencesType) ?? {}

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={theme ?? 'system'}
      enableSystem
    >
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden w-full">
          <AppSidebar type="user" profile={profile} />
          <aside className="flex flex-col w-full">
            <HeaderAccount />
            <ScrollArea className="w-full">
              <div className="flex flex-col gap-4 lg:gap-6 p-4 h-full max-w-screen-xl xl:mx-auto">
                {children}
              </div>
            </ScrollArea>
          </aside>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
