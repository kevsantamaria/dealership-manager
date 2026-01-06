import {
  colorOptions,
  conditions,
  driveTrains,
  engineTypes,
  stockStatusValues,
  transmissionTypes,
} from '@/validations/enums'
import z from 'zod'

export const vehicleSchema = z.object({
  vin: z
    .string()
    .min(17, { error: 'El VIN es obligatorio y debe tener 17 caracteres' })
    .max(17, { error: 'El VIN no puede tener más de 17 caracteres' }),
  licensePlate: z
    .string()
    .max(10, { error: 'La matrícula no puede tener más de 10 caracteres' })
    .optional(),
  arrivalDate: z.string().min(1, 'La fecha de importación es obligatoria'),
  stockStatus: z.enum(stockStatusValues),

  rateCondition: z.enum(conditions),
  rateDescription: z
    .string()
    .max(255, 'La descripción de la condición no puede exceder 255 caracteres')
    .optional(),
  mileage: z
    .string()
    .min(1, 'El kilometraje es obligatorio')
    .refine((mileage) => !isNaN(parseFloat(mileage)), {
      error: 'El kilometraje debe ser numérico',
    })
    .optional(),
  color: z.enum(colorOptions),

  purchasePrice: z
    .string()
    .refine((purchasePrice) => !isNaN(parseFloat(purchasePrice)), {
      error: 'Ingrese un precio válido',
    }),
  suggestedPrice: z
    .string()
    .refine((suggestedPrice) => !isNaN(parseFloat(suggestedPrice)), {
      error: 'Ingrese un precio válido',
    }),

  brand: z.object({
    name: z.string().min(1, 'El nombre de la marca es obligatorio'),
    countryOrigin: z.string().optional(),
  }),
  model: z.object({
    name: z.string().min(1, 'El nombre del modelo es obligatorio'),
    launchYear: z
      .string()
      .min(4, 'Ingrese un año válido')
      .refine((launchYear) => !isNaN(parseInt(launchYear)), {
        error: 'Ingrese un año válido',
      }),
  }),
  trim: z.object({
    name: z.string().min(1, 'El nombre de la versión es obligatorio'),
    engineSize: z
      .string()
      .min(1, 'Ingrese un valor válido')
      .refine((engineSize) => !isNaN(parseFloat(engineSize))),
    engineType: z.enum(engineTypes),
    transmission: z.enum(transmissionTypes),
    horsepower: z.string().min(1, 'Ingrese un valor válido').refine((horsepower) => !isNaN(parseInt(horsepower))),
    drivetrain: z.enum(driveTrains),
  }),

  supplier: z.string({ error: 'El proveedor es obligatorio' }),
  image: z.string().optional(),
})

export type VehicleSchema = z.infer<typeof vehicleSchema>
