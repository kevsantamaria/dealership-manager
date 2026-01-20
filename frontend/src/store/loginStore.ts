import type { User } from '@/types/user'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface LoginState {
  isAuthenticated: boolean
  user: User | null
  loginStore: () => void
  logoutStore: () => void
  setUser: (user: User) => void
}

export const useLoginStore = create(
  persist<LoginState>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      userRole: null,
      loginStore: () => set({ isAuthenticated: true }),
      logoutStore: () => set({ isAuthenticated: false, user: null }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
