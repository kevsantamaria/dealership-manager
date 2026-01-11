import { deleteBrand, getAllBrands } from '@/controllers/brand.controller'
import { dtoValidator } from '@/middlewares/dtoValidator.middleware'
import { idParamDTO } from '@/models/dtos/idParam.dto'
import { Router } from 'express'

const router = Router()

router.get('/brands', getAllBrands)
router.delete('/brands/:id', dtoValidator(idParamDTO, 'params'), deleteBrand)

export default router
