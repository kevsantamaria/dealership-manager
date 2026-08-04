import { ConflictError } from '@/errors/ConflictError'
import { NotFoundError } from '@/errors/NotFound'
import { UnauthorizedError } from '@/errors/UnauthorizedError'
import type {
  BrandWithNameAndId,
  BrandWithVehicleCount,
} from '@/models/entities/brand.entity'
import { BrandRepository } from '@/repositories/brand.repository'

export class BrandService {
  constructor(private brandRepository: BrandRepository) {}

  async getAll(): Promise<BrandWithVehicleCount[]> {
    const brands = await this.brandRepository.findAllWithVehicleCount()

    return brands.map((b) => ({
      id: b.id,
      name: b.name,
      countryOrigin: b.countryOrigin,
      vehiclesCount: b.models.map((c) => c.trims[0]?._count.vehicles)[0] || 0,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
    }))
  }

  async getNamesAndIds(): Promise<BrandWithNameAndId[]> {
    return await this.brandRepository.findNamesAndIds()
  }

  async delete(id: number): Promise<void> {
    const existingBrand = await this.brandRepository.findById(id)
    if (!existingBrand) {
      throw new NotFoundError('Brand')
    }

    const hasVehicles = await this.brandRepository.hasVehicles(id)
    if (hasVehicles) {
      throw new UnauthorizedError(
        'Brand has associated vehicles and cannot be deleted.'
      )
    }

    await this.brandRepository.deleteWithHierarchy(id)
  }
}
