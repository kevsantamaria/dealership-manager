import type {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from '@/models/dtos/supplier.dto'
import type { Supplier } from '@/models/entities/supplier'
import {
  createSupplier,
  deleteSupplier,
  findAllSuppliers,
  findAllSuppliersWithNameAndId,
  findSupplierById,
  findSupplierByName,
  updateSupplier,
} from '@/repositories/supplier.repository'

export const createSupplierService = async (supplier: CreateSupplierDTO) => {
  const { name } = supplier

  const validSupplier = await findSupplierByName(name)
  if (validSupplier) throw new Error('SUPPLIER_ALREADY_EXISTS')

  const now = new Date().toISOString()
  const supplierToCreate: Omit<Supplier, 'id'> = {
    ...supplier,
    createdAt: now,
    updatedAt: now,
  }

  const createdSupplier: Supplier = await createSupplier(supplierToCreate)
  return createdSupplier
}

export const getAllSuppliersService = async () => {
  const suppliers: Supplier[] = await findAllSuppliers()
  return suppliers
}

export const getAllSuppliersWithNameAndIdService = async () => {
  const suppliers: Supplier[] = await findAllSuppliersWithNameAndId()
  return suppliers
}

export const getSupplierByIdService = async (id: number) => {
  const supplier: Supplier = await findSupplierById(id)

  if (!supplier) throw new Error('NOT_FOUND')
  return supplier
}

export const updateSupplierService = async (
  id: number,
  supplier: UpdateSupplierDTO
) => {
  const existingSupplier = await findSupplierById(id)
  if (!existingSupplier) throw new Error('NOT_FOUND')

  if (Object.keys(supplier).length === 0) throw new Error('NO_FIELDS_TO_UPDATE')

  const { name, contact, country, type } = supplier
  const supplierToUpdate: Partial<Supplier> = {}

  // validate name
  if (typeof name !== 'undefined') {
    if (name.trim() === '') {
      throw new Error('NO_FIELDS_TO_UPDATE')
    }

    const supplierWithSameName = await findSupplierByName(name)
    if (supplierWithSameName && supplierWithSameName.id !== id) {
      throw new Error('USERNAME_ALREADY_EXISTS')
    }
    supplierToUpdate.name = name
  }

  if (contact !== undefined) {
    supplierToUpdate.contact = contact
  }

  if (country !== undefined) {
    supplierToUpdate.country = country
  }

  if (type !== undefined) {
    supplierToUpdate.type = type
  }

  supplierToUpdate.updatedAt = new Date().toISOString()

  const updatedSupplier = await updateSupplier(id, supplierToUpdate)
  return updatedSupplier[0]
}

export const deleteSupplierService = async (id: number) => {
  const existingSupplier = await findSupplierById(id)
  if (!existingSupplier) throw new Error('NOT_FOUND')

  await deleteSupplier(id)
}
