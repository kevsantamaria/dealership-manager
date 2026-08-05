import { prisma } from '@/config/prisma'
import type { CreateTrimDTO } from '@/models/schemas/trim.schema'
import type { Prisma } from '@prisma/client'

export class TrimRepository {
  constructor() {}

  async findByNameAndModel(
    name: string,
    modelId: number,
    tx: Prisma.TransactionClient = prisma
  ) {
    return await tx.trim.findFirst({
      where: { name, modelId },
      select: { id: true },
    })
  }

  async create(data: CreateTrimDTO, modelId: number, tx: Prisma.TransactionClient = prisma) {
    return await tx.trim.create({
      data: { ...data, modelId },
      select: { id: true },
    })
  }

  async findById(id: number) {
    return (await prisma.trim.findUnique({ where: { id } })) !== null
  }

  async deleteManyByBrandId(brandId: number) {
    await prisma.trim.deleteMany({ where: { model: { brandId } } })
  }

  async findNamesAndIds() {
    return await prisma.trim.findMany({ select: { id: true, name: true } })
  }
}
