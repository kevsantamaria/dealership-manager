import { getAllBrands } from '@/controllers/brand.controller'
import { Router } from 'express'

const router = Router()

router.get('/brands', getAllBrands)

export default router
