import api from '@/api/dealership'
import type { CreateSupplierPayload } from '@/types/supplier'
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
