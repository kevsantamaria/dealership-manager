import { pool } from '@/db/pool'
import type { CreateVehicleDTO } from '@/models/dtos/vehicle.dto'
import { createBrand } from '@/repositories/brand.repository'
import { createModel } from '@/repositories/model.repository'
import { createTrim } from '@/repositories/trim.repository'
import {
  createVehicle,
  findVehicleByVin,
} from '@/repositories/vehicle.repository'

export const createVehicleService = async (vehicle: CreateVehicleDTO) => {
  const { vin } = vehicle

  const validVin = await findVehicleByVin(vin)
  if (validVin) throw new Error('VEHICLE_ALREADY_EXISTS')

  const client = await pool.connect()

  try {
    await client`BEGIN ${createVehicle}, ${createTrim}, ${createModel}, ${createBrand} COMMIT`
  } catch (error) {
    await client`ROLLBACK`
    throw error
  } finally {
    client.rel
  }
}
