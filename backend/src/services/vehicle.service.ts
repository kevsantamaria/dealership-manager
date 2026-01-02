import { pool } from '@/db/pool'
import type { CreateVehicleDTO } from '@/models/dtos/vehicle.dto'
import type { Brand } from '@/models/entities/brand'
import type { Model } from '@/models/entities/model'
import type { Supplier } from '@/models/entities/supplier'
import type { Trim } from '@/models/entities/trim'
import type { NewVehicle } from '@/models/entities/vehicle'
import { createBrand, findBrandByName } from '@/repositories/brand.repository'
import {
  createModel,
  findModelByNameAndBrand,
} from '@/repositories/model.repository'
import { findSupplierById } from '@/repositories/supplier.repository'
import {
  createTrim,
  findTrimByNameAndModel,
} from '@/repositories/trim.repository'
import {
  createVehicle,
  findAllVehiclesDetails,
  findVehicleByIdDetailed,
  findVehicleByVin,
} from '@/repositories/vehicle.repository'

export const createVehicleService = async (vehicle: CreateVehicleDTO) => {
  const { vin, supplierId, brand, model, trim } = vehicle

  const validVin = await findVehicleByVin(vin)
  if (validVin) throw new Error('VEHICLE_ALREADY_EXISTS')

  return await pool.transaction(async (tx) => {
    const supplier: Supplier = await findSupplierById(supplierId, tx)
    if (!supplier) throw new Error('NOT_FOUND')

    let existingBrand: Brand = await findBrandByName(brand.name, tx)
    if (!existingBrand) {
      existingBrand = await createBrand(brand, tx)
    }

    let existingModel: Model = await findModelByNameAndBrand(
      model.name,
      brand.name,
      tx
    )
    if (!existingModel) {
      const brandId = existingBrand.id
      existingModel = await createModel({ ...model, brandId }, tx)
    }

    let existingTrim: Trim = await findTrimByNameAndModel(
      trim.name,
      model.name,
      tx
    )
    if (!existingTrim) {
      const modelId = existingModel.id
      existingTrim = await createTrim({ ...trim, modelId }, tx)
    }

    const newVehicle: NewVehicle = {
      vin,
      licensePlate: vehicle.licensePlate ?? null,
      color: vehicle.color,
      mileage: vehicle.mileage ?? null,
      arrivalDate: vehicle.arrivalDate,
      purchasePrice: vehicle.purchasePrice,
      suggestedPrice: vehicle.suggestedPrice,
      stockStatus: vehicle.stockStatus,
      rateCondition: vehicle.rateCondition,
      rateDescription: vehicle.rateDescription ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      trimId: existingTrim.id,
      supplierId,
    }

    const createdVehicle = await createVehicle(newVehicle, tx)

    return createdVehicle
  })
}

export const getAllVehiclesService = async () => {
  const vehicles = await findAllVehiclesDetails()

  return vehicles
}

export const getVehicleByIdService = async (id: number) => {
  const detailedVehicle = await findVehicleByIdDetailed(id)

  if (!detailedVehicle) throw new Error('NOT_FOUND')
  return detailedVehicle
}
