import type { Vehicle } from '@/models/entities/vehicle'
import { findAllVehicles } from '@/repositories/vehicle.repository'
import { getErrorMessage } from '@/utils/getErorMessage'

export const getAllVehiclesService = async () => {
  try {
    const vehicles: Vehicle[] = await findAllVehicles()
    return vehicles
  } catch (error) {
    throw new Error(`Failed to retrieve vehicles: ${getErrorMessage(error)}`)
  }
}
