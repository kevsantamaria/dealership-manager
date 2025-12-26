import { pool } from '@/db/pool'
import type { NewUser, UpdateUser } from '@/models/entities/user'
import { sql } from 'bun'

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

export const createUser = async (user: NewUser) => {
  const { username, password, role, createdAt, updatedAt } = user
  return await pool`INSERT INTO users (username, password, role, created_at, updated_at) VALUES (${username}, ${password}, ${role}, ${createdAt}, ${updatedAt}) RETURNING *`
}

export const deleteUser = async (id: number) => {
  return await pool`DELETE FROM users WHERE id = ${id} RETURNING *`
}

export const updateUser = async (id: number, user: UpdateUser) => {
  const { username, password, role, updatedAt } = user
  return await pool`UPDATE users SET ${sql({ username, password, role, updated_at: updatedAt })} WHERE id = ${id} RETURNING *`
}
