import { z } from 'zod'
import { createTrimDTO } from './trim.dto'
import { createSupplierDTO } from './supplier.dto'

export const createVehicleDTO = z.object({
  vin: z.number().int(),
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
  trim: createTrimDTO,
  supplier: createSupplierDTO,
})

export const updateVehicleDTO = createVehicleDTO.partial()

export type CreateVehicleDTO = z.infer<typeof createVehicleDTO>
export type UpdateVehicleDTO = z.infer<typeof updateVehicleDTO>
