export type Brand = {
  id: number
  name: string
  countryOrigin?: string | null
  createdAt: Date
  updatedAt: Date
}

export type BrandWithVehicleCount = Brand & {
  vehiclesCount: number | undefined
}

export type BrandWithNameAndId = Pick<Brand, 'id' | 'name'>
