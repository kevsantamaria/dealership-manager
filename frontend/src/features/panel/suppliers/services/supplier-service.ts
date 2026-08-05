import { api } from '@/app/config/api/base'
import type {
  CreateSupplierPayload,
  Supplier,
  SupplierWithNameAndId,
  UpdateSupplierPayload,
} from '../types/supplier-types'

export const supplierService = {
  add: async (supplier: CreateSupplierPayload): Promise<Supplier> => {
    return api('/suppliers', {
      method: 'POST',
      json: supplier,
    })
  },

  getAll: async (): Promise<Supplier[]> => {
    return api('/suppliers')
  },

  getNamesAndIds: async (): Promise<SupplierWithNameAndId[]> => {
    return api('/suppliers/names-and-ids')
  },

  update: async (
    id: number,
    supplier: UpdateSupplierPayload
  ): Promise<Supplier> => {
    return api(`/suppliers/${id}`, {
      method: 'PATCH',
      json: supplier,
    })
  },

  delete: async (id: number): Promise<void> => {
    return api(`/suppliers/${id}`, {
      method: 'DELETE',
    })
  },
}
