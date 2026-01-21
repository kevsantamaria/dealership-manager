import api from '@/api/dealership'
import { manageError } from '../manageError'
import type { CreateUserPayload } from '@/types/user'

export const addSupplier = async (user: CreateUserPayload) => {
  return api
    .post('/users', user)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}