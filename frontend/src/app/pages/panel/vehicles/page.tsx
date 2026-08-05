import { useVehicles } from '@/features/panel/vehicles/hooks/use-vehicles'
import type { StockFilter } from '@/features/panel/vehicles/types/vehicle-types'
import { useMemo, useState } from 'react'
import StockFilterTabs from '@/features/panel/vehicles/components/filter-tabs'
import VehicleCard from '@/features/panel/vehicles/components/vehicle-card'

function Vehicles() {
  const [statusFilter, setStatusFilter] = useState<StockFilter>('all')
  const { getAll } = useVehicles()
  const { isPending, error, data } = getAll

  const filteredVehicles = useMemo(() => {
    if (statusFilter === 'all') return data
    return data?.filter((vehicle) => vehicle.stockStatus === statusFilter)
  }, [data, statusFilter])

  if (isPending) return <p>Cargando vehículos...</p>
  if (error) return <p>Error al cargar vehículos</p>

  return (
    <>
      <StockFilterTabs value={statusFilter} onChange={setStatusFilter} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 place-items-center">
        {filteredVehicles?.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </>
  )
}

export default Vehicles
