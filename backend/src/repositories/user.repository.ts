import { pool } from '@/db/pool'

export const FindAllUsers = async () => {
  return await pool`SELECT * FROM users`
}
