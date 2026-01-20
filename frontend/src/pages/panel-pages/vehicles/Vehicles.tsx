import { useVehicles } from '@/hooks/useVehicles'
import type { StockFilter, Vehicle } from '@/types/vehicle'
import { useMemo, useState } from 'react'
import StockFilterTabs from './components/FilterTabs'
import VehicleCard from './components/VehicleCard'

function Vehicles() {
  const [statusFilter, setStatusFilter] = useState<StockFilter>('all')
  const { getVehicles } = useVehicles()
  const { isLoading, error, data } = getVehicles

  const filteredVehicles = useMemo(() => {
    if (statusFilter === 'all') return data

    return data.filter(
      (vehicle: Vehicle) => vehicle.stockStatus === statusFilter
    )
  }, [data, statusFilter])

  if (isLoading) return <p>Cargando vehículos...</p>
  if (error) return <p>Error al cargar vehículos</p>

  return (
    <>
      <StockFilterTabs value={statusFilter} onChange={setStatusFilter} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 place-items-center">
        {filteredVehicles?.map((vehicle: Vehicle) => (
          <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} />
        ))}
      </div>
    </>
  )
}

export default Vehicles
