import { env } from '@/config/env'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const pool = new PrismaPg({ connectionString: env.DATABASE_URL! })
export const prisma = new PrismaClient({ adapter: pool })
