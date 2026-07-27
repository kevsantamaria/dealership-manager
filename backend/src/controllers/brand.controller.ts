import { BrandService } from '@/services/brand.service'
import type { Request, Response } from 'express'

export class BrandController {
  constructor(private brandService: BrandService) {}

  getAll = async (req: Request, res: Response) => {
    const brands = await this.brandService.getAll()
    res.status(200).json({
      message: 'OK',
      data: brands,
    })
  }

  getNamesAndIds = async (req: Request, res: Response) => {
    const brands = await this.brandService.getNamesAndIds()
    res.status(200).json({
      message: 'OK',
      data: brands,
    })
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params
    await this.brandService.delete(Number(id))
    res.status(200).json({
      message: 'OK',
    })
  }
}
