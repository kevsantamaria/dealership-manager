import { z } from 'zod'

const roleSchema = z.enum(['user', 'admin'])

export const createUserSchema = z.object({
  username: z.string().nonempty().min(3),
  password: z.string().nonempty().min(6),
  role: roleSchema.default('user'),
})

export const updateUserSchema = createUserSchema.partial()

export type CreateUserDTO = z.infer<typeof createUserSchema>
export type UpdateUserDTO = z.infer<typeof updateUserSchema>
