import { prisma } from '@/lib/prisma'
import type { Supplier } from '@/models/entities/supplier.entity'
import type {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from '@/models/schemas/supplier.schema'

export class SupplierRepository {
  constructor() {}

  async findAll(): Promise<Supplier[]> {
    return await prisma.supplier.findMany()
  }

  async findAllNamesAndIds(): Promise<Pick<Supplier, 'id' | 'name'>[]> {
    return await prisma.supplier.findMany({ select: { id: true, name: true } })
  }

  async findById(id: number): Promise<Supplier | null> {
    return await prisma.supplier.findUnique({ where: { id } })
  }

  async findByName(name: string): Promise<Supplier | null> {
    return await prisma.supplier.findFirst({ where: { name } })
  }

  async create(data: CreateSupplierDTO): Promise<Supplier> {
    return await prisma.supplier.create({ data })
  }

  async update(id: number, data: UpdateSupplierDTO): Promise<Supplier> {
    return await prisma.supplier.update({ where: { id }, data })
  }

  async hasVehicles(id: number): Promise<boolean> {
    const vehicle = await prisma.vehicle.findFirst({
      where: { supplierId: id },
    })
    return vehicle !== null
  }

  async delete(id: number): Promise<void> {
    await prisma.supplier.delete({ where: { id } })
  }
}
