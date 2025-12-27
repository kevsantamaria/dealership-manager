import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LoginState {
  isAuthenticated: boolean
  user: string | null
  loginStore: () => void
  logoutStore: () => void
  setUser: (user: string) => void
}

export const useLoginStore = create(
  persist<LoginState>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      loginStore: () => set({ isAuthenticated: true }),
      logoutStore: () => set({ isAuthenticated: false, user: null }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth',
    }
  )
)
