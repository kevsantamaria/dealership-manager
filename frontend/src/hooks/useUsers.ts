import { addUser, deleteUser, fetchUsers } from '@/api/endpoints/users'
import type { CreateUserPayload } from '@/types/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useUsers = () => {
  const queryClient = useQueryClient()

  const getUsers = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const postUser = useMutation({
    mutationFn: (user: CreateUserPayload) => {
      return addUser(user)
    },
  })
  const deleteUserById = useMutation({
    mutationFn: (id: number) => {
      return deleteUser(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      console.error('Error deleting user:', error)
    },
  })
  return { postUser, getUsers, deleteUserById }
}
