import { pool } from '@/db/pool'
import type { NewTrim, UpdateTrim } from '@/models/entities/trim'
import { SQL, sql } from 'bun'

export const createTrim = async (trim: NewTrim, db: SQL = pool) => {
  const {
    name,
    transmission,
    horsepower,
    engineType,
    engineSize,
    drivetrain,
    modelId,
  } = trim
  const result = await db`
    INSERT INTO
      trims (
        name,
        transmission,
        horsepower,
        engine_type,
        engine_size,
        drivetrain,
        model_id
      )
    VALUES
      (
        ${name},
        ${transmission},
        ${horsepower},
        ${engineType},
        ${engineSize},
        ${drivetrain},
        ${modelId}
      ) RETURNING *
  `
  return result[0]
}

export const findAllTrims = async () => {
  return await pool`SELECT * FROM trims`
}

export const findTrimById = async (id: number) => {
  const result = await pool`SELECT * FROM trims WHERE id = ${id}`
  return result[0] ?? null
}

export const updateTrim = async (id: number, trim: UpdateTrim) => {
  const {
    name,
    transmission,
    horsepower,
    engineType,
    engineSize,
    drivetrain,
    modelId,
  } = trim
  const result = await pool`
    UPDATE trims
    SET
      ${sql({
        name,
        transmission,
        horsepower,
        engine_type: engineType,
        engine_size: engineSize,
        drivetrain,
        model_id: modelId,
      })}
    WHERE
      id = ${id} RETURNING *
  `
  return result[0]
}

export const deleteTrim = async (id: number) => {
  return await pool`DELETE FROM trims WHERE id = ${id} RETURNING *`
}
