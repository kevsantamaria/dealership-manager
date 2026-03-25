import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { FinancialSummaryData } from '@/types/dashboard'
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
    <Card
      className={`outline outline-${color} relative hover:outline-2 transition-colors`}
    >
      <div className="rounded-full absolute -top-3 -left-3 bg-muted p-2.5">
        <Icon className="w-6 h-6" />
      </div>
      <CardHeader className="flex justify-center font-medium gap-2 items-center mx-2 py-1 rounded">
        {title}
      </CardHeader>
      <CardContent className="flex items-center h-full justify-center">
        <p className="text-4xl font-bold bg-muted p-3 rounded-lg">
          {formattedValue}
        </p>
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
        color="orange-500"
      />
      <FinancialCard
        title="Valor de Inventario"
        value={data.suggestedPriceTotal}
        icon={IconMoneybag}
        color="blue-500"
      />
      <FinancialCard
        title="Margen de Ganancia"
        value={data.revenue}
        icon={IconTrendingUp}
        color="green-500"
      />
    </div>
  )
}
