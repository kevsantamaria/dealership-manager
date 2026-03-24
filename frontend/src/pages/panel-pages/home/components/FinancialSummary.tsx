import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { FinancialSummaryData } from '@/types/dashboard'
import { DollarSign, TrendingUp, Wallet } from 'lucide-react'

interface FinancialCardProps {
  title: string
  value: number
  icon: React.ElementType
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
    <Card className={`${color}`}>
      <CardHeader className="flex text-sm justify-center gap-2 items-center">
        <div className="rounded-full bg-muted p-2">
          <Icon className="h-5 w-5" />
        </div>
        {title}
      </CardHeader>
      <CardContent className="flex items-center justify-center">
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
    <div className="grid gap-4 md:grid-cols-3 grid-cols-1 w-full">
      <FinancialCard
        title="Monto Invertido"
        value={data.purchasePriceTotal}
        icon={Wallet}
        color="bg-orange-600"
      />
      <FinancialCard
        title="Valor de Inventario"
        value={data.suggestedPriceTotal}
        icon={DollarSign}
        color="bg-blue-600"
      />
      <FinancialCard
        title="Margen de Ganancia"
        value={data.revenue}
        icon={TrendingUp}
        color="bg-green-600"
      />
    </div>
  )
}
