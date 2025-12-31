import { pool } from '@/db/pool'
import type { NewSupplier, UpdateSupplier } from '@/models/entities/supplier'
import { sql } from 'bun'

export const createSupplier = async (supplier: NewSupplier) => {
  const { name, type, country, contact, createdAt, updatedAt } = supplier
  return await pool`
    INSERT INTO
      suppliers (
        name,
        type,
        country,
        contact,
        created_at,
        updated_at
      )
    VALUES
      (
        ${name},
        ${type},
        ${country},
        ${contact},
        ${createdAt},
        ${updatedAt}
      ) RETURNING *
  `
}

export const findAllSuppliers = async () => {
  return await pool`SELECT * FROM suppliers`
}

export const findSupplierById = async (id: number) => {
  const result = await pool`SELECT * FROM suppliers WHERE id = ${id}`
  return result[0] ?? null
}

export const findSupplierByName = async (name: string) => {
  const result = await pool`SELECT * FROM suppliers WHERE name = ${name}`
  return result[0] ?? null
}

export const updateSupplier = async (id: number, supplier: UpdateSupplier) => {
  const { name, type, country, contact, updatedAt } = supplier
  return await pool`
    UPDATE suppliers
    SET
      ${sql({ name, type, country, contact, updated_at: updatedAt })}
    WHERE
      id = ${id} RETURNING *
  `
}

export const deleteSupplier = async (id: number) => {
  return await pool`DELETE FROM suppliers WHERE id = ${id}`
}
