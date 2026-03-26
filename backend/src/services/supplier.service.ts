import { prisma } from '@/lib/prisma'
import type {
  CreateSupplierDTO,
  UpdateSupplierDTO,
} from '@/models/dtos/supplier.dto'
import type { Supplier } from '@/models/entities/supplier'

export const createSupplierService = async (supplier: CreateSupplierDTO) => {
  const { name, country, contact, type } = supplier

  const validSupplier = await prisma.supplier.findFirst({
    where: { name },
  })
  if (validSupplier) throw new Error('SUPPLIER_ALREADY_EXISTS')

  const createdSupplier = await prisma.supplier.create({
    data: {
      name,
      contact,
      country,
      type,
    },
  })
  return createdSupplier
}

export const getAllSuppliersService = async () => {
  return await prisma.supplier.findMany()
}

export const getAllSuppliersWithNameAndIdService = async () => {
  return await prisma.supplier.findMany({ select: { id: true, name: true } })
}

export const getSupplierByIdService = async (id: number) => {
  const supplier = await prisma.supplier.findUnique({ where: { id } })
  if (!supplier) throw new Error('NOT_FOUND')
  return supplier
}

export const updateSupplierService = async (
  id: number,
  supplier: UpdateSupplierDTO
) => {
  const existingSupplier = await prisma.supplier.findUnique({ where: { id } })
  if (!existingSupplier) throw new Error('NOT_FOUND')

  if (Object.keys(supplier).length === 0) throw new Error('NO_FIELDS_TO_UPDATE')

  const { name, ...restOfFields } = supplier
  const supplierToUpdate: Partial<Supplier> = {}

  // validate name
  if (typeof name !== 'undefined') {
    if (name.trim() === '') {
      throw new Error('NO_FIELDS_TO_UPDATE')
    }

    const supplierWithSameName = await prisma.supplier.findFirst({
      where: { name: name },
    })
    if (supplierWithSameName && supplierWithSameName.id !== id) {
      throw new Error('USERNAME_ALREADY_EXISTS')
    }
    supplierToUpdate.name = name
  }
  const cleanFields = Object.fromEntries(
    Object.entries(restOfFields).filter(([value]) => value !== undefined)
  )

  Object.assign(supplierToUpdate, cleanFields)
  supplierToUpdate.updatedAt = new Date()

  const updatedSupplier = await prisma.supplier.update({
    where: { id },
    data: supplierToUpdate,
  })
  return updatedSupplier
}

export const deleteSupplierService = async (id: number) => {
  const existingSupplier = await prisma.supplier.findUnique({ where: { id } })
  if (!existingSupplier) throw new Error('NOT_FOUND')

  const notHaveVehicles = await prisma.vehicle.findFirst({
    where: { supplierId: id },
  })
  if (!notHaveVehicles) {
    throw new Error('SUPPLIER_NOT_EMPTY')
  }

  await prisma.supplier.delete({ where: { id } })
}
