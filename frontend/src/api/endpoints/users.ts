import api from '@/api/dealership'
import type { CreateUserPayload } from '@/types/user'
import { manageError } from '../manageError'

export const addUser = async (user: CreateUserPayload) => {
  return api
    .post('/users', user)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}
