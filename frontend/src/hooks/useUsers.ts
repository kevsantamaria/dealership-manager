import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from '@/api/endpoints/users'
import type { CreateUserPayload, UpdateUserPayload } from '@/types/user'
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const updateUserById = useMutation({
    mutationFn: ({ id, user }: { id: number; user: UpdateUserPayload }) => {
      return updateUser(id, user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      console.error('Error updating user:', error)
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
  return { postUser, getUsers, deleteUserById, updateUserById }
}
