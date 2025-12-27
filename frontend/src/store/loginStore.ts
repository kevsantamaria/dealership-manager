import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  user: string | null
  loginStore: () => void
  logoutStore: () => void
  setUser: (user: string) => void
}

export const useAuthStore = create(
  persist<AuthState>(
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
