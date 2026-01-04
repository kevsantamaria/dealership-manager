import { data } from '@/components/nav/data/sidebarData'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Link } from 'react-router-dom'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center">
            <img
              src="/favicon.svg"
              alt="Dealership Manager Logo"
              className="h-10 w-10 m-2"
            />
            <h1 className="text-xl font-semibold">Dealership Manager</h1>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="border-l border-sidebar-border ml-2 p-2">
              <SidebarMenu>
                {item.subitems.map((sub) => (
                  <SidebarMenuItem key={sub.title}>
                    <SidebarMenuButton asChild>
                      <Link to={`/dashboard${item.url}${sub.url}`}>
                        {sub.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
