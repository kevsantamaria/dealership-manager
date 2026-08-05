import { ModelController } from '@/controllers/model.controller'
import { ModelRepository } from '@/repositories/model.repository'
import { ModelService } from '@/services/model.service'
import { Router } from 'express'

const modelRepository = new ModelRepository()
const modelService = new ModelService(modelRepository)
const modelController = new ModelController(modelService)
const router = Router()

router.get('/models-by-name-id', modelController.getNamesAndIds)

export default router
