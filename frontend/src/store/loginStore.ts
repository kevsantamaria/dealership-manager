import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface LoginState {
  isAuthenticated: boolean
  user: string | null
  userRole: string | null
  loginStore: () => void
  logoutStore: () => void
  setUser: (user: string) => void
  setUserRole: (role: string) => void
}

export const useLoginStore = create(
  persist<LoginState>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      userRole: null,
      loginStore: () => set({ isAuthenticated: true }),
      logoutStore: () => set({ isAuthenticated: false, user: null, userRole: null }),
      setUser: (user) => set({ user }),
      setUserRole: (userRole) => set({userRole})
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
