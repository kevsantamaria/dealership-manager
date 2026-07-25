export type SupplierType =
  | 'private'
  | 'dealer'
  | 'auction'
  | 'importer'
  | 'fleet'

export type Supplier = {
  id: number
  name: string
  email: string | null
  telephone: string | null
  type: SupplierType
  country: string | null
  createdAt: Date
  updatedAt: Date
}
