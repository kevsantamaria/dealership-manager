import { z } from 'zod'

export const createBrandSchema = z.object({
  name: z.string().nonempty('Brand name is required'),
  countryOrigin: z.string().nonempty('Country origin is required'),
})

export const updateBrandSchema = createBrandSchema.partial()

export type CreateBrandDTO = z.infer<typeof createBrandSchema>
export type UpdateBrandDTO = z.infer<typeof updateBrandSchema>
