import { BrandController } from '@/controllers/brand.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { idParamSchema } from '@/models/schemas/idParam.schema'
import { BrandRepository } from '@/repositories/brand.repository'
import { BrandService } from '@/services/brand.service'
import { Router } from 'express'

const brandRepository = new BrandRepository()
const brandService = new BrandService(brandRepository)
const brandController = new BrandController(brandService)
const router = Router()

router.get('/brands', brandController.getAll)
router.delete(
  '/brands/:id',
  dtoValidator(idParamSchema, 'params'),
  brandController.delete
)
router.get('/brands-by-name-id', brandController.getNamesAndIds)

export default router
