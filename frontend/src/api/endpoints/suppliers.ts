import api from '@/api/dealership'
import type {
  CreateSupplierPayload,
  UpdateSupplierPayload,
} from '@/types/supplier'
import { manageError } from '../manageError'

// Create supplier
export const addSupplier = async (supplier: CreateSupplierPayload) => {
  return api
    .post('/suppliers', supplier)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}

// Get all suppliers
export const fetchSuppliers = async () => {
  return api
    .get('/suppliers')
    .then((res) => {
      console.log(res.data)
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}

// Get suppliers with only name and id
export const fetchSuppliersWithNameAndId = async () => {
  return api
    .get('/suppliers/names-and-ids')
    .then((res) => res.data.data)
    .catch((error) => manageError(error))
}

// Update supplier
export const updateSupplier = async (
  id: number,
  supplier: UpdateSupplierPayload
) => {
  return api.patch(`/suppliers/${id}`, supplier)
}

// Delete supplier
export const deleteSupplier = async (id: number) => {
  return api
    .delete(`/suppliers/${id}`)
    .then((res) => {
      console.log(res.status)
      return res.status
    })
    .catch((error) => {
      manageError(error)
    })
}
