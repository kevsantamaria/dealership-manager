import { describe, it, expect, mock, type Mock } from 'bun:test'
import { createVehicleService } from '@/services/vehicle.service'

import {
  findVehicleByVin,
  createVehicle,
} from '@/repositories/vehicle.repository'
import { findSupplierById } from '@/repositories/supplier.repository'
import { findBrandByName } from '@/repositories/brand.repository'
import { findModelByNameAndBrand } from '@/repositories/model.repository'
import { findTrimByNameAndModel } from '@/repositories/trim.repository'
import { pool } from '@/db/pool'
import type { CreateVehicleDTO } from '@/models/dtos/vehicle.dto'

mock.module('@/repositories/vehicle.repository', () => ({
  findVehicleByVin: mock(),
  createVehicle: mock(),
}))

mock.module('@/repositories/supplier.repository', () => ({
  findSupplierById: mock(),
}))

mock.module('@/repositories/brand.repository', () => ({
  findBrandByName: mock(),
  createBrand: mock(),
}))

mock.module('@/repositories/model.repository', () => ({
  findModelByNameAndBrand: mock(),
  createModel: mock(),
}))

mock.module('@/repositories/trim.repository', () => ({
  findTrimByNameAndModel: mock(),
  createTrim: mock(),
}))

mock.module('@/db/pool', () => ({
  pool: {
    transaction: mock(),
  },
}))

describe('Pruebas para createVehicleService', () => {
  const mockVehicleData: CreateVehicleDTO = {
    vin: '9B1AB2C3D4E5F6G7H',
    color: 'Black',
    arrivalDate: '2024-09-10',
    purchasePrice: 32000,
    suggestedPrice: 37500,
    stockStatus: 'in_stock',
    rateCondition: 'bad',
    supplierId: 6,
    brand: { name: 'Chevrolet', countryOrigin: 'USA' },
    model: { name: 'Camaro', launchYear: 2021 },
    trim: {
      name: 'SS',
      engineSize: 6.2,
      horsepower: 455,
      engineType: 'gasoline',
      transmission: 'manual',
      drivetrain: 'rwd',
    },
  }

  it('debe lanzar error si el VIN ya existe', async () => {
    ;(findVehicleByVin as Mock<typeof findVehicleByVin>).mockResolvedValue({
      id: 1,
      vin: '9B1AB2C3D4E5F6G7H',
    })

    await expect(createVehicleService(mockVehicleData)).rejects.toThrow(
      'VEHICLE_ALREADY_EXISTS'
    )
  })

  it('debe crear el vehículo correctamente', async () => {
    // Configuración de mocks
    ;(findVehicleByVin as Mock<typeof findVehicleByVin>).mockResolvedValue(null)
    ;(findSupplierById as Mock<typeof findSupplierById>).mockResolvedValue({
      id: 6,
    })
    ;(findBrandByName as Mock<typeof findBrandByName>).mockResolvedValue({
      id: 10,
      name: 'Chevrolet',
    })
    ;(
      findModelByNameAndBrand as Mock<typeof findModelByNameAndBrand>
    ).mockResolvedValue({ id: 20, name: 'Camaro' })
    ;(
      findTrimByNameAndModel as Mock<typeof findTrimByNameAndModel>
    ).mockResolvedValue({ id: 30, name: 'SS' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(pool.transaction as any).mockImplementation(async (callback: any) => {
      return await callback('fake_transaction_client')
    })
    ;(createVehicle as Mock<typeof createVehicle>).mockResolvedValue({
      id: 99,
      ...mockVehicleData,
    })

    const result = await createVehicleService(mockVehicleData)

    expect(result).toHaveProperty('id', 99)
    expect(createVehicle).toHaveBeenCalled()
  })
})
