import { describe, it, expect, mock, type Mock } from 'bun:test'
import {
  createSupplierService,
  deleteSupplierService,
} from '@/services/supplier.service'
import {
  findSupplierByName,
  createSupplier,
  findSupplierById,
  deleteSupplier,
} from '@/repositories/supplier.repository'
import type { CreateSupplierDTO } from '@/models/dtos/supplier.dto'

mock.module('@/repositories/supplier.repository', () => ({
  findSupplierByName: mock(),
  createSupplier: mock(),
  findSupplierById: mock(),
  deleteSupplier: mock(),
}))

describe('Test for createSupplierService', () => {
  const mockSupplierData: CreateSupplierDTO = {
    name: 'Car Company',
    contact: 'contact@carcompany.com',
    country: 'USA',
    type: 'importer',
  }

  it('error if the name is taken', async () => {
    ;(findSupplierByName as Mock<typeof findSupplierByName>).mockResolvedValue({
      id: 1,
      name: 'Car Company',
    })

    await expect(createSupplierService(mockSupplierData)).rejects.toThrow(
      'SUPPLIER_ALREADY_EXISTS'
    )

    expect(createSupplier).not.toHaveBeenCalled()
  })

  it('should create a supplier correctly', async () => {
    ;(findSupplierByName as Mock<typeof findSupplierByName>).mockResolvedValue(
      null
    )

    const mockCreated = { id: 99, ...mockSupplierData }
    ;(createSupplier as Mock<typeof createSupplier>).mockResolvedValue(
      mockCreated
    )

    const result = await createSupplierService(mockSupplierData)

    expect(result).toHaveProperty('id', 99)
    expect(result.name).toBe('Car Company')
    expect(createSupplier).toHaveBeenCalled()
  })
})

describe('Tests for deleteSupplierService', () => {
  const mockSupplierId = 1

  it('error if Supplier does not exist', async () => {
    ;(findSupplierById as Mock<typeof findSupplierById>).mockResolvedValue(null)

    await expect(deleteSupplierService(mockSupplierId)).rejects.toThrow(
      'NOT_FOUND'
    )
    expect(deleteSupplier).not.toHaveBeenCalled()
  })

  it('should delete the Supplier correctly', async () => {
    ;(findSupplierById as Mock<typeof findSupplierById>).mockResolvedValue({
      id: mockSupplierId,
    })
    ;(deleteSupplier as Mock<typeof deleteSupplier>).mockResolvedValue(
      undefined
    )

    await deleteSupplierService(mockSupplierId)

    expect(findSupplierById).toHaveBeenCalledWith(mockSupplierId)
    expect(deleteSupplier).toHaveBeenCalledWith(mockSupplierId)
  })
})
