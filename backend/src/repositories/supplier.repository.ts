import { prisma } from '@/config/prisma'
import type {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from '@/models/schemas/supplier.schema'

export class SupplierRepository {
  constructor() {}

  async findAllWithVehicleCount() {
    return await prisma.supplier.findMany({
      include: { _count: { select: { vehicles: true } } },
    })
  }

  async findAllNamesAndIds() {
    return await prisma.supplier.findMany({ select: { id: true, name: true } })
  }

  async findById(id: number) {
    return await prisma.supplier.findUnique({ where: { id } })
  }

  async findByName(name: string) {
    return await prisma.supplier.findFirst({ where: { name } })
  }

  async create(data: CreateSupplierDTO) {
    return await prisma.supplier.create({ data })
  }

  async update(id: number, data: UpdateSupplierDTO) {
    return await prisma.supplier.update({ where: { id }, data })
  }

  async hasVehicles(id: number) {
    const vehicle = await prisma.vehicle.findFirst({
      where: { supplierId: id },
    })
    return vehicle !== null
  }

  async delete(id: number) {
    await prisma.supplier.delete({ where: { id } })
  }
}
