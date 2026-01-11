import { pool } from '@/db/pool'
import { SQL, sql } from 'bun'
import type { NewBrand, UpdateBrand } from '@/models/entities/brand'

export const createBrand = async (brand: NewBrand, db: SQL = pool) => {
  const { name, countryOrigin } = brand
  const result = await db`
    INSERT INTO
      brands (name, country_origin)
    VALUES
      (
        ${name},
        ${countryOrigin}
      ) RETURNING *
  `
  return result[0]
}

export const findAllBrands = async () => {
  return await pool`SELECT * FROM brands`
}

export const findAllBrandsWithVehicles = async () => {
  return await pool`
    SELECT
      b.id,
      b.name,
      b.country_origin AS "countryOrigin",
      COUNT(v.id) AS "numberOfVehicles"
    FROM
      brands b
      LEFT JOIN models m ON b.id = m.brand_id
      LEFT JOIN trims t ON m.id = t.model_id
      LEFT JOIN vehicles v ON t.id = v.trim_id
    GROUP BY
      b.id
    ORDER BY
      b.name;
  `
}

export const findBrandById = async (id: number) => {
  const result = await pool`SELECT * FROM brands WHERE id = ${id}`
  return result[0] ?? null
}

export const findBrandByName = async (name: string, db: SQL = pool) => {
  const result = await db`SELECT * FROM brands WHERE name = ${name}`
  return result[0] ?? null
}

export const isBrandEmpty = async (id: number) => {
  const result = await pool`
    SELECT count(v.id) = 0 AS "isEmpty"
    FROM brands b
    LEFT JOIN models m ON b.id = m.brand_id
    LEFT JOIN trims t ON m.id = t.model_id
    LEFT JOIN vehicles v ON t.id = v.trim_id
    WHERE b.id = ${id}
    GROUP BY b.id
  `
  return result[0]?.isEmpty ?? true 
}

export const updateBrand = async (id: number, brand: UpdateBrand) => {
  const { name, countryOrigin } = brand
  const result = await pool`
    UPDATE brands
    SET
      ${sql({ name, country_origin: countryOrigin })}
    WHERE
      id = ${id} RETURNING *
  `
  return result[0]
}

export const deleteBrand = async (id: number) => {
  return await pool`DELETE FROM brands WHERE id = ${id}`
}
