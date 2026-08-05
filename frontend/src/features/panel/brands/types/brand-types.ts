export type Brand = {
  id: number
  name: string
  countryOrigin: string
  vehiclesCount: number
}

export type BrandWithNameAndId = Pick<Brand, 'id' | 'name'>
