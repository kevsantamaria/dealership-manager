import { z } from 'zod'

export const idParamDTO = z.object({
  id: z.coerce.number().int().positive(),
})

export type IdParamDTO = z.infer<typeof idParamDTO>
