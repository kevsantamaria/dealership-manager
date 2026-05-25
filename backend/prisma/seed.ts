import {
  PrismaClient,
  RateCondition,
  StockStatus,
  Role,
  SupplierType,
  EngineType,
  Transmission,
  Drivetrain,
} from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { faker } from '@faker-js/faker'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) throw new Error('DATABASE_URL is missing')

const pool = new Pool({ connectionString: databaseUrl })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Initializing seeding...')

  // 1. Users
  await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        password: await bcrypt.hash('qwerty123', 10),
        role: 'admin' as Role,
      },
      {
        username: 'user',
        password: await bcrypt.hash('qwerty123', 10),
        role: 'user' as Role,
      },
    ],
  })

  // 2. Suppliers
  const supplierTypes: SupplierType[] = [
    'private',
    'dealer',
    'auction',
    'importer',
    'fleet',
  ]

  const suppliers = await Promise.all(
    Array.from({ length: 8 }).map((_, i) =>
      prisma.supplier.create({
        data: {
          name: faker.company.name(),
          contact: faker.internet.email(),
          type: supplierTypes[i % supplierTypes.length],
          country: faker.location.country(),
        },
      })
    )
  )

  // 3. Brands, Models, Trims
  const carData = [
    {
      brand: 'Toyota',
      country: 'Japan',
      models: [
        {
          name: 'Corolla',
          year: 2024,
          trims: [{ name: 'LE', engine: 2.0, hp: 169 }],
        },
        {
          name: 'RAV4',
          year: 2024,
          trims: [{ name: 'XLE', engine: 2.5, hp: 203 }],
        },
      ],
    },
    {
      brand: 'Honda',
      country: 'Japan',
      models: [
        {
          name: 'Civic',
          year: 2024,
          trims: [{ name: 'Sport', engine: 2.0, hp: 158 }],
        },
      ],
    },
    {
      brand: 'BMW',
      country: 'Germany',
      models: [
        {
          name: 'M3',
          year: 2023,
          trims: [{ name: 'Competition', engine: 3.0, hp: 503 }],
        },
      ],
    },
    {
      brand: 'Ford',
      country: 'USA',
      models: [
        {
          name: 'F-150',
          year: 2024,
          trims: [{ name: 'Lariat', engine: 3.5, hp: 400 }],
        },
      ],
    },
  ]

  const createdTrims: { id: number }[] = []

  for (const item of carData) {
    const brand = await prisma.brand.create({
      data: { name: item.brand, countryOrigin: item.country },
    })

    for (const m of item.models) {
      const model = await prisma.model.create({
        data: { name: m.name, launchYear: m.year, brandId: brand.id },
      })

      for (const t of m.trims) {
        const trim = await prisma.trim.create({
          data: {
            name: t.name,
            engineSize: t.engine,
            horsepower: t.hp,
            modelId: model.id,
            engineType: 'gasoline' as EngineType,
            transmission: 'automatic' as Transmission,
            drivetrain: 'fwd' as Drivetrain,
          },
        })
        createdTrims.push({ id: Number(trim.id) })
      }
    }
  }

  // 4. Generate 100 vehicles
  const colors = [
    'black',
    'blue',
    'gray',
    'green',
    'orange',
    'red',
    'white',
    'yellow',
    'brown',
    'aqua',
    'chartreuse',
    'crimson',
    'pink',
  ]

  const startDate = new Date('2025-06-01')
  const endDate = new Date('2026-01-31')
  const threeMonthsAgo = new Date('2025-11-01')

  const vehiclesData = Array.from({ length: 100 }).map(() => {
    const arrivalDate = faker.date.between({ from: startDate, to: endDate })
    const randomTrim =
      createdTrims[Math.floor(Math.random() * createdTrims.length)]
    const randomSupplier =
      suppliers[Math.floor(Math.random() * suppliers.length)]

    let status: StockStatus
    if (arrivalDate < threeMonthsAgo) {
      status = 'sold' as StockStatus
    } else {
      const statuses: StockStatus[] = ['in_stock', 'reserved', 'sold']
      status = statuses[Math.floor(Math.random() * statuses.length)]
    }

    return {
      vin: faker.vehicle.vin(),
      licensePlate: faker.vehicle.vrm(),
      color: colors[Math.floor(Math.random() * colors.length)],
      mileage: faker.number.int({ min: 0, max: 50000 }),
      arrivalDate,
      purchasePrice: faker.number.int({ min: 15000, max: 40000 }),
      suggestedPrice: faker.number.int({ min: 45000, max: 60000 }),
      stockStatus: status,
      rateCondition: 'good' as RateCondition,
      trimId: randomTrim.id,
      supplierId: Number(randomSupplier.id),
    }
  })

  await prisma.vehicle.createMany({ data: vehiclesData })
  console.log('✅ Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
