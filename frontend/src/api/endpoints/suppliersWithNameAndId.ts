import api from '@/api/dealership'
import { manageError } from '../manageError'

export const fetchSuppliersWithNameAndId = async () => {
  return api
    .get('/suppliers/names-and-ids')
    .then((res) => res.data.data)
    .catch((error) => manageError(error))
}
