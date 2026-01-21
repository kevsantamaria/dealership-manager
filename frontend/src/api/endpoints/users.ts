import api from '@/api/dealership'
import type { CreateUserPayload } from '@/types/user'
import { manageError } from '../manageError'

export const fetchUsers = async () => {
  return api
    .get('/users')
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      manageError(error)
    })
}

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

export const deleteUser = async (id: number) => {
  return api
    .delete(`/users/${id}`)
    .then((res) => {
      console.log(res.status)
      return res.status
    })
    .catch((error) => {
      manageError(error)
    })
}
