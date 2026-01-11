import { z } from 'zod'
import { createTrimDTO } from './trim.dto'
import { createBrandDTO } from './brand.dto'
import { createModelDTO } from './model.dto'

export const createVehicleDTO = z.object({
  vin: z.string().min(17).max(17),
  licensePlate: z.string().max(10).nullable().optional(),
  color: z.string(),
  mileage: z.number().max(999999).nonnegative().nullable().optional(),
  arrivalDate: z.string(),
  purchasePrice: z.number().min(0).max(999999.99).positive(),
  suggestedPrice: z.number().min(0).max(999999.99).positive(),
  stockStatus: z.enum(['in_stock', 'reserved', 'sold']).default('in_stock'),
  rateCondition: z
    .enum(['bad', 'regular', 'good', 'excellent'])
    .default('good'),
  rateDescription: z.string().max(255).nullable().optional(),
  supplierId: z.number(),
  brand: createBrandDTO,
  model: createModelDTO,
  trim: createTrimDTO,
  image: z.string().optional(),
})

export const updateVehicleDTO = z
  .object({
    vin: z.string().min(17).max(17).optional(),
    licensePlate: z.string().nullable().optional(),
    color: z.string().min(1).optional(),
    mileage: z.number().max(999999).nonnegative().nullable().optional(),
    arrivalDate: z.string().optional(),
    purchasePrice: z.number().min(0).max(999999.99).positive().optional(),
    suggestedPrice: z.number().min(0).max(999999.99).positive().optional(),
    stockStatus: z.enum(['in_stock', 'reserved', 'sold']).optional(),
    rateCondition: z.enum(['bad', 'regular', 'good', 'excellent']).optional(),
    rateDescription: z.string().nullable().optional(),
    supplierId: z.number().optional(),
    brandId: z.number().optional(),
    modelId: z.number().optional(),
    trimId: z.number().optional(),
  })
  .strict()

export type CreateVehicleDTO = z.infer<typeof createVehicleDTO>
export type UpdateVehicleDTO = z.infer<typeof updateVehicleDTO>
