import { addUser, fetchUsers } from '@/api/endpoints/users'
import type { CreateUserPayload } from '@/types/user'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useUsers = () => {
  const getUsers = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const postUser = useMutation({
    mutationFn: (user: CreateUserPayload) => {
      return addUser(user)
    },
  })
  return { postUser, getUsers }
}
