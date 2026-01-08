import api from '@/api/dealership'
import { manageError } from '../manageError'

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
