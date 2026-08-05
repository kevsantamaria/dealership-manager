import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/components/ui/chart'
import type { MonthData } from '@/features/panel/dashboard/types/dashboard-types'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

interface Props {
  data: MonthData[]
}

export default function MonthlyFinancialChart({ data }: Props) {
  // Format “2025-02” → “Feb”
  const chartData = data.map((item) => ({
    month: new Date(item.month + '-01').toLocaleString('default', {
      month: 'short',
    }),
    Invertido: item.totalPurchased,
    Ganado: item.totalSoldRevenue,
  }))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resumen Financiero</CardTitle>
        <CardDescription>Monto invertido y ganado por mes</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer
          config={{
            Invertido: {
              label: 'Invertido',
              color: 'var(--chart-1)',
            },
            Ganado: {
              label: 'Ganado',
              color: 'var(--chart-3)',
            },
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                tickLine={{ stroke: 'var(--border)' }}
                axisLine={{ stroke: 'var(--border)' }}
              />
              <YAxis
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                tickLine={{ stroke: 'var(--border)' }}
                axisLine={{ stroke: 'var(--border)' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: 'var(--muted)' }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: '10px',
                  fontSize: '14px',
                  color: 'var(--foreground)',
                }}
              />
              <Bar
                dataKey="Invertido"
                fill="var(--color-Invertido)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="Ganado"
                fill="var(--color-Ganado)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
