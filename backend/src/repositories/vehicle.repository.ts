import { pool } from '@/db/pool'
import type { NewVehicle, UpdateVehicle } from '@/models/entities/vehicle'
import { SQL, sql } from 'bun'

export const createVehicle = async (vehicle: NewVehicle, db: SQL = pool) => {
  const {
    vin,
    licensePlate,
    color,
    mileage,
    arrivalDate,
    purchasePrice,
    suggestedPrice,
    stockStatus,
    rateCondition,
    rateDescription,
    createdAt,
    updatedAt,
    trimId,
    supplierId,
  } = vehicle
  const result = await db`
    INSERT INTO
      vehicles (
        vin,
        license_plate,
        color,
        mileage,
        arrival_date,
        purchase_price,
        suggested_price,
        stock_status,
        rate_condition,
        rate_description, 
        created_at,
        updated_at,
        trim_id,
        supplier_id
      )
    VALUES
      (
        ${vin},
        ${licensePlate},
        ${color},
        ${mileage},
        ${arrivalDate},
        ${purchasePrice},
        ${suggestedPrice},
        ${stockStatus},
        ${rateCondition},
        ${rateDescription},
        ${createdAt},
        ${updatedAt},
        ${trimId},
        ${supplierId}
      ) RETURNING *
  `
  return result[0]
}

export const findAllVehicles = async () => {
  return await pool`SELECT * FROM vehicles`
}

export const findVehicleById = async (id: number) => {
  const result = await pool`SELECT * FROM vehicles WHERE id = ${id}`
  return result[0] ?? null
}

export const findVehicleByVin = async (vin: string) => {
  const result = await pool`SELECT * FROM vehicles WHERE vin = ${vin}`
  return result[0] ?? null
}

export const updateVehicle = async (id: number, vehicle: UpdateVehicle) => {
  const {
    vin,
    licensePlate,
    color,
    mileage,
    arrivalDate,
    purchasePrice,
    suggestedPrice,
    stockStatus,
    rateCondition,
    rateDescription,
    updatedAt,
    trimId,
    supplierId,
  } = vehicle
  const result = await pool`
    UPDATE vehicles
    SET
      ${sql({
        vin,
        license_plate: licensePlate,
        color,
        mileage,
        arrival_date: arrivalDate,
        purchase_price: purchasePrice,
        suggested_price: suggestedPrice,
        stock_status: stockStatus,
        rate_condition: rateCondition,
        rate_description: rateDescription,
        trim_id: trimId,
        supplier_id: supplierId,
        updated_at: updatedAt,
      })}
    WHERE
      id = ${id} RETURNING *
  `
  return result[0]
}

export const deleteVehicle = async (id: number) => {
  return await pool`DELETE FROM vehicles WHERE id = ${id} RETURNING *`
}
