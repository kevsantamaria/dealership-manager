import { prisma } from '@/lib/prisma'
import type { Model } from '@/models/entities/model.entity'
import type { CreateModelDTO } from '@/models/schemas/model.schema'

export class ModelRepository {
  constructor() {}

  async findByNameAndBrand(
    name: string,
    brandId: number
  ): Promise<Model | null> {
    return await prisma.model.findFirst({
      where: { name, brandId },
    })
  }

  async create(data: CreateModelDTO): Promise<Model> {
    return await prisma.model.create({ data })
  }

  async deleteManyByBrandId(brandId: number): Promise<void> {
    await prisma.model.deleteMany({ where: { brandId } })
  }
}
