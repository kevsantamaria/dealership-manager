export type SupplierType =
  | 'private'
  | 'dealer'
  | 'auction'
  | 'importer'
  | 'fleet'

export interface Supplier {
  id: number
  name: string
  contact: string | null
  type: SupplierType
  country: string
  createdAt: Date
  updatedAt: Date
}

export type NewSupplier = Omit<Supplier, 'id'>
export type UpdateSupplier = Partial<Omit<Supplier, 'id' | 'createdAt'>>
