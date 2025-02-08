import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function HeaderAccount() {
  return (
    <header className="flex h-14 items-center justify-between gap-2 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <SidebarTrigger />

      <Button variant="outline" size="icon" className="px-2">
        <Icons.notifications className="size-4" />
      </Button>
    </header>
  )
}
