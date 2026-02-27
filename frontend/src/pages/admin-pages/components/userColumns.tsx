import EditUserDialog from '@/components/modal/EditUserDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { User } from '@/types/user'
import { IconShieldCheck, IconTrash, IconUser } from '@tabler/icons-react'
import type { ColumnDef } from '@tanstack/react-table'

export const userColumns = (
  onDelete: (user: User) => void
): ColumnDef<User>[] => [
  {
    accessorKey: 'username',
    header: 'Usuario',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <IconUser className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.getValue('username')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => {
      const role = row.getValue('role') as string
      const isAdmin = role === 'admin'

      return (
        <Badge
          variant={isAdmin ? 'default' : 'secondary'}
          className="flex w-fit items-center gap-1 capitalize"
        >
          {isAdmin && <IconShieldCheck className="h-3 w-3" />}
          {role}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex justify-end gap-2">
          <EditUserDialog userId={user.id} user={user} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(user)}
            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <IconTrash className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
