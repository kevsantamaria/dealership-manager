import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import type { FinancialSummaryData } from '@/features/panel/dashboard/types/dashboard-types'
import {
  IconMoneybag,
  IconTrendingUp,
  IconWallet,
  type Icon,
} from '@tabler/icons-react'

interface FinancialCardProps {
  title: string
  value: number
  icon: Icon
  color: string
}

function FinancialCard({
  title,
  value,
  icon: Icon,
  color,
}: FinancialCardProps) {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value)

  return (
    <Card className="relative">
      <div className="rounded-full absolute -top-3 -left-3 bg-muted p-2.5">
        <Icon className="w-7 h-7" color={color} />
      </div>
      <CardHeader className="flex justify-center font-medium items-center rounded">
        {title}
      </CardHeader>
      <CardContent className="flex items-center h-full justify-center">
        <p className="text-3xl font-bold p-3">{formattedValue}</p>
      </CardContent>
    </Card>
  )
}

interface FinancialCardsProps {
  data: FinancialSummaryData
}

export function FinancialCards({ data }: FinancialCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 grid-cols-1 w-full">
      <FinancialCard
        title="Monto Invertido"
        value={data.purchasePriceTotal}
        icon={IconWallet}
        color="oklch(70.5% 0.213 47.604)"
      />
      <FinancialCard
        title="Valor de Inventario"
        value={data.suggestedPriceTotal}
        icon={IconMoneybag}
        color="oklch(62.3% 0.214 259.815)"
      />
      <FinancialCard
        title="Margen de Ganancia"
        value={data.revenue}
        icon={IconTrendingUp}
        color="oklch(72.3% 0.219 149.579)"
      />
    </div>
  )
}
