import type { Supplier } from '@/models/entities/supplier.entity'
import type {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from '@/models/schemas/supplier.schema'
import { SupplierRepository } from '@/repositories/supplier.repository'

const supplierRepository = new SupplierRepository()

export class SupplierService {
  async getAll(): Promise<Supplier[]> {
    return await supplierRepository.findAll()
  }

  async getAllNamesAndIds() {
    return await supplierRepository.findAllNamesAndIds()
  }

  async getById(id: number): Promise<Supplier> {
    const supplier = await supplierRepository.findById(id)
    if (!supplier) throw new Error('NOT_FOUND')
    return supplier
  }

  async create(data: CreateSupplierDTO): Promise<Supplier> {
    const existingSupplier = await supplierRepository.findByName(data.name)
    if (existingSupplier) throw new Error('SUPPLIER_ALREADY_EXISTS')

    return await supplierRepository.create(data)
  }

  async update(id: number, data: UpdateSupplierDTO): Promise<Supplier> {
    const existingSupplier = await supplierRepository.findById(id)
    if (!existingSupplier) throw new Error('NOT_FOUND')

    if (Object.keys(data).length === 0) throw new Error('NO_FIELDS_TO_UPDATE')

    if (data.name !== undefined) {
      if (data.name.trim() === '') throw new Error('NO_FIELDS_TO_UPDATE')

      const supplierWithSameName = await supplierRepository.findByName(
        data.name
      )
      if (supplierWithSameName && supplierWithSameName.id !== id) {
        throw new Error('SUPPLIER_ALREADY_EXISTS')
      }
    }

    return await supplierRepository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    const existingSupplier = await supplierRepository.findById(id)
    if (!existingSupplier) throw new Error('NOT_FOUND')

    const hasVehicles = await supplierRepository.hasVehicles(id)
    if (hasVehicles) throw new Error('SUPPLIER_NOT_EMPTY')

    await supplierRepository.delete(id)
  }
}
