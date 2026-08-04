import { prisma } from '@/config/prisma'
import type { Model } from '@/models/entities/model.entity'
import type { CreateModelDTO } from '@/models/schemas/model.schema'

export class ModelRepository {
  constructor() {}

  async findByNameAndBrand(name: string, brandId: number) {
    return await prisma.model.findFirst({
      where: { name, brandId },
    })
  }

  async create(data: CreateModelDTO) {
    return await prisma.model.create({ data })
  }

  async deleteManyByBrandId(brandId: number) {
    await prisma.model.deleteMany({ where: { brandId } })
  }
}
