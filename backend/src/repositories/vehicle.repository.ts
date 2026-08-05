import { prisma } from '@/config/prisma'
import type { Prisma } from '@prisma/client'
import type {
  Vehicle,
  VehicleListItem,
  VehicleWithDetails,
} from '@/models/entities/vehicle.entity'
import type {
  CreateVehicleDTO,
  UpdateVehicleDTO,
} from '@/models/schemas/vehicle.schema'

export class VehicleRepository {
  constructor() {}

  async findAll() {
    return await prisma.vehicle.findMany({
      select: {
        id: true,
        color: true,
        arrivalDate: true,
        suggestedPrice: true,
        stockStatus: true,
        rateCondition: true,
        trim: {
          select: {
            name: true,
            model: {
              select: {
                name: true,
                launchYear: true,
                brand: { select: { name: true } },
              },
            },
          },
        },
      },
      orderBy: { arrivalDate: 'desc' },
    })
  }

  async findById(id: number) {
    return await prisma.vehicle.findFirst({
      where: { id },
      include: {
        supplier: true,
        trim: {
          include: {
            model: {
              include: {
                brand: true,
              },
            },
          },
        },
      },
    })
  }

  async existsById(id: number) {
    return (await prisma.vehicle.findUnique({ where: { id } })) !== null
  }

  async findByVin(vin: string) {
    return (await prisma.vehicle.findUnique({ where: { vin } })) !== null
  }

  async create(
    data: Omit<CreateVehicleDTO, 'brand' | 'model' | 'trim' | 'image'> & {
      trimId: number
    },
    tx: Prisma.TransactionClient = prisma
  ) {
    return await tx.vehicle.create({ data })
  }

  async update(id: number, data: UpdateVehicleDTO) {
    await prisma.vehicle.update({
      where: { id },
      data,
    })
  }

  async delete(id: number) {
    await prisma.vehicle.delete({ where: { id } })
  }
}
