import { fetchLogin, fetchLogout } from '@/api/endpoints/login'
import { useLoginStore } from '@/store/loginStore'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const navigate = useNavigate()

  const loginStore = useLoginStore((state) => state.loginStore)
  const logoutStore = useLoginStore((state) => state.logoutStore)
  const setUser = useLoginStore((state) => state.setUser)
  const setUserRole = useLoginStore((state) => state.setUserRole)

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
    onSuccess: (user, variables) => {
      loginStore()
      setUserRole(user.data.role)
      setUser(variables.username)
      navigate('/dashboard')
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
  return { login, logout }
}
