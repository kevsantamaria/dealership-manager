import { cn } from '@/lib/utils'
import type { StockFilter } from '@/types/vehicle'
import {
  IconArchive,
  IconLayout,
  IconPackage,
  IconShoppingCartCopy,
} from '@tabler/icons-react'

interface StockFilterProps {
  value: StockFilter
  onChange: (value: StockFilter) => void
}

interface FilterOption {
  value: StockFilter
  label: string
  icon: React.ReactNode
}

const filterOptions: FilterOption[] = [
  { value: 'all', label: 'Todos', icon: <IconLayout className="size-4" /> },
  {
    value: 'in_stock',
    label: 'Disponibles',
    icon: <IconPackage className="size-4" />,
  },
  {
    value: 'reserved',
    label: 'Reservados',
    icon: <IconArchive className="size-4" />,
  },
  {
    value: 'sold',
    label: 'Vendidos',
    icon: <IconShoppingCartCopy className="size-4" />,
  },
]

function StockFilterTabs({ value, onChange }: StockFilterProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-muted p-1 m-4">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
            value === option.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default StockFilterTabs
