import { pool } from '@/db/pool'
import type {
  CreateVehicleDTO,
  UpdateVehicleDTO,
} from '@/models/dtos/vehicle.dto'
import type { Brand } from '@/models/entities/brand'
import type { Model } from '@/models/entities/model'
import type { Supplier } from '@/models/entities/supplier'
import type { Trim } from '@/models/entities/trim'
import type { NewVehicle, UpdateVehicle } from '@/models/entities/vehicle'
import { createBrand, findBrandByName } from '@/repositories/brand.repository'
import {
  createModel,
  findModelByNameAndBrand,
} from '@/repositories/model.repository'
import { findSupplierById } from '@/repositories/supplier.repository'
import {
  createTrim,
  findTrimById,
  findTrimByNameAndModel,
} from '@/repositories/trim.repository'
import {
  createVehicle,
  deleteVehicle,
  findAllVehiclesDetails,
  findVehicleById,
  findVehicleByIdDetailed,
  findVehicleByVin,
  updateVehicle,
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

export const updateVehicleService = async (
  id: number,
  vehicle: UpdateVehicleDTO
) => {
  const existingVehicle = await findVehicleById(id)
  if (!existingVehicle) throw new Error('NOT_FOUND')

  if (Object.keys(vehicle).length === 0) throw new Error('NO_FIELDS_TO_UPDATE')

  const {
    vin,
    color,
    arrivalDate,
    licensePlate,
    mileage,
    purchasePrice,
    suggestedPrice,
    rateCondition,
    rateDescription,
    stockStatus,
    supplierId,
    trimId,
  } = vehicle

  if (vin) {
    const existingVin = await findVehicleByVin(vin)
    if (existingVin && existingVin.id !== id) throw new Error('ALREADY_EXISTS')
  }

  if (supplierId) {
    const supplier = await findSupplierById(supplierId)
    if (!supplier) throw new Error('SUPPLIER_NOT_FOUND')
  }

  if (trimId) {
    const trim = await findTrimById(trimId)
    if (!trim) throw new Error('TRIM_NOT_FOUND')
  }

  const updateData: UpdateVehicle = {}

  if (vin !== undefined) updateData.vin = vin
  if (color !== undefined) updateData.color = color
  if (arrivalDate !== undefined) updateData.arrivalDate = arrivalDate
  if (licensePlate !== undefined) updateData.licensePlate = licensePlate
  if (mileage !== undefined) updateData.mileage = mileage
  if (purchasePrice !== undefined) updateData.purchasePrice = purchasePrice
  if (suggestedPrice !== undefined) updateData.suggestedPrice = suggestedPrice
  if (rateCondition !== undefined) updateData.rateCondition = rateCondition
  if (rateDescription !== undefined)
    updateData.rateDescription = rateDescription
  if (stockStatus !== undefined) updateData.stockStatus = stockStatus
  if (supplierId !== undefined) updateData.supplierId = supplierId
  if (trimId !== undefined) updateData.trimId = trimId

  updateData.updatedAt = new Date().toISOString()

  await updateVehicle(id, updateData)
}

export const deleteVehicleService = async (id: number) => {
  const existingVehicle = await findVehicleById(id)
  if (!existingVehicle) throw new Error('NOT_FOUND')

  await deleteVehicle(id)
}
