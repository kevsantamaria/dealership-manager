import { z } from 'zod'

export const createVehicleDTO = z.object({
  vin: z.number().int(),
  licensePlate: z.string().optional(),
  color: z.string().min(1),
  mileage: z.number().nonnegative().optional(),
  arrivalDate: z.string().date(),
  purchasePrice: z.number().positive(),
  suggestedPrice: z.number().positive(),
  stockStatus: z.enum(['in_stock', 'reserved', 'sold']).optional(),
  rateCondition: z.enum(['bad', 'regular', 'good', 'excellent']).optional(),
  rateDescription: z.string().optional(),
  trimId: z.number().int(),
  supplierId: z.number().int()
})

export const updateVehicleDTO = createVehicleDTO.partial()

export type CreateVehicleDTO = z.infer<typeof createVehicleDTO>
export type UpdateVehicleDTO = z.infer<typeof updateVehicleDTO>
