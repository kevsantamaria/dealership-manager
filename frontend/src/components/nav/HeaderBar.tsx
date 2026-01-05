import CustomBreadcrumb from '@/components/nav/CustomBreadcumb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLoginStore } from '@/store/loginStore'
import { IconUserHexagon } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export const HeaderBar = () => {
  const logoutStore = useLoginStore((state) => state.logoutStore)
  const user = useLoginStore((state) => state.user)
  const navigation = useNavigate()

  const handleLogout = () => {
    logoutStore()
    navigation('/login')
  }

  return (
    <>
      <header className="relative p-3 w-full z-999999 flex h-14 items-center gap-4 border-b bg-surface px-4 opacity-100 sm:h-auto sm:border-0 sm:px-6 justify-between backdrop-blur-md">
        <div className="md:hidden">
          <div>
            <h1 className="text-lg font-semibold text-primary-foreground">
              Dealership Manager
            </h1>
          </div>
        </div>

        <CustomBreadcrumb />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <IconUserHexagon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive"
            >
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  )
}
