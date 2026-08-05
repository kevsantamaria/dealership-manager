import CustomBreadcrumb from '@/shared/components/layout/custom-breadcumb'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { IconUserHexagon } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export const HeaderBar = () => {
  const { logout, user } = useAuth()
  const navigation = useNavigate()

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => navigation('/login'),
    })
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
            <DropdownMenuLabel className="capitalize">
              {user?.username}
            </DropdownMenuLabel>
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
