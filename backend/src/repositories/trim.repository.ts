import { prisma } from '@/config/prisma'
import type { CreateTrimDTO } from '@/models/schemas/trim.schema'

export class TrimRepository {
  constructor() {}

  async findByNameAndModel(name: string, modelId: number) {
    return await prisma.trim.findFirst({
      where: { name, modelId },
      select: { id: true },
    })
  }

  async create(data: CreateTrimDTO) {
    return await prisma.trim.create({ data, select: { id: true } })
  }

  async findById(id: number) {
    return (await prisma.trim.findUnique({ where: { id } })) !== null
  }

  async deleteManyByBrandId(brandId: number) {
    await prisma.trim.deleteMany({ where: { model: { brandId } } })
  }
}
