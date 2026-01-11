import api from '@/api/dealership'
import { manageError } from '@/api/manageError'

// Get all brands
export const fetchBrands = async () => {
  return api
    .get('/brands')
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}

// Delete brand
export const deleteBrand = async (id: number) => {
  return api
    .delete(`/brands/${id}`)
    .then((res) => {
      console.log(res.status)
      return res.status
    })
    .catch((error) => {
      manageError(error)
    })
}
