import { z } from 'zod'

export const createSupplierDTO = z.object({
  name: z.string().min(2),
  contact: z.string().optional().nullable(),
  type: z
    .enum(['private', 'dealer', 'auction', 'importer', 'fleet'])
    .default('private'),
  country: z.string()
})

export const updateSupplierDTO = createSupplierDTO.partial()

export type CreateSupplierDTO = z.infer<typeof createSupplierDTO>
export type UpdateSupplierDTO = z.infer<typeof updateSupplierDTO>
