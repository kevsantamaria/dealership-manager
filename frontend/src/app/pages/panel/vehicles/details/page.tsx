import DeleteModal from '@/shared/components/modal/delete-modal'
import EditVehicleDialog from '@/features/panel/vehicles/components/edit-vehicle-dialog'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { useVehicles } from '@/features/panel/vehicles/hooks/use-vehicles'
import { cn } from '@/shared/lib/utils'
import {
  IconArrowLeft,
  IconAutomaticGearbox,
  IconBuilding,
  IconCalendar,
  IconCar4wd,
  IconEngine,
  IconFileText,
  IconGasStation,
  IconGauge,
  IconMapPin,
  IconMenu3,
  IconPalette,
  IconPhone,
  IconStarHalfFilled,
  IconTrash,
} from '@tabler/icons-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function VehicleDetails() {
  const { id } = useParams()
  const { getById, remove } = useVehicles(Number(id))
  const { isPending, isError, data } = getById
  const navigate = useNavigate()

  const [openDelete, setOpenDelete] = useState(false)
  const handleDelete = () => {
    if (!id) return

    remove.mutate(Number(id), {
      onSuccess: () => {
        setOpenDelete(false)
        navigate('/dashboard/vehicles', { replace: true })
      },
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(Number.parseFloat(price))
  }

  if (isPending) return <div>Cargando vehiculo...</div>
  if (isError) return <div>Error al cargar vehiculo</div>
  if (!data) return <div>No encontrado</div>

  const vehicle = data
  const { trim } = vehicle
  const { model } = trim
  const { brand } = model

  console.log(trim)

  return (
    <>
      {/* Delete Dialog */}
      <DeleteModal
        open={openDelete}
        loading={remove.isPending}
        title="¿Eliminar vehículo?"
        description="Esta acción no se puede deshacer. El vehículo será eliminado permanentemente del sistema."
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />

      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Link
                to="/dashboard/vehicles"
                className="flex items-center gap-1"
              >
                <IconArrowLeft className="h-4 w-4" />
                Volver
              </Link>
            </Button>
            <div className="flex gap-2">
              <EditVehicleDialog
                vehicleId={Number(id)}
                vehicle={{
                  vin: vehicle.vin,
                  licensePlate: vehicle.licensePlate,
                  color: vehicle.color,
                  mileage: Number(vehicle.mileage),
                  arrivalDate: vehicle.arrivalDate,
                  purchasePrice: Number(vehicle.purchasePrice),
                  suggestedPrice: Number(vehicle.suggestedPrice),
                  rateCondition: vehicle.rateCondition,
                  stockStatus: vehicle.stockStatus,
                  rateDescription: vehicle.rateDescription,
                }}
              />
              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                onClick={() => setOpenDelete(true)}
                disabled={remove.isPending}
              >
                <IconTrash className="h-4 w-4" />
                {remove.isPending ? 'Eliminando...' : 'Eliminar'}
              </Button>
            </div>
          </div>

          {/* Main Card */}
          <Card className="overflow-hidden pt-0">
            {/* Vehicle Image */}
            <div className="relative w-full h-64 md:h-96 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
              <img
                src="/no-car-image.webp"
                alt={`${brand.name} ${model.name} ${trim.name}`}
                className="object-cover w-full h-full"
              />
              <Badge
                className={cn(
                  'absolute right-3 top-3 z-10 rounded-full shadow-md',
                  vehicle.stockStatus === 'in_stock' && 'bg-green-600',
                  vehicle.stockStatus === 'reserved' && 'bg-yellow-600',
                  vehicle.stockStatus === 'sold' && 'bg-purple-600'
                )}
              >
                {vehicle.stockStatus === 'in_stock'
                  ? 'Disponible'
                  : vehicle.stockStatus === 'reserved'
                    ? 'Reservado'
                    : 'Vendido'}
              </Badge>
            </div>

            <div className="p-6 md:p-8">
              {/* Title Section */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-balance">
                      {brand.name} {model.name} {vehicle.trim.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      {model.launchYear} • {brand.countryOrigin}
                    </p>
                  </div>
                </div>
                <div className="flex items-baseline gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Precio de compra
                    </p>
                    <p className="text-2xl font-semibold">
                      {formatPrice(vehicle.purchasePrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Precio de venta
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(vehicle.suggestedPrice)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconGauge className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kilometraje</p>
                    <p className="font-semibold">
                      {vehicle.mileage
                        ? `${Number.parseInt(vehicle.mileage).toLocaleString()} km`
                        : '---'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconEngine className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Motor</p>
                    <p className="font-semibold">
                      {vehicle.trim.engineSize}L • {vehicle.trim.horsepower} HP
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconGasStation className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Combustible</p>
                    <p className="font-semibold capitalize">
                      {vehicle.trim.engineType}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconAutomaticGearbox className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transmisión</p>
                    <p className="font-semibold capitalize">
                      {vehicle.trim.transmission}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconCar4wd className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tracción</p>
                    <p className="font-semibold uppercase">
                      {vehicle.trim.drivetrain}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconPalette className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-semibold capitalize flex items-center gap-2">
                      {vehicle.color}
                      <span
                        className="inline-block w-4 h-4 rounded-full border-2 border-border"
                        style={{ backgroundColor: vehicle.color }}
                      />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconFileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">VIN</p>
                    <p className="font-semibold font-mono text-sm">
                      {vehicle.vin}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconCalendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Fecha de llegada
                    </p>
                    <p className="font-semibold">
                      {formatDate(String(vehicle.arrivalDate))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconStarHalfFilled className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Condición</p>
                    <p className="font-semibold capitalize">
                      {vehicle.rateCondition}
                    </p>
                  </div>
                </div>
              </div>

              {/* Supplier Information */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Información del Proveedor
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary rounded-lg">
                      <IconBuilding className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Nombre</p>
                      <p className="font-semibold">{vehicle.supplier.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary rounded-lg">
                      <IconMapPin className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">País</p>
                      <p className="font-semibold">
                        {vehicle.supplier.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary rounded-lg">
                      <IconMenu3 className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-semibold capitalize">
                        {vehicle.supplier.type}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Descripción</p>
                    <p className="font-semibold capitalize">
                      {vehicle.rateDescription}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary rounded-lg">
                      <IconPhone className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contacto</p>
                      <p className="font-semibold">
                        {vehicle.supplier.contact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default VehicleDetails
