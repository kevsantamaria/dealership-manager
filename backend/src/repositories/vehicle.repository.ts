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

export const findVehicleByIdDetailed = async (id: number) => {
  const result = await pool`
    SELECT
      -- VEHICLE
      v.id AS "vehicleId",
      v.vin,
      v.license_plate AS "licensePlate",
      v.color,
      v.mileage,
      v.arrival_date AS "arrivalDate",
      v.purchase_price AS "purchasePrice",
      v.suggested_price AS "suggestedPrice",
      v.stock_status AS "stockStatus",
      v.rate_condition AS "rateCondition",
      v.rate_description AS "rateDescription",
      v.created_at AS "createdAt",
      v.updated_at AS "updatedAt",
      -- SUPPLIER
      s.id AS "supplierId",
      s.name AS "supplierName",
      s.contact AS "supplierContact",
      s.type AS "supplierType",
      s.country AS "supplierCountry",
      -- BRAND
      b.id AS "brandId",
      b.name AS "brandName",
      b.country_origin AS "brandCountryOrigin",
      -- MODEL
      m.id AS "modelId",
      m.name AS "modelName",
      m.launch_year AS "modelLaunchYear",
      -- TRIM
      t.id AS "trimId",
      t.name AS "trimName",
      t.engine_size AS "engineSize",
      t.horsepower,
      t.engine_type AS "engineType",
      t.transmission,
      t.drivetrain
    FROM
      vehicles v
      JOIN suppliers s ON s.id = v.supplier_id
      JOIN trims t ON t.id = v.trim_id
      JOIN models m ON m.id = t.model_id
      JOIN brands b ON b.id = m.brand_id
    WHERE
      v.id = ${id};
  `
  return result[0] ?? null
}

export const findAllVehiclesDetails = async () => {
  return await pool`
    SELECT
      v.color,
      v.suggested_price AS "price",
      v.stock_status AS "stockStatus",
      b.name AS "brand",
      m.name AS "model",
      m.launch_year AS "launchYear",
      t.name AS "trim"
    FROM
      vehicles v
      JOIN trims t ON t.id = v.trim_id
      JOIN models m ON m.id = t.model_id
      JOIN brands b ON b.id = m.brand_id
    ORDER BY
      v.created_at DESC;
  `
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
