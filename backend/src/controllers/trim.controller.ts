import { TrimService } from '@/services/trim.service'
import type { Request, Response } from 'express'

export class TrimController {
  constructor(private trimService: TrimService) {}

  getNamesAndIds = async (req: Request, res: Response) => {
    const trims = await this.trimService.getNamesAndIds()
    res.status(200).json({
      message: 'OK',
      data: trims,
    })
  }
}
