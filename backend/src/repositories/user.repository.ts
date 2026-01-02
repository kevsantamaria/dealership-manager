import { pool } from '@/db/pool'
import type { NewUser, UpdateUser } from '@/models/entities/user'
import { sql } from 'bun'

export const createUser = async (user: NewUser) => {
  const { username, password, role, createdAt, updatedAt } = user
  const result = await pool`
    INSERT INTO
      users (username, password, role, created_at, updated_at)
    VALUES
      (
        ${username},
        ${password},
        ${role},
        ${createdAt},
        ${updatedAt}
      ) RETURNING *
  `
  return result[0]
}

export const findAllUsers = async () => {
  return await pool`SELECT * FROM users`
}

export const findUserById = async (id: number) => {
  const result = await pool`SELECT * FROM users WHERE id = ${id}`
  return result[0] ?? null
}

export const findUserByUsername = async (username: string) => {
  const result = await pool`SELECT * FROM users WHERE username = ${username}`
  return result[0] ?? null
}

export const updateUser = async (id: number, user: UpdateUser) => {
  const { username, password, role, updatedAt } = user
  const result = await pool`
    UPDATE users
    SET
      ${sql({ username, password, role, updated_at: updatedAt })}
    WHERE
      id = ${id} RETURNING *
  `
  return result[0]
}

export const deleteUser = async (id: number) => {
  return await pool`DELETE FROM users WHERE id = ${id} RETURNING *`
}
