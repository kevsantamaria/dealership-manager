import { Card, CardContent } from '@/components/ui/card'
import type { VehicleStockData } from '@/types/dashboard'
import { getVehicleStats } from './utils/stats'

interface Props {
  data: VehicleStockData
}

function VehiclesInStock({ data }: Props) {
  const stats = getVehicleStats(data)

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
              >
                <div className={`rounded-full bg-muted p-3 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default VehiclesInStock
