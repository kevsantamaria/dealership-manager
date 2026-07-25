import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/constants/httpStatus'
import { BrandService } from '@/services/brand.service'
import type { Request, Response } from 'express'

export class BrandController {
  constructor(private brandService: BrandService) {}

  async getAll(req: Request, res: Response) {
    const brands = await this.brandService.getAll()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: brands,
    })
  }

  async getNamesAndIds(req: Request, res: Response) {
    const brands = await this.brandService.getNamesAndIds()
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
      data: brands,
    })
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    await this.brandService.delete(Number(id))
    res.status(HTTP_STATUS.OK).json({
      message: HTTP_STATUS_MESSAGE.OK,
    })
  }
}
