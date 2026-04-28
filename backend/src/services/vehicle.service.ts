import { prisma } from '@/lib/prisma'
import type {
  CreateVehicleDTO,
  UpdateVehicleDTO,
} from '@/models/dtos/vehicle.dto'

export const createVehicleService = async (vehicle: CreateVehicleDTO) => {
  const { vin, supplierId, brand, model, trim } = vehicle

  const validVin = await prisma.vehicle.findUnique({ where: { vin } })
  if (validVin) throw new Error('VEHICLE_ALREADY_EXISTS')

  return await prisma.$transaction(async (tx) => {
    const supplier = await tx.supplier.findUnique({
      where: { id: supplierId },
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
        vin,
        licensePlate: vehicle.licensePlate,
        color: vehicle.color,
        mileage: vehicle.mileage,
        arrivalDate: vehicle.arrivalDate,
        purchasePrice: vehicle.purchasePrice,
        suggestedPrice: vehicle.suggestedPrice,
        stockStatus: vehicle.stockStatus,
        rateCondition: vehicle.rateCondition,
        rateDescription: vehicle.rateDescription,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trimId: existingTrim.id,
        supplierId,
      },
    })
  })
}

export const getAllVehiclesService = async () => {
  const vehicles = await prisma.vehicle.findMany({
    select: {
      id: true,
      color: true,
      suggestedPrice: true,
      stockStatus: true,
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

  return vehicles.map((v) => ({
    id: v.id,
    brand: v.trim.model.brand.name,
    model: v.trim.model.name,
    trim: v.trim.name,
    color: v.color,
    launchYear: v.trim.model.launchYear,
    suggestedPrice: v.suggestedPrice,
    stockStatus: v.stockStatus,
  }))
}

export const getVehicleByIdService = async (id: number) => {
  const existingVehicle = await prisma.vehicle.findUnique({ where: { id } })
  if (!existingVehicle) throw new Error('NOT_FOUND')

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

export const updateVehicleService = async (
  id: number,
  vehicle: UpdateVehicleDTO
) => {
  const existingVehicle = await prisma.vehicle.findUnique({ where: { id } })
  if (!existingVehicle) throw new Error('NOT_FOUND')

  if (Object.keys(vehicle).length === 0) throw new Error('NO_FIELDS_TO_UPDATE')

  if (vehicle.vin) {
    const existingVin = await prisma.vehicle.findUnique({
      where: { vin: vehicle.vin },
    })
    if (existingVin && existingVin.id !== id) throw new Error('ALREADY_EXISTS')
  }

  if (vehicle.supplierId) {
    const supplier = await prisma.supplier.findUnique({
      where: { id: vehicle.supplierId },
    })
    if (!supplier) throw new Error('SUPPLIER_NOT_FOUND')
  }

  if (vehicle.trimId) {
    const trim = await prisma.trim.findUnique({ where: { id: vehicle.trimId } })
    if (!trim) throw new Error('TRIM_NOT_FOUND')
  }

  await prisma.vehicle.update({
    where: { id },
    data: {
      vin: vehicle.vin,
      licensePlate: vehicle.licensePlate,
      color: vehicle.color,
      mileage: vehicle.mileage,
      arrivalDate: vehicle.arrivalDate,
      purchasePrice: vehicle.purchasePrice,
      suggestedPrice: vehicle.suggestedPrice,
      stockStatus: vehicle.stockStatus,
      rateCondition: vehicle.rateCondition,
      rateDescription: vehicle.rateDescription,
    },
  })
}

export const deleteVehicleService = async (id: number) => {
  const existingVehicle = await prisma.vehicle.findUnique({ where: { id } })
  if (!existingVehicle) throw new Error('NOT_FOUND')

  await prisma.vehicle.delete({ where: { id } })
}
