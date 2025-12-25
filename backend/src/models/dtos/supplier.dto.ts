import { z } from 'zod'

export const createSupplierDTO = z.object({
  name: z.string().min(2),
  contact: z.string().optional(),
  type: z
    .enum(['private', 'dealer', 'auction', 'importer', 'fleet'])
    .optional(),
  country: z.string().optional(),
})

export const updateSupplierDTO = createSupplierDTO.partial()

export type CreateSupplierDTO = z.infer<typeof createSupplierDTO>
export type UpdateSupplierDTO = z.infer<typeof updateSupplierDTO>
