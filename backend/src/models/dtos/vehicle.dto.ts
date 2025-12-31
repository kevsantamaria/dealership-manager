import { z } from 'zod'
import { createTrimDTO } from './trim.dto'
import { createBrandDTO } from './brand.dto'
import { createModelDTO } from './model.dto'

export const createVehicleDTO = z.object({
  vin: z.string().min(5),
  licensePlate: z.string().optional(),
  color: z.string().min(1),
  mileage: z.number().nonnegative().optional(),

  arrivalDate: z.string(),
  purchasePrice: z.number().positive(),
  suggestedPrice: z.number().positive(),

  stockStatus: z.enum(['in_stock', 'reserved', 'sold']).default('in_stock'),

  rateCondition: z
    .enum(['bad', 'regular', 'good', 'excellent'])
    .default('good'),
  rateDescription: z.string().optional(),

  supplierId: z.string().uuid(),

  brand: createBrandDTO,
  model: createModelDTO,

  trim: createTrimDTO,

  images: z.array(z.string().url()).optional(),
})


export const updateVehicleDTO = createVehicleDTO.partial()

export type CreateVehicleDTO = z.infer<typeof createVehicleDTO>
export type UpdateVehicleDTO = z.infer<typeof updateVehicleDTO>
