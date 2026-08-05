import { authService } from '../services/auth-service'
import { useLoginStore } from '../store/login-store'
import type { UserLogged, LoginPayload } from '../types/auth-types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()

  const store = useLoginStore()

  const login = useMutation({
    mutationFn: async (user: LoginPayload) => {
      return authService.login(user)
    },
    onSuccess: (user: UserLogged) => {
      store.setUser(user)
      store.loginStore()
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    },
  })

  const logout = useMutation({
    mutationFn: async () => authService.logout(),
    onSuccess: () => {
      navigate('/login')
      store.logoutStore()
    },
  })

  const me = useQuery({
    queryKey: ['me'],
    queryFn: authService.me,
    retry: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (me.data) {
      store.setUser(me.data)
      store.loginStore()
    }
    if (me.isError) {
      store.logoutStore()
    }
  }, [me.data, me.isError])

  return {
    login,
    logout,
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: me.isLoading,
  }
}
