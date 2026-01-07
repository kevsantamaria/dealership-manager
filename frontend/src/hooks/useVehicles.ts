import { addVehicle, fetchVehicles } from '@/api/endpoints/vehicles'
import type { CreateVehiclePayload } from '@/types/vehicle'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useVehicles = () => {
  const queryClient = useQueryClient()

  const getVehicles = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  })

  const postVehicle = useMutation({
    mutationFn: (vehicle: CreateVehiclePayload) => {
      return addVehicle(vehicle)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    },
    onError: (error) => {
      console.error('Error adding vehicle:', error)
    },
  })

  return { getVehicles, postVehicle }
}
