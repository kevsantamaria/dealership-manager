import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  IconBasket,
  IconCar,
  IconHexagonPlus,
  IconStar,
  IconUserPlus,
} from '@tabler/icons-react'
import { Link } from 'react-router-dom'

function QuickActions() {
  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center justify-center">
        <Button asChild className="min-w-full">
          <Link to={`/dashboard/admin/add-vehicle/`}>
            {' '}
            <IconHexagonPlus /> Añadir Vehículo
          </Link>
        </Button>

        <Button asChild variant={'secondary'} className="min-w-full">
          <Link to={`/dashboard/admin/add-supplier/`}>
            <IconUserPlus /> Añadir Proveedor
          </Link>
        </Button>

        <Button asChild variant={'secondary'} className="min-w-full">
          <Link to={`/dashboard/vehicles/`}>
            <IconCar /> Ver Vehículos
          </Link>
        </Button>

        <Button asChild variant={'secondary'} className="min-w-full">
          <Link to={`/dashboard/suppliers/`}>
            <IconBasket /> Ver Proveedores
          </Link>
        </Button>

        <Button asChild variant={'secondary'} className="min-w-full">
          <Link to={`/dashboard/brands/`}>
            <IconStar /> Ver Marcas
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default QuickActions
