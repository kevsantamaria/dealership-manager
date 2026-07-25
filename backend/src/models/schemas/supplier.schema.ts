import { z } from 'zod'

const typeSchema = z.enum(['private', 'dealer', 'auction', 'importer', 'fleet'])

export const createSupplierSchema = z.object({
  name: z.string().nonempty(),
  email: z.email().nullable(),
  telephone: z.string().nullable(),
  type: typeSchema.default('private'),
  country: z.string().nullable(),
})

export const updateSupplierSchema = createSupplierSchema.partial()

export type CreateSupplierDTO = z.infer<typeof createSupplierSchema>
export type UpdateSupplierDTO = z.infer<typeof updateSupplierSchema>
