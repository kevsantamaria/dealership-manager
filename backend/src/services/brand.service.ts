import type { Brand } from '@/models/entities/brand'
import { deleteBrand, findAllBrandsWithVehicles, findBrandById, isBrandEmpty } from '@/repositories/brand.repository'

export const getAllBrandsService = async () => {
  const brands: Brand[] = await findAllBrandsWithVehicles()
  return brands
}

export const deleteBrandService = async (id: number) => {
  const existingBrand = await findBrandById(id)
  if (!existingBrand) {
    throw new Error('NOT_FOUND')
  }
  const hasVehicles = await isBrandEmpty(id)
  if (!hasVehicles) {
    throw new Error('NOT_EMPTY')
  }
  await deleteBrand(id)
}