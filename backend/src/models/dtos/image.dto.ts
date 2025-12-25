import { z } from 'zod'

export const createImageDTO = z.object({
  path: z.string().min(1),
  vehicleId: z.number().int()
})

export const updateImageDTO = createImageDTO.partial()

export type CreateImageDTO = z.infer<typeof createImageDTO>
export type UpdateImageDTO = z.infer<typeof updateImageDTO>
