import { prisma } from '@/lib/prisma'

export const getAllBrandsService = async () => {
  return await prisma.brand.findMany({
    select: {
      id: true,
      name: true,
      countryOrigin: true,
      models: {
        select: {
          trims: {
            select: {
              _count: {
                select: { vehicles: true },
              },
            },
          },
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
}

export const deleteBrandService = async (id: number) => {
  const existingBrand = await prisma.brand.findUnique({ where: { id } })
  if (!existingBrand) {
    throw new Error('NOT_FOUND')
  }
  const notHaveVehicles = await prisma.vehicle.findFirst({
    where: {
      trim: {
        model: {
          brandId: id,
        },
      },
    },
    select: { id: true },
  })

  if (!notHaveVehicles) {
    throw new Error('BRAND_NOT_EMPTY')
  }

  return await prisma.$transaction(async (tx) => {
    await tx.trim.deleteMany({ where: { model: { brandId: id } } })
    await tx.model.deleteMany({ where: { brandId: id } })
    await tx.brand.delete({ where: { id } })
  })
}
