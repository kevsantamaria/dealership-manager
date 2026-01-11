import { z } from 'zod'

export const createBrandDTO = z.object({
  name: z.string().min(1).max(60),
  countryOrigin: z.string().min(1).max(60),
})

export const updateBrandDTO = createBrandDTO.partial()

export type CreateBrandDTO = z.infer<typeof createBrandDTO>
export type UpdateBrandDTO = z.infer<typeof updateBrandDTO>
