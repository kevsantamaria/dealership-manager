import { prisma } from '@/lib/prisma'
import type {
  Vehicle,
  VehicleListItem,
  VehicleWithDetails,
} from '@/models/entities/vehicle.entity'
import type {
  CreateVehicleDTO,
  UpdateVehicleDTO,
} from '@/models/schemas/vehicle.schema'

export class VehicleRepository {
  constructor() {}

  async findAll(): Promise<VehicleListItem[]> {
    return await prisma.vehicle.findMany({
      select: {
        id: true,
        color: true,
        arrivalDate: true,
        suggestedPrice: true,
        stockStatus: true,
        rateCondition: true,
        trim: {
          select: {
            name: true,
            model: {
              select: {
                name: true,
                launchYear: true,
                brand: { select: { name: true } },
              },
            },
          },
        },
      },
      orderBy: { arrivalDate: 'desc' },
    })
  }

  async findById(id: number): Promise<VehicleWithDetails | null> {
    return await prisma.vehicle.findFirst({
      where: { id },
      include: {
        supplier: true,
        trim: {
          include: {
            model: {
              include: {
                brand: true,
              },
            },
          },
        },
      },
    })
  }

  async existsById(id: number): Promise<boolean> {
    return (await prisma.vehicle.findUnique({ where: { id } })) !== null
  }

  async findByVin(vin: string): Promise<boolean> {
    return (await prisma.vehicle.findUnique({ where: { vin } })) !== null
  }

  async create(data: CreateVehicleDTO): Promise<Vehicle> {
    const { brand, model, trim, ...vehicleData } = data

    return await prisma.$transaction(async (tx) => {
      const supplier = await tx.supplier.findUnique({
        where: { id: vehicleData.supplierId },
      })
      if (!supplier) throw new Error('NOT_FOUND')

      let existingBrand = await tx.brand.findFirst({
        where: { name: brand.name },
      })
      if (!existingBrand) {
        existingBrand = await tx.brand.create({
          data: { name: brand.name, countryOrigin: brand.countryOrigin },
        })
      }

      let existingModel = await tx.model.findFirst({
        where: { name: model.name, brandId: existingBrand.id },
      })
      if (!existingModel) {
        existingModel = await tx.model.create({
          data: {
            name: model.name,
            launchYear: model.launchYear,
            brandId: existingBrand.id,
          },
        })
      }

      let existingTrim = await tx.trim.findFirst({
        where: { name: trim.name, modelId: existingModel.id },
      })
      if (!existingTrim) {
        existingTrim = await tx.trim.create({
          data: {
            name: trim.name,
            drivetrain: trim.drivetrain,
            engineSize: trim.engineSize,
            engineType: trim.engineType,
            horsepower: trim.horsepower,
            transmission: trim.transmission,
            modelId: existingModel.id,
          },
        })
      }

      return await tx.vehicle.create({
        data: {
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
          trimId: existingTrim.id,
          supplierId: vehicleData.supplierId,
        },
      })
    })
  }

  async update(id: number, data: UpdateVehicleDTO): Promise<void> {
    await prisma.vehicle.update({
      where: { id },
      data,
    })
  }

  async delete(id: number): Promise<void> {
    await prisma.vehicle.delete({ where: { id } })
  }
}
