import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Supplier } from '@/types/supplier'

interface Props {
  supplier: Supplier
}

function SupplierCard({ supplier }: Props) {
  const { name, country, contact, type } = supplier

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          <Badge variant="default">{type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Contacto:</span>
          <span className="font-medium">{contact}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">País:</span>
          <span className="font-medium">{country}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default SupplierCard
