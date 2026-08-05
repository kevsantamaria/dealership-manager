import { vehicleService } from '../services/vehicle-service'
import type {
  CreateVehiclePayload,
  UpdateVehiclePayload,
} from '../types/vehicle-types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useVehicles = (id?: number) => {
  const queryClient = useQueryClient()

  const getAll = useQuery({
    queryKey: ['vehicles'],
    queryFn: vehicleService.getAll,
  })

  const getById = useQuery({
    queryKey: ['vehicles', id],
    queryFn: () => vehicleService.getById(id!),
    enabled: !!id,
  })

  const add = useMutation({
    mutationFn: (vehicle: CreateVehiclePayload) => {
      return vehicleService.add(vehicle)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    },
    onError: (error) => {
      console.error('Error adding vehicle:', error)
    },
  })

  const update = useMutation({
    mutationFn: ({
      id,
      vehicle,
    }: {
      id: number
      vehicle: UpdateVehiclePayload
    }) => {
      return vehicleService.update(id, vehicle)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    },
    onError: (error) => {
      console.error('Error updating vehicle:', error)
    },
  })

  const remove = useMutation({
    mutationFn: (id: number) => {
      return vehicleService.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    },
    onError: (error) => {
      console.error('Error deleting vehicle:', error)
    },
  })

  return {
    getAll,
    getById,
    add,
    update,
    remove,
  }
}
