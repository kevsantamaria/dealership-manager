import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import {
  deleteBrandService,
  getAllBrandsService,
  getNameAndIdBrandsService,
} from '@/services/brand.service'
import type { Request, Response } from 'express'

export const getAllBrands = async (req: Request, res: Response) => {
  const brands = await getAllBrandsService()
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: brands,
  })
}

export const deleteBrand = async (req: Request, res: Response) => {
  const { id } = req.params
  await deleteBrandService(Number(id))
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
  })
}

export const getNameAndIdBrands = async (req: Request, res: Response) => {
  const brands = await getNameAndIdBrandsService()
  res.status(HTTP_STATUS.OK).json({
    message: HTTP_STATUS_MESSAGE.OK,
    data: brands,
  })
}
