import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function VehicleCard() {
  return (
    <div className="relative max-w-xs rounded-xl bg-white shadow-lg overflow-hidden">
      <div className="relative">
        <Badge
          variant="default"
          className="absolute right-3 top-3 z-10 rounded-full bg-green-600 hover:bg-green-700 shadow-md"
        >
          Disponible
        </Badge>
        <img
          src="/Camaro1969.webp"
          alt="Chevrolet Camaro"
          className="w-full h-fit object-cover"
        />
      </div>

      <Card className="border-none shadow-none">
        <CardHeader className="space-y-3">
          <div className="space-y-2">
            <CardTitle className="text-2xl">Camaro</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-sm">Chevrolet</Badge>
              <Badge variant="outline" className="rounded-sm">
                SS
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className='flex sm:flex-row gap-4'>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Color:</span>
            <div className="flex items-center gap-1.5 rounded-md bg-gray-50 px-2.5 py-1 border border-gray-200">
              <div className="h-3 w-3 rounded-full bg-black" />
              <span className="text-sm font-medium text-black">Negro</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Año:</span>
              <span className="text-sm font-medium">1969</span>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-3 pt-2">
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase text-muted-foreground">
              Precio
            </span>
            <span className="text-2xl font-bold">$37999</span>
          </div>
          <Button>Ver Detalles</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VehicleCard
