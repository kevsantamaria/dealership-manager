import { z } from 'zod'

export const createModelDTO = z.object({
  name: z.string().min(1),
  launchYear: z.number().int().optional(),
  brandId: z.number().int()
})

export const updateModelDTO = createModelDTO.partial()

export type CreateModelDTO = z.infer<typeof createModelDTO>
export type UpdateModelDTO = z.infer<typeof updateModelDTO>
