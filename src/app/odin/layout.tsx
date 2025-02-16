import { redirect } from 'next/navigation'

import { AppSidebar } from '@/components/Sidebar/app-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarProvider } from '@/components/ui/sidebar'
import { PreferencesType } from '@/contracts/profile'
import { getProfile, getUser } from '@/lib/prisma/queries/cached-queries'
interface OdinLayoutProps {
  children: React.ReactNode
}

export default async function OdinLayout({ children }: OdinLayoutProps) {
  const user = await getUser()

  if (!user) {
    return redirect('/')
  }

  const profile = await getProfile()

  if (!profile) {
    return redirect('/')
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
          <AppSidebar type="odin" profile={profile} />
          <div className="flex flex-col w-full">
            <ScrollArea className="w-full">
              <div className="flex flex-col gap-4 lg:gap-2 p-4 h-full max-w-screen-xl xl:mx-auto">
                {children}
              </div>
            </ScrollArea>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
