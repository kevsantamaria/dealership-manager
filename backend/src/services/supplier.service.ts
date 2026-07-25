import type { Supplier } from '@/models/entities/supplier.entity'
import type {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from '@/models/schemas/supplier.schema'
import { SupplierRepository } from '@/repositories/supplier.repository'

export class SupplierService {
  constructor(private supplierRepository: SupplierRepository) {}

  async getAll(): Promise<Supplier[]> {
    return await this.supplierRepository.findAll()
  }

  async getAllNamesAndIds() {
    return await this.supplierRepository.findAllNamesAndIds()
  }

  async getById(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findById(id)
    if (!supplier) throw new Error('NOT_FOUND')
    return supplier
  }

  async create(data: CreateSupplierDTO): Promise<Supplier> {
    const existingSupplier = await this.supplierRepository.findByName(data.name)
    if (existingSupplier) throw new Error('SUPPLIER_ALREADY_EXISTS')

    return await this.supplierRepository.create(data)
  }

  async update(id: number, data: UpdateSupplierDTO): Promise<Supplier> {
    const existingSupplier = await this.supplierRepository.findById(id)
    if (!existingSupplier) throw new Error('NOT_FOUND')

    if (Object.keys(data).length === 0) throw new Error('NO_FIELDS_TO_UPDATE')

    if (data.name !== undefined) {
      if (data.name.trim() === '') throw new Error('NO_FIELDS_TO_UPDATE')

      const supplierWithSameName = await this.supplierRepository.findByName(
        data.name
      )
      if (supplierWithSameName && supplierWithSameName.id !== id) {
        throw new Error('SUPPLIER_ALREADY_EXISTS')
      }
    }

    return await this.supplierRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    const existingSupplier = await this.supplierRepository.findById(id)
    if (!existingSupplier) throw new Error('NOT_FOUND')

    const hasVehicles = await this.supplierRepository.hasVehicles(id)
    if (hasVehicles) throw new Error('SUPPLIER_NOT_EMPTY')

    await this.supplierRepository.delete(id)
  }
}
