import { fetchLogin, fetchLogout } from '@/api/endpoints/login'
import { useLoginStore } from '@/store/loginStore'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
//   const navigate = useNavigate()

  const loginStore = useLoginStore((state) => state.loginStore)
  const logoutStore = useLoginStore((state) => state.logoutStore)

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
    onSuccess: () => {
      loginStore()
    //   navigate('/admin-panel')
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
