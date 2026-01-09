import type { Brand } from "@/models/entities/brand"
import { findAllBrands } from "@/repositories/brand.repository"

export const getAllBrandsService = async () => {
    const brands: Brand[] = await findAllBrands()
    return brands
}
