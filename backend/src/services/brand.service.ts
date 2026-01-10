import type { Brand } from '@/models/entities/brand'
import { findAllBrandsWithVehicles } from '@/repositories/brand.repository'

export const getAllBrandsService = async () => {
  const brands: Brand[] = await findAllBrandsWithVehicles()
  return brands
}
