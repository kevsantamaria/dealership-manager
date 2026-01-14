'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { MonthData } from '@/types/dashboard'
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
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
      <CardContent className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="month" tick={{ fill: '#4B5563', fontSize: 12 }} />
            <YAxis tick={{ fill: '#4B5563', fontSize: 12 }} />
            <Tooltip
              wrapperStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
              }}
            />
            <Legend />
            <Bar
              dataKey="Invertido"
              fill="#34D399" /* verde */
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="Ganado"
              fill="#6366F1" /* azul */
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
