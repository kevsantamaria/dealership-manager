import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { OldInventoryItem } from '@/types/dashboard'
import { AlertTriangle } from 'lucide-react'

interface OldInventoryRecordProps {
  data: OldInventoryItem[]
}

function OldInventoryRecord({ data }: OldInventoryRecordProps) {
  return (
    <Card className="border-amber-200 bg-amber-50/50 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-900">
          <AlertTriangle className="h-5 w-5" />
          Vehículos que requieren atención
          <span className="ml-auto text-sm font-normal text-amber-700">
            {data.length} vehículo{data.length !== 1 ? 's' : ''} con más de 90
            días
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative max-h-[300px] overflow-y-auto pr-3">
          <div className="space-y-2">
            {data.map((vehicle, index) => (
              <div
                key={index}
                className="
            group flex items-center justify-between rounded-md border
            bg-background p-4 transition-colors
            hover:bg-muted/50
          "
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {vehicle.brand} {vehicle.model}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {vehicle.trim}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Arrivó {new Date(vehicle.arrivalDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold text-amber-600">
                    {vehicle.daysInStock} días
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${vehicle.suggestedPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none sticky bottom-0 h-6 bg-linear-to-t from-background to-transparent" />
        </div>
      </CardContent>
    </Card>
  )
}

export default OldInventoryRecord
