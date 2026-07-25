import { prisma } from '@/config/prisma'
import type {
  Brand,
  BrandWithNameAndId,
  BrandWithVehicleCount,
} from '@/models/entities/brand.entity'
import type { CreateBrandDTO } from '@/models/schemas/brand.schema'

export class BrandRepository {
  constructor() {}

  async findAllWithVehicleCount(): Promise<BrandWithVehicleCount[]> {
    const brands = await prisma.brand.findMany({
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
    return brands.map((b) => ({
      id: b.id,
      name: b.name,
      countryOrigin: b.countryOrigin,
      vehiclesCount: b.models.map((c) => c.trims[0]?._count.vehicles),
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
    }))
  }

  async findById(id: number): Promise<Brand | null> {
    return await prisma.brand.findUnique({ where: { id } })
  }

  async findByName(name: string): Promise<boolean> {
    return (await prisma.brand.findFirst({ where: { name } })) !== null
  }

  async create(data: CreateBrandDTO): Promise<Brand> {
    return await prisma.brand.create({ data })
  }

  async findNamesAndIds(): Promise<BrandWithNameAndId[]> {
    return await prisma.brand.findMany({ select: { id: true, name: true } })
  }

  async hasVehicles(id: number): Promise<boolean> {
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

  async deleteWithHierarchy(id: number): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await tx.trim.deleteMany({ where: { model: { brandId: id } } })
      await tx.model.deleteMany({ where: { brandId: id } })
      await tx.brand.delete({ where: { id } })
    })
  }
}
