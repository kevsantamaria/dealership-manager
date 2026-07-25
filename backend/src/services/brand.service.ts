import type { Brand, BrandWithNameAndId, BrandWithVehicleCount } from '@/models/entities/brand.entity'
import { BrandRepository } from '@/repositories/brand.repository'

const brandRepository = new BrandRepository()

export class BrandService {
  async getAll(): Promise<BrandWithVehicleCount[]> {
    return await brandRepository.findAllWithVehicleCount()
  }

  async getNamesAndIds(): Promise<BrandWithNameAndId[]> {
    return await brandRepository.findNamesAndIds()
  }

  async delete(id: number): Promise<void> {
    const existingBrand = await brandRepository.findById(id)
    if (!existingBrand) {
      throw new Error('NOT_FOUND')
    }

    const hasVehicles = await brandRepository.hasVehicles(id)
    if (hasVehicles) {
      throw new Error('BRAND_NOT_EMPTY')
    }

    await brandRepository.deleteWithHierarchy(id)
  }
}
