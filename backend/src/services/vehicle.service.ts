import type {
  CreateVehicleDTO,
  UpdateVehicleDTO,
} from '@/models/schemas/vehicle.schema'
import { VehicleRepository } from '@/repositories/vehicle.repository'

const vehicleRepository = new VehicleRepository()

export class VehicleService {
  async getAll() {
    return await vehicleRepository.findAll()
  }

  async getById(id: number) {
    const vehicle = await vehicleRepository.findById(id)
    if (!vehicle) throw new Error('NOT_FOUND')
    return vehicle
  }

  async create(data: CreateVehicleDTO) {
    const vinExists = await vehicleRepository.findByVin(data.vin)
    if (vinExists) throw new Error('VEHICLE_ALREADY_EXISTS')

    return await vehicleRepository.create(data)
  }

  async update(id: number, data: UpdateVehicleDTO) {
    const existingVehicle = await vehicleRepository.existsById(id)
    if (!existingVehicle) throw new Error('NOT_FOUND')

    if (Object.keys(data).length === 0) throw new Error('NO_FIELDS_TO_UPDATE')

    return await vehicleRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    const existingVehicle = await vehicleRepository.existsById(id)
    if (!existingVehicle) throw new Error('NOT_FOUND')

    await vehicleRepository.delete(id)
  }
}
