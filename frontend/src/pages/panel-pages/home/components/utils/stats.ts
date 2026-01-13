// src/utils/vehicleStats.ts
import type { VehicleStockData } from '@/types/dashboard'
import {
  IconArchive,
  IconPackage,
  IconPackages,
  IconShoppingCartCheck,
} from '@tabler/icons-react'

export const getVehicleStats = (data: VehicleStockData) => [
  {
    label: 'Disponibles',
    value: data.inStock,
    icon: IconPackage,
    color: 'text-green-600 dark:text-green-500',
  },
  {
    label: 'Reservados',
    value: data.reserved,
    icon: IconArchive,
    color: 'text-yellow-600 dark:text-yellow-500',
  },
  {
    label: 'Vendidos',
    value: data.sold,
    icon: IconShoppingCartCheck,
    color: 'text-purple-600 dark:text-purple-500',
  },
  {
    label: 'Total',
    value: data.total,
    icon: IconPackages,
    color: 'text-foreground',
  },
]
