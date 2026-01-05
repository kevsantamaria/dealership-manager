import api from '@/api/dealership'
import { manageError } from '@/api/manageError'

// Iniciar sesión
export const fetchLogin = async (username: string, password: string) => {
  return api
    .post('/login', {
      username: username,
      password: password,
    })
    .then((res) => {
      console.log(res.data)
      return res.data // token
    })
    .catch((error) => {
      manageError(error)
    })
}

// Cerrar sesión
export const fetchLogout = async () => {
  return api
    .post('')
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      manageError(error)
    })
}
