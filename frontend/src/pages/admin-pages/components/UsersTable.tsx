import EditUserDialog from '@/components/modal/EditUserDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useUsers } from '@/hooks/useUsers'
import type { User } from '@/types/user'
import {
  IconShieldCheck,
  IconTrash,
  IconUser as UserIcon,
} from '@tabler/icons-react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'

const columns = (onDelete: (user: User) => void): ColumnDef<User>[] => [
  {
    accessorKey: 'username',
    header: 'Usuario',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <UserIcon className="h-4 w-4 text-muted-foreground" />
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

function UsersTable() {
  const { getUsers, deleteUserById } = useUsers()
  const { data, isLoading } = getUsers

  const handleDelete = (user: User) => {
    deleteUserById.mutateAsync(user.id)
  }

  const table = useReactTable({
    data,
    columns: columns(handleDelete),
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gestión de Usuarios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No hay usuarios registrados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default UsersTable
