import { pool } from '@/db/pool'

export const findAllVehicles = async () => {
  return await pool`SELECT * FROM vehicles`
}
