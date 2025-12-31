import { z } from 'zod'

export const createTrimDTO = z.object({
  name: z.string().min(1),
  engineSize: z.number().positive(),
  horsepower: z.number().int().positive(),

  engineType: z
    .enum(['gasoline', 'diesel', 'hybrid', 'electric'])
    .default('gasoline'),

  transmission: z.enum(['automatic', 'manual', 'cvt']).default('automatic'),
  drivetrain: z.enum(['fwd', 'rwd', 'awd']).default('fwd'),
})

export const updateTrimDTO = createTrimDTO.partial()

export type CreateTrimDTO = z.infer<typeof createTrimDTO>
export type UpdateTrimDTO = z.infer<typeof updateTrimDTO>
