import {
  colors,
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
    .optional()
    .nullable(),
  arrivalDate: z.string().min(1, 'La fecha de importación es obligatoria'),
  stockStatus: z.enum(stockStatusValues).default('in_stock'),

  rateCondition: z.enum(conditions).default('good'),
  rateDescription: z
    .string()
    .max(255, 'La descripción de la condición no puede exceder 255 caracteres')
    .optional(),
  mileage: z
    .string()
    .refine((mileage) => !isNaN(parseFloat(mileage)), {
      error: 'El kilometraje debe ser numérico',
    })
    .optional(),
  color: z.enum(colors).default('amber'),

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
      .min(4)
      .refine((launchYear) => !isNaN(parseInt(launchYear)), {
        error: 'Ingrese un año válido',
      }),
  }),
  trim: z.object({
    name: z.string().min(1, 'El nombre de la versión es obligatorio'),
    engineSize: z
      .string()
      .refine((engineSize) => !isNaN(parseFloat(engineSize))),
    engineType: z.enum(engineTypes).default('gasoline'),
    transmission: z.enum(transmissionTypes).default('automatic'),
    horsepower: z.string().refine((horsepower) => !isNaN(parseInt(horsepower))),
    drivetrain: z.enum(driveTrains).default('fwd'),
  }),

  supplierId: z.number({ error: 'El proveedor es obligatorio' }),
  image: z.string().url('La URL de la imagen no es válida').optional(),
})

export type VehicleSchema = z.infer<typeof vehicleSchema>
