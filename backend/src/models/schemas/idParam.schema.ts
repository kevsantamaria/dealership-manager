import { z } from 'zod'

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export type IdParamDTO = z.infer<typeof idParamSchema>
