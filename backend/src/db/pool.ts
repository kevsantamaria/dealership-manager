import { SQL, env } from 'bun'

const databaseUrl = env.DATABASE_URL
if (!databaseUrl) throw new Error('DATABASE_URL is missing')

export const pool = new SQL(databaseUrl)
