import { z } from 'zod'

const engineTypeSchema = z.enum(['gasoline', 'diesel', 'hybrid', 'electric'])
const transmissionSchema = z.enum(['automatic', 'manual', 'cvt'])
const drivetrainSchema = z.enum(['fwd', 'rwd', 'awd'])

export const createTrimSchema = z.object({
  name: z.string().nonempty(),
  engineSize: z.number().positive().min(0).max(10),
  horsepower: z.number().int().positive().min(1).max(4000),
  engineType: engineTypeSchema.default('gasoline'),
  transmission: transmissionSchema.default('automatic'),
  drivetrain: drivetrainSchema.default('fwd'),
  modelId: z.number().int().min(1),
})

export type CreateTrimDTO = z.infer<typeof createTrimSchema>
