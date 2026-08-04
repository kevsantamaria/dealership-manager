import { BadRequestError } from '@/errors/BadRequest'
import { ConflictError } from '@/errors/ConflictError'
import { NotFoundError } from '@/errors/NotFound'
import type {
  Vehicle,
  VehicleListItem,
  VehicleWithDetails,
} from '@/models/entities/vehicle.entity'
import type {
  CreateVehicleDTO,
  UpdateVehicleDTO,
} from '@/models/schemas/vehicle.schema'
import { VehicleRepository } from '@/repositories/vehicle.repository'

export class VehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}

  async getAll(): Promise<VehicleListItem[]> {
    const vehicles = await this.vehicleRepository.findAll()
    return vehicles.map((v) => ({
      id: v.id,
      color: v.color,
      arrivalDate: v.arrivalDate,
      rateCondition: v.rateCondition,
      stockStatus: v.stockStatus,
      suggestedPrice: v.suggestedPrice,
      trim: v.trim.name,
      model: v.trim.model.name,
      launchYear: v.trim.model.launchYear,
      brand: v.trim.model.brand.name,
    }))
  }

  async getById(id: number): Promise<VehicleWithDetails | null> {
    const vehicle = await this.vehicleRepository.findById(id)
    if (!vehicle) throw new NotFoundError('Vehicle')
    return vehicle
  }

  async create(data: CreateVehicleDTO): Promise<Vehicle> {
    const vinExists = await this.vehicleRepository.findByVin(data.vin)
    if (vinExists)
      throw new ConflictError('Vehicle with the same VIN already exists')

    return await this.vehicleRepository.create(data)
  }

  async update(id: number, data: UpdateVehicleDTO): Promise<void> {
    const existingVehicle = await this.vehicleRepository.existsById(id)
    if (!existingVehicle) throw new NotFoundError('Vehicle')

    if (Object.keys(data).length === 0)
      throw new BadRequestError('No fields to update')

    return await this.vehicleRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    const existingVehicle = await this.vehicleRepository.existsById(id)
    if (!existingVehicle) throw new NotFoundError('Vehicle')

    await this.vehicleRepository.delete(id)
  }
}
