import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { TopSellingModel } from '@/types/dashboard'
import { IconTrophy } from '@tabler/icons-react'

type TopSellingModelsProps = {
  data: TopSellingModel[]
}

function TopSellingModels({ data }: TopSellingModelsProps) {
  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconTrophy className="h-5 w-5 text-yellow-500" />
          Vehículos Más Vendidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="space-y-1">
                <div className="font-semibold">
                  {item.brand} {item.model}
                </div>
                <div className="text-sm text-muted-foreground">{item.trim}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  ${item.revenue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.unitsSold}{' '}
                  {item.unitsSold === 1 ? 'unidad' : 'unidades'} vendidas
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TopSellingModels
