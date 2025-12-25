export type SupplierType =
  | 'private'
  | 'dealer'
  | 'auction'
  | 'importer'
  | 'fleet'

export interface Supplier {
  id: number
  name: string
  contact?: string | null
  type: SupplierType
  country?: string | null
  createdAt: string
  updatedAt: string
}
