import { fetchVehicles } from '@/api/endpoints/vehicles'
import { useQuery } from '@tanstack/react-query'

export const useVehicles = () => {
  const getVehicles = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  })

  return { getVehicles }
}
