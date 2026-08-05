import { userService } from '../services/user-service'
import type { CreateUserPayload, UpdateUserPayload } from '../types/user-types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useUsers = () => {
  const queryClient = useQueryClient()

  const getAll = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  const add = useMutation({
    mutationFn: (user: CreateUserPayload) => {
      return userService.add(user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const update = useMutation({
    mutationFn: ({ id, user }: { id: number; user: UpdateUserPayload }) => {
      return userService.update(id, user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      console.error('Error updating user:', error)
    },
  })

  const remove = useMutation({
    mutationFn: (id: number) => {
      return userService.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      console.error('Error deleting user:', error)
    },
  })

  return { getAll, add, update, remove }
}
