import api from '@/api/dealership'
import { manageError } from '@/api/manageError'

// Get all vehicles
export const fetchVehicles = async () => {
  return api
    .get('/vehicles')
    .then((res) => {
      console.log(res.data)
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}
