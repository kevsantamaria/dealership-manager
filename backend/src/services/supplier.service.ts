import { BadRequestError } from '@/errors/BadRequest'
import { ConflictError } from '@/errors/ConflictError'
import { NotFoundError } from '@/errors/NotFound'
import { UnauthorizedError } from '@/errors/UnauthorizedError'
import type {
  Supplier,
  SupplierWithVehicleCount,
} from '@/models/entities/supplier.entity'
import type {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from '@/models/schemas/supplier.schema'
import { SupplierRepository } from '@/repositories/supplier.repository'

export class SupplierService {
  constructor(private supplierRepository: SupplierRepository) {}

  async getAll(): Promise<SupplierWithVehicleCount[]> {
    const suppliers = await this.supplierRepository.findAllWithVehicleCount()
    return suppliers.map(({ _count, ...supplier }) => ({
      ...supplier,
      vehiclesCount: _count.vehicles,
    }))
  }

  async getAllNamesAndIds(): Promise<Pick<Supplier, 'id' | 'name'>[]> {
    return await this.supplierRepository.findAllNamesAndIds()
  }

  async getById(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findById(id)
    if (!supplier) throw new NotFoundError('Supplier')
    return supplier
  }

  async create(data: CreateSupplierDTO): Promise<Supplier> {
    const existingSupplier = await this.supplierRepository.findByName(data.name)
    if (existingSupplier) throw new ConflictError('Supplier already exists')

    return await this.supplierRepository.create(data)
  }

  async update(id: number, data: UpdateSupplierDTO): Promise<Supplier> {
    const existingSupplier = await this.supplierRepository.findById(id)
    if (!existingSupplier) throw new NotFoundError('Supplier')

    if (Object.keys(data).length === 0)
      throw new BadRequestError('No fields to update')

    if (data.name !== undefined) {
      if (data.name.trim() === '')
        throw new BadRequestError('Name cannot be empty')

      const supplierWithSameName = await this.supplierRepository.findByName(
        data.name
      )
      if (supplierWithSameName && supplierWithSameName.id !== id) {
        throw new ConflictError('Supplier with the same name already exists')
      }
    }

    return await this.supplierRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    const existingSupplier = await this.supplierRepository.findById(id)
    if (!existingSupplier) throw new NotFoundError('Supplier')

    const hasVehicles = await this.supplierRepository.hasVehicles(id)
    if (hasVehicles)
      throw new UnauthorizedError(
        'Supplier has associated vehicles and cannot be deleted'
      )

    await this.supplierRepository.delete(id)
  }
}
