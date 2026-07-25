import { z } from 'zod'

export const createModelSchema = z.object({
  name: z.string().nonempty(),
  launchYear: z
    .int()
    .min(1886)
    .max(new Date().getFullYear() + 1),
  brandId: z.number().int().min(1),
})

export const updateModelSchema = createModelSchema.partial()

export type CreateModelDTO = z.infer<typeof createModelSchema>
export type UpdateModelDTO = z.infer<typeof updateModelSchema>
