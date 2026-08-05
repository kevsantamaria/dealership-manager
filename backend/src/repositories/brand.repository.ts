import { prisma } from '@/config/prisma'
import type {
  Brand,
  BrandWithNameAndId,
  BrandWithVehicleCount,
} from '@/models/entities/brand.entity'
import type { CreateBrandDTO } from '@/models/schemas/brand.schema'
import type { Prisma } from '@prisma/client'

export class BrandRepository {
  constructor() {}

  async findAllWithVehicleCount() {
    return await prisma.brand.findMany({
      include: {
        models: {
          select: {
            trims: {
              select: {
                _count: {
                  select: { vehicles: true },
                },
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
  }

  async findById(id: number) {
    return await prisma.brand.findUnique({ where: { id } })
  }

  async findByName(name: string, tx: Prisma.TransactionClient = prisma) {
    return await tx.brand.findFirst({ where: { name } })
  }

  async create(data: CreateBrandDTO, tx: Prisma.TransactionClient = prisma) {
    return await tx.brand.create({ data })
  }

  async findNamesAndIds() {
    return await prisma.brand.findMany({ select: { id: true, name: true } })
  }

  async hasVehicles(id: number) {
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        trim: {
          model: {
            brandId: id,
          },
        },
      },
      select: { id: true },
    })
    return vehicle !== null
  }

  async deleteWithHierarchy(id: number) {
    await prisma.$transaction(async (tx) => {
      await tx.trim.deleteMany({ where: { model: { brandId: id } } })
      await tx.model.deleteMany({ where: { brandId: id } })
      await tx.brand.delete({ where: { id } })
    })
  }
}
