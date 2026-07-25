import type {
  CreateVehicleDTO,
  UpdateVehicleDTO,
} from '@/models/schemas/vehicle.schema'
import { VehicleRepository } from '@/repositories/vehicle.repository'

export class VehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}

  async getAll() {
    return await this.vehicleRepository.findAll()
  }

  async getById(id: number) {
    const vehicle = await this.vehicleRepository.findById(id)
    if (!vehicle) throw new Error('NOT_FOUND')
    return vehicle
  }

  async create(data: CreateVehicleDTO) {
    const vinExists = await this.vehicleRepository.findByVin(data.vin)
    if (vinExists) throw new Error('VEHICLE_ALREADY_EXISTS')

    return await this.vehicleRepository.create(data)
  }

  async update(id: number, data: UpdateVehicleDTO) {
    const existingVehicle = await this.vehicleRepository.existsById(id)
    if (!existingVehicle) throw new Error('NOT_FOUND')

    if (Object.keys(data).length === 0) throw new Error('NO_FIELDS_TO_UPDATE')

    return await this.vehicleRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    const existingVehicle = await this.vehicleRepository.existsById(id)
    if (!existingVehicle) throw new Error('NOT_FOUND')

    await this.vehicleRepository.delete(id)
  }
}
