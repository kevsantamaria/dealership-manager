import { Badge } from '@/shared/components/ui/badge'
import type { RecentActivity } from '@/features/panel/dashboard/types/dashboard-types'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<RecentActivity>[] = [
  {
    accessorKey: 'vehicleName',
    header: 'Vehículo',
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const label =
        status === 'in_stock'
          ? 'Disponible'
          : status === 'reserved'
            ? 'Reservado'
            : 'Vendido'
      const bgColor =
        status === 'in_stock'
          ? 'bg-green-600'
          : status === 'reserved'
            ? 'bg-yellow-600'
            : 'bg-purple-600'

      return <Badge className={`capitalize ${bgColor}`}>{label}</Badge>
    },
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'))
      return date.toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
]
