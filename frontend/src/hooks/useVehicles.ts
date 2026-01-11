import {
  addVehicle,
  fetchVehicleById,
  fetchVehicles,
} from '@/api/endpoints/vehicles'
import type { CreateVehiclePayload } from '@/types/vehicle'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useVehicles = (id?: number) => {
  const queryClient = useQueryClient()

  const getVehicles = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  })

  const getVehicleById = useQuery({
    queryKey: ['vehicles', id],
    queryFn: () => fetchVehicleById(id!),
    enabled: !!id,
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

  return { getVehicles, getVehicleById, postVehicle }
}
