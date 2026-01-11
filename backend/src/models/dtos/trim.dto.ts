import { z } from 'zod'

export const createTrimDTO = z.object({
  name: z.string().min(1).max(60),
  engineSize: z.number().positive().min(0).max(10),
  horsepower: z.number().int().positive().min(1).max(4000),
  engineType: z
    .enum(['gasoline', 'diesel', 'hybrid', 'electric'])
    .default('gasoline'),

  transmission: z.enum(['automatic', 'manual', 'cvt']).default('automatic'),
  drivetrain: z.enum(['fwd', 'rwd', 'awd']).default('fwd'),
})

export const updateTrimDTO = createTrimDTO.partial()

export type CreateTrimDTO = z.infer<typeof createTrimDTO>
export type UpdateTrimDTO = z.infer<typeof updateTrimDTO>
