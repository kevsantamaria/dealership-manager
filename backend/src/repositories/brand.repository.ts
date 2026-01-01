import { pool } from '@/db/pool'
import { SQL, sql } from 'bun'
import type { NewBrand, UpdateBrand } from '@/models/entities/brand'

export const createBrand = async (brand: NewBrand, db: SQL = pool) => {
  const { name, countryOrigin } = brand
  return await db`
    INSERT INTO
      brands (name, country_origin)
    VALUES
      (
        ${name},
        ${countryOrigin}
      ) RETURNING *
  `
}

export const findAllBrands = async () => {
  return await pool`SELECT * FROM brands`
}

export const findBrandById = async (id: number) => {
  const result = await pool`SELECT * FROM brands WHERE id = ${id}`
  return result[0] ?? null
}

export const findBrandByName = async (name: string, db: SQL = pool) => {
  const result = await db`SELECT * FROM brands WHERE name = ${name}`
  return result[0] ?? null
}

export const updateBrand = async (id: number, brand: UpdateBrand) => {
  const { name, countryOrigin } = brand
  return await pool`
    UPDATE brands
    SET
      ${sql({ name, country_origin: countryOrigin })}
    WHERE
      id = ${id} RETURNING *
  `
}

export const deleteBrand = async (id: number) => {
  return await pool`DELETE FROM brands WHERE id = ${id}`
}
