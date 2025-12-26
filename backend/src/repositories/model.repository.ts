import { pool } from '@/db/pool'
import { sql } from 'bun'
import type { NewModel, UpdateModel } from '@/models/entities/model'

export const createModel = async (model: NewModel) => {
  const { name, launchYear, brandId } = model
  return await pool`
    INSERT INTO
      models (name, launch_year, brand_id)
    VALUES
      (
        ${name},
        ${launchYear},
        ${brandId}
      ) RETURNING *
  `
}

export const findAllModels = async () => {
  return await pool`SELECT * FROM models`
}

export const findModelById = async (id: number) => {
  const result = await pool`SELECT * FROM models WHERE id = ${id}`
  return result[0] ?? null
}

export const updateModel = async (id: number, model: UpdateModel) => {
  const { name, launchYear, brandId } = model
  return await pool`
    UPDATE models
    SET
      ${sql({ name, launch_year: launchYear, brand_id: brandId })}
    WHERE
      id = ${id} RETURNING *
  `
}

export const deleteModel = async (id: number) => {
  return await pool`DELETE FROM models WHERE id = ${id}`
}
