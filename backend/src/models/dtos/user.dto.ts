import { z } from 'zod'

export const createUserDTO = z.object({
  username: z.string().nonempty('Username is required').min(3, 'Username must be at least 3 characters long'),
  password: z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin']).default('user'),
})

export const updateUserDTO = createUserDTO.partial()

export type CreateUserDTO = z.infer<typeof createUserDTO>
export type UpdateUserDTO = z.infer<typeof updateUserDTO>