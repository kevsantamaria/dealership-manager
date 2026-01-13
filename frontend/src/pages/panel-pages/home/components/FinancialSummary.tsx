import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { FinancialSummaryData } from '@/types/dashboard'
import { DollarSign, TrendingUp, Wallet } from 'lucide-react'

interface FinancialCardProps {
  title: string
  description: string
  value: number
  icon: React.ElementType
  color: string
}

function FinancialCard({
  title,
  description,
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 mb-2">
          <div className={`rounded-full bg-muted p-2 ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="text-4xl font-bold">{formattedValue}</p>
      </CardContent>
    </Card>
  )
}

interface FinancialCardsProps {
  data: FinancialSummaryData
}

export function FinancialCards({ data }: FinancialCardsProps) {
  return (
    <div className="grid gap-4 grid-cols-3">
      <FinancialCard
        title="Valor de Inversión"
        description="Valor total de compra de los vehículos en inventario"
        value={data.purchasePriceTotal}
        icon={Wallet}
        color="text-orange-600"
      />
      <FinancialCard
        title="Valor de Inventario"
        description="Valor total de venta de los vehículos en inventario"
        value={data.suggestedPriceTotal}
        icon={DollarSign}
        color="text-blue-600"
      />
      <FinancialCard
        title="Ganancia"
        description="Total de ganancias estimadas"
        value={data.revenue}
        icon={TrendingUp}
        color="text-green-600"
      />
    </div>
  )
}
