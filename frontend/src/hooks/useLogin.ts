import { fetchLogin, fetchLogout, fetchMe } from '@/api/endpoints/login'
import { useLoginStore } from '@/store/loginStore'
import type { User } from '@/types/user'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const navigate = useNavigate()

  const loginStore = useLoginStore((state) => state.loginStore)
  const logoutStore = useLoginStore((state) => state.logoutStore)
  const setUser = useLoginStore((state) => state.setUser)

  // Login
  const login = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => {
      return fetchLogin(username, password)
    },
    onSuccess: (user: User) => {
      setUser(user)
      loginStore()
      if (user.role === 'admin') {
        navigate('/admin-user')
      } else {
        navigate('/dashboard')
      }
    },
  })

  // Cierre de sesión
  const logout = useMutation({
    mutationFn: async () => fetchLogout(),
    onSuccess: (data) => {
      logoutStore()

      if (data.status === 204) {
        navigate('/')
      }
    },
  })

  const me = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    retry: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (me.data) {
      setUser(me.data.data)
    }
  }, [me.data, setUser])

  return { login, logout, me }
}
