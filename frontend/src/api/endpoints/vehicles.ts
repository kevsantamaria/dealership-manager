import api from '@/api/dealership'
import { manageError } from '@/api/manageError'
import type { CreateVehiclePayload } from '@/types/vehicle'

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

// Create vehicle
export const addVehicle = async (vehicle: CreateVehiclePayload) => {
  return api
    .post('/vehicles', vehicle)
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((error) => {
      manageError(error)
    })
}
