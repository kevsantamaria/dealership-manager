export interface Brand {
  id: number
  name: string
  countryOrigin?: string | null
}

export type BrandWithoutId = Omit<Brand, 'id'>
