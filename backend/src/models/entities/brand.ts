export interface Brand {
  id: number
  name: string
  countryOrigin?: string | null
}

export type NewBrand = Omit<Brand, 'id'>
export type UpdateBrand = Partial<Omit<Brand, 'id'>>
