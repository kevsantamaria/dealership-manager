import { z } from 'zod'

export const createUserDTO = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(['user', 'admin']).default('user'),
})

export const updateUserDTO = createUserDTO.partial()

export const idParamDTO = z.object({
  id: z.coerce.number().int().positive(),
})

export type CreateUserDTO = z.infer<typeof createUserDTO>
export type UpdateUserDTO = z.infer<typeof updateUserDTO>
export type IdParamDTO = z.infer<typeof idParamDTO>
