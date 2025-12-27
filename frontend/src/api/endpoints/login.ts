/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/api/dealership'

// Error handling
const manageError = (error: any) => {
  const errorMsg = error.response?.data?.message || 'Unknown error ocurred'
  console.error(errorMsg)
  throw new Error(errorMsg)
}

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
    .catch((error: any) => {
      manageError(error)
    })
}
