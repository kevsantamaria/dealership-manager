import { pool } from '@/db/pool'
import { sql } from 'bun'
import type { SQL } from 'bun'
import type { NewModel, UpdateModel } from '@/models/entities/model'

export const createModel = async (model: NewModel, db: SQL = pool) => {
  const { name, launchYear, brandId } = model
  const result = await db`
    INSERT INTO
      models (name, launch_year, brand_id)
    VALUES
      (
        ${name},
        ${launchYear},
        ${brandId}
      ) RETURNING *
  `
  return result[0]
}

export const findAllModels = async () => {
  return await pool`SELECT * FROM models`
}

export const findModelById = async (id: number) => {
  const result = await pool`SELECT * FROM models WHERE id = ${id}`
  return result[0] ?? null
}

export const findModelByNameAndBrand = async (
  name: string,
  brandName: string,
  db: SQL = pool
) => {
  const result = await db`
    SELECT
      m.*
    FROM
      models m
      INNER JOIN brands b ON m.brand_id = b.id
    WHERE
      m.name = ${name}
      AND b.name = ${brandName}
  `
  return result[0] ?? null
}

export const updateModel = async (id: number, model: UpdateModel) => {
  const { name, launchYear, brandId } = model
  const result = await pool`
    UPDATE models
    SET
      ${sql({ name, launch_year: launchYear, brand_id: brandId })}
    WHERE
      id = ${id} RETURNING *
  `
  return result[0]
}

export const deleteModel = async (id: number) => {
  return await pool`DELETE FROM models WHERE id = ${id}`
}
