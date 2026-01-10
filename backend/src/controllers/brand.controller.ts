import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import { findAllBrandsWithVehicles } from '@/repositories/brand.repository'
import type { Request, Response } from 'express'

export const getAllBrands = async (req: Request, res: Response) => {
  const brands = await findAllBrandsWithVehicles()
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: brands,
  })
}
