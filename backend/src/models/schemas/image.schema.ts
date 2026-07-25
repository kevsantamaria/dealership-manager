import { z } from 'zod'

export const createImageSchema = z.object({
  path: z.string().min(1),
  vehicleId: z.number().int(),
})

export const updateImageSchema = createImageSchema.partial()

export type CreateImageDTO = z.infer<typeof createImageSchema>
export type UpdateImageDTO = z.infer<typeof updateImageSchema>
