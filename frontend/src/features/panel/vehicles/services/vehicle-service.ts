import { api } from '@/app/config/api/base'
import type {
  CreateVehiclePayload,
  UpdateVehiclePayload,
  Vehicle,
  VehicleDetailsType,
} from '../types/vehicle-types'

export const vehicleService = {
  getAll: async (): Promise<Vehicle[]> => {
    return await api('/vehicles')
  },

  getById: async (id: number): Promise<VehicleDetailsType> => {
    return await api(`/vehicles/${id}`)
  },

  add: async (vehicle: CreateVehiclePayload): Promise<Vehicle> => {
    return api('/vehicles', {
      method: 'POST',
      json: vehicle,
    })
  },

  update: async (
    id: number,
    vehicle: UpdateVehiclePayload
  ): Promise<Vehicle> => {
    return api(`/vehicles/${id}`, {
      method: 'PATCH',
      json: vehicle,
    })
  },

  delete: async (id: number): Promise<void> => {
    return api(`/vehicles/${id}`, {
      method: 'DELETE',
    })
  },
}
