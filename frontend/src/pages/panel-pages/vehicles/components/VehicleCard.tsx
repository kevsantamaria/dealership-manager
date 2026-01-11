import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Vehicle } from '@/types/vehicle'
import { Link } from 'react-router-dom'

type Props = {
  vehicle: Vehicle
}

function VehicleCard({ vehicle }: Props) {
  const {
    vehicleId,
    brand,
    color,
    launchYear,
    model,
    price,
    stockStatus,
    trim,
  } = vehicle
  return (
    <div className="relative border max-w-xs rounded-xl overflow-hidden">
      <div className="relative w-full h-80">
        <Badge
          className={cn(
            'absolute right-3 top-3 z-10 rounded-full shadow-md',
            stockStatus === 'in_stock' && 'bg-green-600',
            stockStatus === 'reserved' && 'bg-yellow-600',
            stockStatus === 'sold' && 'bg-gray-600'
          )}
        >
          {stockStatus === 'in_stock'
            ? 'Disponible'
            : stockStatus === 'reserved'
              ? 'Reservado'
              : 'Vendido'}
        </Badge>
        <img
          src="/no-car-image.webp"
          alt="Chevrolet Camaro"
          className="w-full h-fit object-cover"
        />
      </div>

      <Card className="border-none">
        <CardHeader>
          <div className="space-y-2">
            <CardTitle className="text-2xl">{model}</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-sm">
                {brand}
              </Badge>
              <Badge variant="outline" className="rounded-sm">
                {trim}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-md px-2.5 py-1">
              <div
                className="h-4 w-4 rounded-full border-2 border-border"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm font-medium capitalize">{color}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Año:</span>
            <span className="text-sm font-medium">{launchYear}</span>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-3 pt-2">
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase text-muted-foreground">
              Precio
            </span>
            <span className="text-2xl font-bold">${price}</span>
          </div>
          <Button>
            <Link to={`/vehicles/${vehicleId}`}>Ver Detalles</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VehicleCard
