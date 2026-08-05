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
import { BrandRepository } from '@/repositories/brand.repository'
import { ModelRepository } from '@/repositories/model.repository'
import { TrimRepository } from '@/repositories/trim.repository'
import { VehicleRepository } from '@/repositories/vehicle.repository'
import { prisma } from '@/config/prisma'

export class VehicleService {
  constructor(
    private vehicleRepository: VehicleRepository,
    private brandRepository: BrandRepository,
    private modelRepository: ModelRepository,
    private trimRepository: TrimRepository
  ) {}

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

    const { brand, model, trim, ...vehicleData } = data

    return await prisma.$transaction(async (tx) => {
      let existingBrand = await this.brandRepository.findByName(brand.name, tx)
      if (!existingBrand) {
        existingBrand = await this.brandRepository.create(
          { name: brand.name, countryOrigin: brand.countryOrigin },
          tx
        )
      }

      let existingModel = await this.modelRepository.findByNameAndBrand(
        model.name,
        existingBrand.id,
        tx
      )
      if (!existingModel) {
        existingModel = await this.modelRepository.create(
          { name: model.name, launchYear: model.launchYear },
          existingBrand.id,
          tx
        )
      }

      let existingTrim = await this.trimRepository.findByNameAndModel(
        trim.name,
        existingModel.id,
        tx
      )
      if (!existingTrim) {
        existingTrim = await this.trimRepository.create(
          {
            name: trim.name,
            drivetrain: trim.drivetrain,
            engineSize: trim.engineSize,
            engineType: trim.engineType,
            horsepower: trim.horsepower,
            transmission: trim.transmission,
          },
          existingModel.id,
          tx
        )
      }

      return await this.vehicleRepository.create(
        {
          vin: vehicleData.vin,
          licensePlate: vehicleData.licensePlate,
          color: vehicleData.color,
          mileage: vehicleData.mileage,
          arrivalDate: vehicleData.arrivalDate,
          purchasePrice: vehicleData.purchasePrice,
          suggestedPrice: vehicleData.suggestedPrice,
          stockStatus: vehicleData.stockStatus,
          rateCondition: vehicleData.rateCondition,
          rateDescription: vehicleData.rateDescription,
          supplierId: vehicleData.supplierId,
          trimId: existingTrim.id,
        },
        tx
      )
    })
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
