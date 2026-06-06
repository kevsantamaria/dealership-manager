import { z } from 'zod'

export const createModelDTO = z.object({
  name: z.string().min(1).max(60),
  launchYear: z
    .number()
    .int()
    .min(1886)
    .max(new Date().getFullYear() + 1),
})

export type CreateModelDTO = z.infer<typeof createModelDTO>
