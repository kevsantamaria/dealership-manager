import type {
  Brand,
  BrandWithNameAndId,
  BrandWithVehicleCount,
} from '@/models/entities/brand.entity'
import { BrandRepository } from '@/repositories/brand.repository'

export class BrandService {
  constructor(private brandRepository: BrandRepository) {}
  async getAll(): Promise<BrandWithVehicleCount[]> {
    return await this.brandRepository.findAllWithVehicleCount()
  }

  async getNamesAndIds(): Promise<BrandWithNameAndId[]> {
    return await this.brandRepository.findNamesAndIds()
  }

  async delete(id: number): Promise<void> {
    const existingBrand = await this.brandRepository.findById(id)
    if (!existingBrand) {
      throw new Error('NOT_FOUND')
    }

    const hasVehicles = await this.brandRepository.hasVehicles(id)
    if (hasVehicles) {
      throw new Error('BRAND_NOT_EMPTY')
    }

    await this.brandRepository.deleteWithHierarchy(id)
  }
}
