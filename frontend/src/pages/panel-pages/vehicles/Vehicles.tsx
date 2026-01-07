import { useVehicles } from '@/hooks/useVehicles'
import type { Vehicle } from '@/types/vehicle'
import VehicleCard from './components/VehicleCard'

function Vehicles() {
  const { getVehicles } = useVehicles()
  const { isLoading, error, data } = getVehicles

  if (isLoading) return <p>Cargando vehículos...</p>
  if (error) return <p>Error al cargar vehículos</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((vehicle: Vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
        />
      ))}
    </div>
  )
}

export default Vehicles
