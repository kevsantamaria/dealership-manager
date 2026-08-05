export type Supplier = {
  id: number
  name: string
  email: string | null
  telephone: string | null
  type: string
  country: string | null
  createdAt: string
  updatedAt: string
}

export type SupplierWithVehicleCount = Supplier & {
  vehiclesCount: number
}

export type SupplierWithNameAndId = {
  id: number
  name: string
}

export type CreateSupplierPayload = {
  name: string
  email: string | null
  telephone: string | null
  type: string
  country: string | null
}

export type UpdateSupplierPayload = Partial<CreateSupplierPayload>
