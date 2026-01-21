import api from '@/api/dealership'
import type { CreateUserPayload, UpdateUserPayload } from '@/types/user'
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

export const updateUser = async (
  id: number,
  user: UpdateUserPayload
) => {
  return api.patch(`/users/${id}`, user)
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
