import { useVehicles } from '@/hooks/useVehicles'
import { Navigate, useParams } from 'react-router-dom'

function VehicleDetails() {
  const { id } = useParams()
  const { getVehicleById } = useVehicles(Number(id))
  const { isLoading, isError, data } = getVehicleById

  if (isLoading) return <div>Cargando vehiculo...</div>
  if (!data) return <Navigate to="/dashboard/*" replace />
  if (isError) return <div>Error al cargar vehiculo</div>

  return <div>VehicleDetails {id} - {JSON.stringify(data)}</div>
}

export default VehicleDetails

