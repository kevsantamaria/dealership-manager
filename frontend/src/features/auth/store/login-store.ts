import type { UserLogged } from '../types/auth-types'
import { create } from 'zustand'

interface LoginState {
  isAuthenticated: boolean
  user: UserLogged | null
  loginStore: () => void
  logoutStore: () => void
  setUser: (user: UserLogged) => void
}

export const useLoginStore = create<LoginState>((set) => ({
  isAuthenticated: false,
  user: null,
  loginStore: () => set({ isAuthenticated: true }),
  logoutStore: () => set({ isAuthenticated: false, user: null }),
  setUser: (user) => set({ user }),
}))
