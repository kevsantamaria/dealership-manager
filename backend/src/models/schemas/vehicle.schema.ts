import { z } from 'zod'
import { createTrimSchema } from './trim.schema'
import { createBrandSchema } from './brand.schema'
import { createModelSchema } from './model.schema'

const stockStatusSchema = z.enum(['in_stock', 'reserved', 'sold'])
const rateConditionSchema = z.enum(['bad', 'regular', 'good', 'excellent'])

export const createVehicleSchema = z.object({
  vin: z.string().min(17).max(17),
  licensePlate: z.string().max(10).nullable(),
  color: z.string(),
  mileage: z.number().max(999999).nonnegative().nullable(),
  arrivalDate: z.coerce.date(),
  purchasePrice: z.number().min(0).max(999999.99).positive(),
  suggestedPrice: z.number().min(0).max(999999.99).positive(),
  stockStatus: stockStatusSchema.default('in_stock'),
  rateCondition: rateConditionSchema.default('good'),
  rateDescription: z.string().max(255).nullable(),
  supplierId: z.number(),
  brand: createBrandSchema,
  model: createModelSchema,
  trim: createTrimSchema,
  image: z.string().nullable(),
})

export const updateVehicleSchema = createVehicleSchema
  .partial()
  .omit({ trim: true, model: true, image: true })

export type CreateVehicleDTO = z.infer<typeof createVehicleSchema>
export type UpdateVehicleDTO = z.infer<typeof updateVehicleSchema>
