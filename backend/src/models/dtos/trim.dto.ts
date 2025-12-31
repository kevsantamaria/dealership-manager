import { z } from 'zod'
import { createModelDTO } from './model.dto'

export const createTrimDTO = z.object({
  name: z.string().min(1),
  engineSize: z.number().positive(),
  horsepower: z.number().int().positive(),
  engineType: z.enum(['gasoline', 'diesel', 'hybrid', 'electric']).optional(),
  transmission: z.enum(['automatic', 'manual', 'cvt']).optional(),
  drivetrain: z.enum(['fwd', 'rwd', 'awd']).optional(),
  model: createModelDTO,
})

export const updateTrimDTO = createTrimDTO.partial()

export type CreateTrimDTO = z.infer<typeof createTrimDTO>
export type UpdateTrimDTO = z.infer<typeof updateTrimDTO>
