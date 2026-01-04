import { AppSidebar } from '@/components/nav/AppSidebar'
import { HeaderBar } from '@/components/nav/HeaderBar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

function AdminPanel() {
  return (
    <div className="flex max-h-screen bg-background w-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-auto w-full ">
          <header className="flex shrink-0 items-center gap-2 px-4 bg-surface sticky top-0 z-40">
            <SidebarTrigger className="-ml-1 cursor-pointer text-primary-foreground hover:text-foreground" />
            <HeaderBar />
          </header>
          <main className="p-5 relative ">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default AdminPanel
