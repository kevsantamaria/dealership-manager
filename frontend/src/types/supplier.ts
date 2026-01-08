export type Supplier = {
  id: number
  name: string
  contact: string
  type: string
  country: string
  created_at: string
  updated_at: string
}

export type SupplierWithNameAndId = {
  id: number
  name: string
}
