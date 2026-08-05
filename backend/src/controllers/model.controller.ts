import { ModelService } from '@/services/model.service'
import type { Request, Response } from 'express'

export class ModelController {
  constructor(private modelService: ModelService) {}

  getNamesAndIds = async (req: Request, res: Response) => {
    const models = await this.modelService.getNamesAndIds()
    res.status(200).json({
      message: 'OK',
      data: models,
    })
  }
}
