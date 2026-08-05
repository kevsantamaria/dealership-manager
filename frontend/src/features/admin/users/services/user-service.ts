import { api } from '@/app/config/api/base'
import type {
  User,
  CreateUserPayload,
  UpdateUserPayload,
} from '../types/user-types'

export const userService = {
  getAll: async (): Promise<User[]> => {
    return api('/users')
  },

  add: async (user: CreateUserPayload): Promise<User> => {
    return api('/users', {
      method: 'POST',
      json: user,
    })
  },

  update: async (id: number, user: UpdateUserPayload): Promise<User> => {
    return api(`/users/${id}`, {
      method: 'PATCH',
      json: user,
    })
  },

  delete: async (id: number): Promise<void> => {
    return api(`/users/${id}`, {
      method: 'DELETE',
    })
  },
}
