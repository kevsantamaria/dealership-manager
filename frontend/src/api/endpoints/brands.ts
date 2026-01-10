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
