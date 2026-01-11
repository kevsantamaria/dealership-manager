import { useVehicles } from '@/hooks/useVehicles'
import type { Vehicle } from '@/types/vehicle'
import VehicleCard from './components/VehicleCard'

function Vehicles() {
  const { getVehicles } = useVehicles()
  const { isLoading, error, data } = getVehicles

  if (isLoading) return <p>Cargando vehículos...</p>
  if (error) return <p>Error al cargar vehículos</p>

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 place-items-center">
      {data?.map((vehicle: Vehicle) => (
        <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} />
      ))}
    </div>
  )
}

export default Vehicles
