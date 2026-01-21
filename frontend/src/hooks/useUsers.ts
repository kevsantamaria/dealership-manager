import { addUser } from '@/api/endpoints/users'
import type { CreateUserPayload } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

export const useUsers = () => {
  const postUser = useMutation({
    mutationFn: (user: CreateUserPayload) => {
      return addUser(user)
    },
  })
  return { postUser }
}
