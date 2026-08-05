import { api } from '@/app/config/api/base'
import type { Brand, BrandWithNameAndId } from '../types/brand-types'

export const fetchBrands = async () => {
  return await api<Brand[]>('/brands')
}

export const deleteBrand = async (id: number) => {
  return api(`/brands/${id}`, { method: 'DELETE' })
}

export const fetchNameAndIdBrand = async () => {
  return await api<BrandWithNameAndId[]>('/brands-by-name-id')
}
