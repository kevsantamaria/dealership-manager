import { z } from 'zod'

export const createBrandDTO = z.object({
  name: z.string().min(1),
  countryOrigin: z.string().optional(),
})

export const updateBrandDTO = createBrandDTO.partial()

export type CreateBrandDTO = z.infer<typeof createBrandDTO>
export type UpdateBrandDTO = z.infer<typeof updateBrandDTO>
