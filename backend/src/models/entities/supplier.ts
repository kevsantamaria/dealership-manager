export type SupplierType =
  | 'private'
  | 'dealer'
  | 'auction'
  | 'importer'
  | 'fleet'

export interface Supplier {
  id: number
  name: string
  contact: string
  type: SupplierType
  country: string
  createdAt: string
  updatedAt: string
}

export type NewSupplier = Omit<Supplier, 'id'>
export type UpdateSupplier = Partial<Omit<Supplier, 'id' | 'createdAt'>>
