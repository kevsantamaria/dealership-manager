import { prisma } from '@/config/prisma'
import type { ModelWithNameAndId } from '@/models/entities/model.entity'
import type { CreateModelDTO } from '@/models/schemas/model.schema'
import type { Prisma } from '@prisma/client'

export class ModelRepository {
  constructor() {}

  async findByNameAndBrand(
    name: string,
    brandId: number,
    tx: Prisma.TransactionClient = prisma
  ) {
    return await tx.model.findFirst({
      where: { name, brandId },
    })
  }

  async create(data: CreateModelDTO, brandId: number, tx: Prisma.TransactionClient = prisma) {
    return await tx.model.create({
      data: { ...data, brandId },
    })
  }

  async deleteManyByBrandId(brandId: number) {
    await prisma.model.deleteMany({ where: { brandId } })
  }

  async findNamesAndIds(): Promise<ModelWithNameAndId[]> {
    return await prisma.model.findMany({ select: { id: true, name: true } })
  }
}
