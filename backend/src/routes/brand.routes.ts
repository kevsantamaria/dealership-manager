import { BrandController } from '@/controllers/brand.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { idParamSchema } from '@/models/schemas/idParam.schema'
import { Router } from 'express'

const brandController = new BrandController()
const router = Router()

router.get('/brands', brandController.getAll)
router.delete(
  '/brands/:id',
  dtoValidator(idParamSchema, 'params'),
  brandController.delete
)
router.get('/brands-by-name-id', brandController.getNamesAndIds)

export default router
