import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import { BrandService } from '@/services/brand.service'
import type { Request, Response } from 'express'

const brandService = new BrandService()

export class BrandController {
  getAll = async (req: Request, res: Response) => {
    const brands = await brandService.getAll()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: brands,
    })
  }

  getNamesAndIds = async (req: Request, res: Response) => {
    const brands = await brandService.getNamesAndIds()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: brands,
    })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    await brandService.delete(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
    })
  }
}
