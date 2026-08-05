import { api } from '@/app/config/api/base'
import type { UserLogged, LoginPayload } from '../types/auth-types'

export const authService = {
  login: async (user: LoginPayload): Promise<UserLogged> => {
    return api('/login', {
      method: 'POST',
      json: user,
    })
  },

  logout: async (): Promise<void> => {
    return api('/logout', {
      method: 'POST',
    })
  },

  me: async (): Promise<UserLogged> => {
    return api('/me')
  },
}
