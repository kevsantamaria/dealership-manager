import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Brand } from '@/types/brand'

interface Props {
  brand: Brand
}

function BrandCard({ brand }: Props) {
  const { name, countryOrigin, numberOfVehicles } = brand
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">País de origen</span>
          <Badge variant="secondary" className="font-medium">
            {countryOrigin}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Cantidad de vehículos
          </span>
          <span className="text-2xl font-bold text-primary">
            {numberOfVehicles}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default BrandCard
