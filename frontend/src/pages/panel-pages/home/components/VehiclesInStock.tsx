import { Card, CardContent } from '@/components/ui/card'
import { getVehicleStats } from '@/pages/panel-pages/home/components/utils/stats'
import type { VehicleStockData } from '@/types/dashboard'

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
                className="flex items-center flex-col gap-4 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
              >
                <h3 className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </h3>
                <div
                  className={`rounded-full flex gap-4 items-center justify-between bg-muted p-3 ${stat.color}`}
                >
                  <Icon className="h-5 w-5" />
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
